import {
  BlockStatement,
  BoolLiteral,
  CallExpression,
  ExpressionStatement,
  FunctionLiteral,
  Identifier,
  IfExpression,
  InfixExpression,
  IntegerLiteral,
  LetStatement,
  PrefixExpression,
  Program,
  ReturnStatement,
  StringLiteral,
} from './ast'
import type { ASTNode, Expression, Statement } from './ast'
import {
  VBoolean,
  VError,
  VFunction,
  VInteger,
  VNull,
  VReturnValue,
  VString,
  VTypes,
  VBuiltin,
} from './object'
import type { VObject } from './object'
import { builtins } from './builtins'
function isError(o: VObject) {
  return o && o.type() === VTypes.ERROR
}

interface VObjectConstructor<T extends VObject = VObject> {
  new (...args: any[]): T
}
type externalInfixType = Array<{
  left: VObjectConstructor
  right: VObjectConstructor
  handler: (op: string, left: VObject, right: VObject) => VObject
}>
// 被资本做局了 left不能从值中自动推倒出L对应的类型， left

export const externalInfixHandlers: externalInfixType = [
  {
    left: VString,
    right: VInteger,
    handler(op, left, right) {
      if (op != '*') return newError('I cant calculate integer ' + op + ' string')
      if (left instanceof VString && right instanceof VInteger) {
        return new VString(left.value.repeat(right.value))
      }
      return objConst.NULL
    },
  },
]
export function VEval(node: ASTNode, env: VEnvironment): VObject {
  let left, right, val, params, body
  switch (true) {
    case node instanceof Program:
      return evalProgram(node.statements, env)
    case node instanceof BlockStatement:
      return evalBlockStatements(node.statements, env)
    case node instanceof ExpressionStatement:
      return VEval(node.expression, env)
    case node instanceof BoolLiteral:
      return objConst[node.value ? 'TRUE' : 'FALSE']
    case node instanceof IntegerLiteral:
      return new VInteger(node.value)

    case node instanceof StringLiteral:
      return new VString(node.value)
    case node instanceof PrefixExpression:
      right = VEval(node.right, env)
      if (isError(right)) return right
      return evalPrefixExpression(node.operator, right)
    case node instanceof InfixExpression:
      left = VEval(node.left, env)
      right = VEval(node.right, env)
      if (isError(left)) return left
      if (isError(right)) return right
      return evalInfixExpression(node.operator, left, right)
    case node instanceof IfExpression:
      return evalIfExpression(node, env)
    case node instanceof ReturnStatement:
      val = VEval(node.value, env)
      if (isError(val)) return val
      return new VReturnValue(val)
    case node instanceof LetStatement:
      val = VEval(node.value, env)
      if (isError(val)) return val
      env.set(node.name.tokenLiteral(), val)
      return val
    case node instanceof Identifier:
      return evalIdentifier(node, env)
    case node instanceof FunctionLiteral:
      params = node.parameters
      body = node.body
      const temp1 = new VFunction(params, body, env)
      return temp1
    case node instanceof CallExpression:
      const functionObj = VEval(node.fn, env)
      if (isError(functionObj)) return functionObj

      const args = evalExpressions(node.args, env)

      if (args.length === 1 && isError(args[0])) return args[0]

      return applyFunction(functionObj, args)
  }
  return objConst.NULL
}
function applyFunction(fn: VObject, args: VObject[]) {
  switch (true) {
    case fn instanceof VFunction:
      const extendedEnv = extendFunctionEnv(fn, args)
      const evaluated = VEval(fn.body, extendedEnv)
      return unwrapReturnValue(evaluated)
    case fn instanceof VBuiltin:
      return fn.fn(...args)
    default:
      return newError('not a function: ' + fn.type())
  }
}
function extendFunctionEnv(fn: VFunction, args: VObject[]) {
  const env = new VEnvironment(fn.env)
  for (let paramIdx = 0; paramIdx < fn.parameters.length; paramIdx++)
    env.set(fn.parameters[paramIdx].tokenLiteral(), args[paramIdx])
  return env
}
function unwrapReturnValue(obj: VObject) {
  return obj instanceof VReturnValue ? obj.value : obj
}
function evalExpressions(expressions: Expression[], env: VEnvironment) {
  const result: VObject[] = []
  for (const expression of expressions) {
    const evaluated = VEval(expression, env)
    if (isError(evaluated)) {
      return [evaluated]
    }
    result.push(evaluated)
  }
  return result
}
function evalIdentifier(node: Identifier, env: VEnvironment) {
  const val = env.get(node.tokenLiteral())
  if (val) return val

  const val2: VBuiltin | undefined = builtins[node.tokenLiteral()]

  if (!val2) return newError('cannot find value of ' + node.tokenLiteral())

  return val2
}
function evalIfExpression(ie: IfExpression, env: VEnvironment) {
  const condition = VEval(ie.condition, env)
  if (isError(condition)) return condition
  if (isTruthy(condition)) return VEval(ie.consequence, env)
  else if (ie.alternative) return VEval(ie.alternative, env)
  else return objConst.NULL
}
function isTruthy(obj: VObject) {
  switch (obj) {
    case objConst.NULL:
      return false
    case objConst.FALSE:
      return false
    case objConst.TRUE:
      return true
    default:
      return true
  }
}
export function evalProgram(stmts: Statement[], env: VEnvironment): VObject {
  let result: VObject = objConst.NULL
  for (const statement of stmts) {
    result = VEval(statement, env)
    if (result instanceof VReturnValue) return result.value
    if (result instanceof VError) return result
  }
  return result
}

export function evalBlockStatements(stmts: Statement[], env: VEnvironment): VObject {
  let result: VObject = objConst.NULL
  for (const statement of stmts) {
    result = VEval(statement, env)
    if (result !== null && result instanceof VReturnValue) return result
    if (result instanceof VError) return result
  }
  return result
}
function evalInfixExpression(operator: string, left: VObject, right: VObject): VObject {
  for (const handlerObj of externalInfixHandlers) {
    if (left instanceof handlerObj.left && right instanceof handlerObj.right) {
      return handlerObj.handler(operator, left, right)
    }
  }
  switch (true) {
    case left instanceof VInteger && right instanceof VInteger:
      return evalIntegerInfixExpression(operator, left, right)
    case left instanceof VString && right instanceof VString && operator == '+':
      return new VString(left.value + right.value)
  }
  switch (operator) {
    case '==':
      return objConst[left === right ? 'TRUE' : 'FALSE']
    case '!=':
      return objConst[left !== right ? 'TRUE' : 'FALSE']
  }
  return newError(`not implemented: ${left.type()}${operator}${right.type()}`)
}
function evalIntegerInfixExpression(operator: string, left: VInteger, right: VInteger): VObject {
  const leftVal = left.value
  const rightVal = right.value

  switch (operator) {
    case '+':
      return new VInteger(leftVal + rightVal)
    case '-':
      return new VInteger(leftVal - rightVal)
    case '*':
      return new VInteger(leftVal * rightVal)
    case '/':
      return new VInteger(leftVal / rightVal)
    case '<':
      return objConst[leftVal < rightVal ? 'TRUE' : 'FALSE']
    case '>':
      return objConst[leftVal > rightVal ? 'TRUE' : 'FALSE']
    case '<=':
      return objConst[leftVal <= rightVal ? 'TRUE' : 'FALSE']
    case '>=':
      return objConst[leftVal >= rightVal ? 'TRUE' : 'FALSE']
    case '==':
      return objConst[leftVal === rightVal ? 'TRUE' : 'FALSE']
    case '!=':
      return objConst[leftVal !== rightVal ? 'TRUE' : 'FALSE']
  }
  return objConst.NULL
}
function evalPrefixExpression(operator: string, right: VObject): VObject {
  switch (operator) {
    case '!':
      return evalBangOpExpression(right)
    case '-':
      return evalMinusPrefixOpExpression(right)
    default:
      return newError(`unknown operator implement for ${operator}${right.type()}`)
  }
}
function evalMinusPrefixOpExpression(right: VObject) {
  if (!(right instanceof VInteger)) {
    return newError(`operator minus not implemented: ${right.type()}`)
  }
  return new VInteger(-right.value)
}
function evalBangOpExpression(right: VObject): VBoolean {
  switch (right) {
    case objConst.TRUE:
      return objConst.FALSE
    case objConst.FALSE:
      return objConst.TRUE
    case objConst.NULL:
      return objConst.TRUE
    default:
      return objConst.FALSE
  }
}

function newError(message: string) {
  return new VError(message)
}
export const objConst = {
  TRUE: new VBoolean(true),
  FALSE: new VBoolean(false),
  NULL: new VNull(),
}

export class VEnvironment {
  store: { [key: string]: VObject } = {}
  outer: VEnvironment | null
  get(name: string): VObject | undefined {
    const obj = this.store?.[name]
    if (!obj && this.outer) {
      return this.outer.get(name)
    }
    return obj
  }
  constructor(outer: VEnvironment | null = null) {
    this.outer = outer
  }
  set(name: string, val: VObject) {
    this.store[name] = val
    return val
  }
}
