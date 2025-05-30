import { Lexer } from './lexer'
import { Parser } from './parser'
import { evalProgram, VEnvironment } from './evaluator'
import { VTypes } from './object'
export function parseString(code: string, env: VEnvironment) {
  const lexer = new Lexer(code)
  const parser = new Parser(lexer)
  const program = parser.parseProgram()
  const evaluated = evalProgram(program.statements, env)
  if (evaluated.type() !== VTypes.ERROR) return { error: 0, env: env, evaluated, message: '' }
  else return { error: 1, env: env, evaluated, message: evaluated.inspect() }
}
