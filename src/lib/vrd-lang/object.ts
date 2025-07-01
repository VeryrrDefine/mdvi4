import { BlockStatement, Identifier } from './ast'
import { VEnvironment } from './evaluator'

export enum VTypes {
  INTEGER_OBJECT = 'INTEGER',
  BOOLEAN_OBJECT = 'BOOLEAN',
  NULL_OBJECT = 'NULL',
  RETURN_VALUE_OBJECT = 'RETURN_VALUE',
  ERROR = 'ERROR',
  FUNCTION_OBJ = 'FUNCTION',
  STRING_OBJ = 'STRING',
    BUILTIN_OBJ = 'BUILTIN',
    ARRAY_OBJ = "ARRAY"
}

export interface VObject {
  type(): VTypes
  inspect(): string
}

export class VInteger implements VObject {
  value: number
  inspect(): string {
    return this.value.toString()
  }
  type() {
    return VTypes.INTEGER_OBJECT
  }
  constructor(value: number) {
    this.value = value
  }
}
export class VString implements VObject {
  value: string
  inspect(): string {
    return this.value.toString()
  }
  type() {
    return VTypes.STRING_OBJ
  }
  constructor(value: string) {
    this.value = value
  }
}
export class VBoolean implements VObject {
  value: boolean
  inspect(): string {
    return this.value ? 'true' : 'false'
  }
  type(): VTypes {
    return VTypes.BOOLEAN_OBJECT
  }
  constructor(value: boolean) {
    this.value = value
  }
}
export class VNull implements VObject {
  inspect(): string {
    return 'null'
  }
  type(): VTypes {
    return VTypes.NULL_OBJECT
  }
}
export class VReturnValue implements VObject {
  value: VObject
  inspect(): string {
    return this.value.inspect()
  }
  type() {
    return VTypes.RETURN_VALUE_OBJECT
  }
  constructor(value: VObject) {
    this.value = value
  }
}
export class VError implements VObject {
  message: string
  constructor(message: string) {
    this.message = message
  }
  type(): VTypes {
    return VTypes.ERROR
  }
  inspect(): string {
    return 'error: ' + this.message
  }
}

export class VFunction implements VObject {
  parameters: Identifier[]
  body: BlockStatement
  env: VEnvironment
  type(): VTypes {
    return VTypes.FUNCTION_OBJ
  }
  inspect(): string {
    return `fn(...) {...}`
  }
  constructor(parameters: Identifier[], body: BlockStatement, env: VEnvironment) {
    this.parameters = parameters
    this.body = body
    this.env = env
  }
}
export class VArray implements VObject {
  elements: VObject[]
  type() {
    return VTypes.ARRAY_OBJ
  }
  inspect(): string {
    return "["+this.elements.map((x)=>x.inspect()).join(',')+"]"
  }
  constructor(elements: VObject[]) {
    this.elements = elements;
  }
}
export class VBuiltin implements VObject {
  type(): VTypes {
    return VTypes.BUILTIN_OBJ
  }
  inspect(): string {
    return '<builtin function>'
  }
  constructor(fn: VBuiltinFunction) {
    this.fn = fn
  }
  fn: VBuiltinFunction
}
type VBuiltinFunction = (...args: VObject[]) => VObject
