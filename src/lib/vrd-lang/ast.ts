import { Token } from './token'

// Abstract Syntax Tree
export interface ASTNode {
  tokenLiteral(): string
  getString(): string
}

// such as 'let a = 3' command
export interface Statement extends ASTNode {
  statementNode?(): any
}
// such as '3+211145145+sth'
export interface Expression extends ASTNode {
  expressionNode?(): any
}

export class BlockStatement implements Statement {
  token: Token
  statements: Statement[] = []
  tokenLiteral() {
    return this.statements[0].tokenLiteral()
  }
  getString() {
    return '{' + this.statements.map((x) => x.getString()).join(',') + '}'
  }
  constructor(token: Token, statements?: Statement[]) {
    this.token = token
    if (statements) this.statements = statements
  }
}

export class Program extends BlockStatement {
  statements: Statement[] = []
  tokenLiteral() {
    return this.statements[0].tokenLiteral()
  }
}

export class Identifier implements Expression {
  token: Token
  tokenLiteral() {
    return this.token.literal
  }
  getString(): string {
    return this.token.literal
  }
  constructor(token: Token) {
    this.token = token
  }
}

export class LetStatement implements Statement {
  token: Token
  name: Identifier
  value: Expression
  tokenLiteral() {
    return this.token.literal
  }
  getString() {
    return `let ${this.name.getString()}=${this.value?.getString?.()};`
  }
  constructor(token: Token, name: Identifier, value: Expression) {
    this.token = token
    this.name = name
    this.value = value
  }
}

export class ReturnStatement implements Statement {
  token: Token
  value: Expression
  tokenLiteral() {
    return this.token.literal
  }
  getString() {
    return `return ${this.value?.getString?.()};`
  }
  constructor(token: Token, value: Expression) {
    this.token = token
    this.value = value
  }
}
export class ExpressionStatement implements Statement {
  expression: Expression
  token: Token
  tokenLiteral() {
    return this.token.literal
  }
  getString() {
    return this.expression.getString()
  }
  constructor(token: Token, expression: Expression) {
    this.token = token
    this.expression = expression
  }
}

export class IntegerLiteral implements Expression {
  tokenLiteral() {
    return this.token.literal
  }
  token: Token
  value: number

  getString() {
    return this.value.toString()
  }
  constructor(token: Token) {
    this.token = token
    this.value = parseInt(token.literal)
  }
}
export class StringLiteral implements Expression {
  tokenLiteral() {
    return this.token.literal
  }
  token: Token
  value: string

  getString() {
    return this.value.toString()
  }
  constructor(token: Token) {
    this.token = token
    this.value = token.literal
  }
}
export class PrefixExpression implements Expression {
  tokenLiteral() {
    return this.token.literal
  }
  token: Token
  operator: string
  right: Expression

  getString() {
    return `(${this.operator}${this.right?.getString?.()})`
  }
  constructor(token: Token, op: string, right: Expression) {
    this.token = token
    this.operator = op
    this.right = right
  }
}
export class InfixExpression implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token
  left: Expression
  operator: string
  right: Expression

  getString(): string {
    return `(${this.left?.getString?.()}${this.operator}${this.right?.getString?.()})`
  }
  constructor(token: Token, op: string, left: Expression, right: Expression) {
    this.token = token
    this.operator = op
    this.right = right
    this.left = left
  }
}
export class BlEx implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token

  getString(): string {
    return ``
  }
  constructor(token: Token) {
    this.token = token
  }
}
export class BoolLiteral implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token
  value: boolean
  getString(): string {
    return this.value.toString()
  }
  constructor(token: Token, value: boolean) {
    this.token = token
    this.value = value
  }
}
export class IfExpression implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token

  condition: Expression

  consequence: BlockStatement
  alternative?: BlockStatement
  getString(): string {
    return `if(${this.condition?.getString?.()}) ${this.consequence?.getString?.()} else ${this.alternative?.getString?.() ?? ''}`
  }
  constructor(
    token: Token,
    condition: Expression,
    consequence: BlockStatement,
    alternative?: BlockStatement,
  ) {
    this.token = token
    this.condition = condition
    this.consequence = consequence
    if (alternative) this.alternative = alternative
  }
}
export class FunctionLiteral implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token
  parameters: Identifier[]
  body: BlockStatement
  getString(): string {
    return `fn (${this.parameters?.map?.((x) => x?.getString())?.join?.(',')}) ${this.body?.getString?.()}`
  }
  constructor(token: Token, parameters: Identifier[], body: BlockStatement) {
    this.token = token
    this.parameters = parameters
    this.body = body
  }
}

export class WhenExpression implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token
  cond: Expression
  body: BlockStatement
  eventonce: boolean
  getString(): string {
    return `when ${this.cond.getString()} ${this.body?.getString?.()}`
  }
  constructor(token: Token, cond: Expression, body: BlockStatement) {
    this.token = token
    this.cond = cond
    this.body = body
    this.eventonce = false
  }
}
export class CallExpression implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token
  fn: Expression
  args: Expression[]
  getString(): string {
    return `(${this.fn?.getString?.()})(${this.args?.map?.((x) => x?.getString?.())?.join?.(',')})`
  }
  constructor(token: Token, fn: Expression, args: Expression[]) {
    this.token = token
    this.fn = fn
    this.args = args
  }
}
export class GetPropertiesExpression implements Expression {
  tokenLiteral(): string {
    return this.token.literal
  }
  token: Token
  left: Expression
  prop: Expression
  getString(): string {
    return `(${this.left.getString()}[${this.prop.getString()}])`
  }
  constructor(token: Token, fn: Expression, args: Expression) {
    this.token = token
    this.left = fn
    this.prop = args
  }
}
export class ArrayLiteral implements Expression {
  token: Token
  elements: Expression[]
  tokenLiteral() {
    return this.token.literal
  }
  getString(): string {
    return '[' + this.elements.map((x) => x.getString()).join(',') + ']'
  }

  constructor(token: Token, elements: Expression[]) {
    this.token = token
    this.elements = elements
  }
}
