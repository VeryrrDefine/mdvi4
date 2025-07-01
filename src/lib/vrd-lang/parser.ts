import {temp} from '@/core/temp'
import {
  LetStatement,
  BlockStatement,
  Identifier,
  Program,
  ReturnStatement,
  ExpressionStatement,
  IntegerLiteral,
  PrefixExpression,
  InfixExpression,
  BoolLiteral,
  IfExpression,
  FunctionLiteral,
  CallExpression,
  StringLiteral,
  ArrayLiteral,
  GetPropertiesExpression,
  BlEx,
} from './ast'
import type { Statement, Expression } from './ast'
import { Lexer } from './lexer'
import { Token, TokenType } from './token'

const LOWEST = 0
const EQUALS = 1
const LESSGREATER = 2
const SUM = 3
const PRODUCT = 4
const PREFIX = 5
const CALL = 6
const INDEX = 7
const DEBUG = true
const printtotemp = function (...a:any){
 temp.automatorresult+=a.toString()
  temp.automatorresult+="\n"
}
const precedences = new Map<TokenType, number>()
precedences.set(TokenType.EQ, EQUALS)
precedences.set(TokenType.NEQ, EQUALS)
precedences.set(TokenType.LT, LESSGREATER)
precedences.set(TokenType.GT, LESSGREATER)
precedences.set(TokenType.LTE, LESSGREATER)
precedences.set(TokenType.GTE, LESSGREATER)
precedences.set(TokenType.PLUS, SUM)
precedences.set(TokenType.MINUS, SUM)
precedences.set(TokenType.ASTERISK, PRODUCT)
precedences.set(TokenType.SLASH, PRODUCT)
precedences.set(TokenType.LPAREN, CALL)
precedences.set(TokenType.LBRACKET, INDEX)
type prefixParseFn = () => Expression | null
type infixParseFn = (fn: Expression) => Expression | null
class PlhoEx implements Expression {
  tokenLiteral(): string {
    return ''
  }
  getString(): string {
    return ''
  }
}
export class Parser {
  lexer: Lexer
  curToken: Token = new Token()
  peekToken: Token = new Token()
  prefixParseFns: Map<TokenType, prefixParseFn>
  infixParseFns: Map<TokenType, infixParseFn>
  constructor(lexerInstance: Lexer) {
    this.lexer = lexerInstance
    this.nextToken()
    this.nextToken()

    this.prefixParseFns = new Map<TokenType, prefixParseFn>()
    this.prefixParseFns.set(TokenType.LPAREN, this.parseGroupedExpression.bind(this))
    this.infixParseFns = new Map<TokenType, infixParseFn>()
    this.prefixParseFns.set(TokenType.IDENT, this.parseIdentifier.bind(this))
    this.prefixParseFns.set(TokenType.INT, this.parseIntegerLiteral.bind(this))
    this.prefixParseFns.set(TokenType.STRING, this.parseString.bind(this))
    this.prefixParseFns.set(TokenType.TRUE, this.parseBooleanLiteral.bind(this))
    this.prefixParseFns.set(TokenType.FALSE, this.parseBooleanLiteral.bind(this))
    this.prefixParseFns.set(TokenType.MINUS, this.parsePrefixExpression.bind(this))
    this.prefixParseFns.set(TokenType.BANG, this.parsePrefixExpression.bind(this))
    this.prefixParseFns.set(TokenType.LPAREN, this.parseGroupedExpression.bind(this))
    this.prefixParseFns.set(TokenType.IF, this.parseIfExpression.bind(this))
    this.prefixParseFns.set(TokenType.LBRACKET, this.parseArrayLiteral.bind(this))
    this.prefixParseFns.set(TokenType.FUNCTION, this.parseFunctionLiteral.bind(this))

    precedences.forEach((value, key) => {
      if (value <= CALL) this.infixParseFns.set(key, this.parseInfixExpression.bind(this))
    })
    this.infixParseFns.set(TokenType.LPAREN, this.parseCallExpression.bind(this))
    this.infixParseFns.set(TokenType.LBRACKET, this.parseGetPropertyExpression.bind(this))
  }

  nextToken() {
    this.curToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  parseProgram() {
    const program = new Program(new Token())
    program.statements = []
    while (this.curToken.type !== TokenType.EOF) {
      const statement = this.parseStatement()
      if (statement !== undefined && statement !== null) {
        program.statements.push(statement)
      }
      this.nextToken()
    }
    return program
  }
  parseExpression(precedence: number): Expression | null {
    const prefix = this.prefixParseFns.get(this.curToken.type)
    if (!prefix) return null
    let leftExp = prefix()
    while (!this.peekTokenIs(TokenType.SEMICOLON) && precedence < this.peekPrecedence()) {
      const infix = this.infixParseFns.get(this.peekToken.type)

      if (!infix) return leftExp

      this.nextToken()
      if (!leftExp) return null
      leftExp = infix(leftExp)
    }
    return leftExp
  }
  parseCallExpression(left: Expression): Expression {
    const exp = new CallExpression(this.curToken, left, [])
    exp.args = this.parseExpressionList() ?? []

    return exp
  }
  parseGetPropertyExpression(left: Expression): Expression|null {
    const exp = new GetPropertiesExpression(this.curToken, left, new BlEx(this.curToken))
    this.nextToken()
    const exp2 = this.parseExpression(LOWEST);
    if (!exp2) return null;
    exp.prop = exp2;
    if (!this.expectPeek(TokenType.RBRACKET) ) return null;
    return exp
  }
  parseExpressionList(end=TokenType.RPAREN): Expression[] | null {
    const args: Expression[] = []
    if (this.peekTokenIs(end)) {
      this.nextToken()
      return args
    }
    this.nextToken()
    let t = this.parseExpression(LOWEST)
    if (t) args.push(t)
    while (this.peekTokenIs(TokenType.COMMA)) {
      this.nextToken()
      this.nextToken()
      t = this.parseExpression(LOWEST)
      if (t) args.push(t)
    }
    if (!this.expectPeek(end)) return null
    return args
  }
  parseFunctionLiteral(): Expression | null {
    const lit = new FunctionLiteral(this.curToken, [], new BlockStatement(new Token()))

    if (!this.expectPeek(TokenType.LPAREN)) return null

    lit.parameters = this.parseFunctionParameters() ?? []
    if (!this.expectPeek(TokenType.LBRACE)) return null

    lit.body = this.parseBlockStatement()
    return lit
  }

  parseFunctionParameters(): Identifier[] | null {
    const identifiers: Identifier[] = []
    if (this.peekTokenIs(TokenType.RPAREN)) {
      this.nextToken()
      return identifiers
    }
    this.nextToken()
    const ident = new Identifier(this.curToken)

    identifiers.push(ident)
    while (this.peekTokenIs(TokenType.COMMA)) {
      this.nextToken()
      this.nextToken()
      const newIdent = new Identifier(this.curToken)
      identifiers.push(newIdent)
    }
    if (!this.expectPeek(TokenType.RPAREN)) return null
    return identifiers
  }

  parseArrayLiteral() {
    return new ArrayLiteral(this.curToken, this.parseExpressionList(TokenType.RBRACKET) ?? [])
  }
  parseIfExpression(): Expression | null {
    const expression = new IfExpression(
      this.curToken,
      new PlhoEx(),
      new BlockStatement(new Token()),
    )

    if (!this.expectPeek(TokenType.LPAREN)) return null

    this.nextToken()
    const cond = this.parseExpression(LOWEST)
    if (!cond) return null
    expression.condition = cond

    if (!this.expectPeek(TokenType.RPAREN)) return null
    if (!this.expectPeek(TokenType.LBRACE)) return null
    const conseq = this.parseBlockStatement()

    expression.consequence = conseq
    if (this.peekTokenIs(TokenType.ELSE)) {
      this.nextToken()

      if (!this.expectPeek(TokenType.LBRACE)) return null
      expression.alternative = this.parseBlockStatement()
    }
    return expression
  }

  parseBlockStatement(): BlockStatement {
    const block = new BlockStatement(this.curToken)

    this.nextToken()

    while (!this.curTokenIs(TokenType.RBRACE) && !this.curTokenIs(TokenType.EOF)) {
      const statement = this.parseStatement()
      if (statement) block.statements.push(statement)

      this.nextToken()
    }

    return block
  }
  parseGroupedExpression(): Expression | null {
    this.nextToken()

    const expression = this.parseExpression(LOWEST)
    if (!this.expectPeek(TokenType.RPAREN)) return null
    return expression
  }
  parseInfixExpression(left: Expression): Expression | null {
    const expression = new InfixExpression(this.curToken, this.curToken.literal, left, new PlhoEx())
    const precedence = this.curPrecedence()
    this.nextToken()

    const t = this.parseExpression(precedence)
    if (!t) return null

    expression.right = t
    return expression
  }
  parsePrefixExpression(): Expression | null {
    const expression = new PrefixExpression(this.curToken, this.curToken.literal, new PlhoEx())

    this.nextToken()

    const right2 = this.parseExpression(PREFIX)

    if (!right2) return null
    expression.right = right2
    return expression
  }
  parseBooleanLiteral(): Expression {
    const ident = new BoolLiteral(this.curToken, this.curToken.literal == 'true' ? true : false)
    return ident
  }

  parseIntegerLiteral(): Expression {
    const ident = new IntegerLiteral(this.curToken)
    return ident
  }
  parseString(): StringLiteral {
    const ident = new StringLiteral(this.curToken)
    ident.value = this.curToken.literal
    return ident
  }

  parseIdentifier(): Expression {
    return new Identifier(this.curToken)
  }
  parseStatement(): Statement | null {
    switch (this.curToken.type) {
      case TokenType.LET:
        return this.parseLetStatement()
      case TokenType.RETURN:
        return this.parseReturnStatement()
      default:
        return this.parseExpressionStatement()
    }
  }
  parseExpressionStatement(): ExpressionStatement | null {
    const statement = new ExpressionStatement(this.curToken, new PlhoEx())
    const test = this.parseExpression(LOWEST)
    if (!test) return null
    statement.expression = test
    return statement
  }
  parseReturnStatement(): ReturnStatement | null {
    const statement = new ReturnStatement(this.curToken, new PlhoEx())
    statement.token = this.curToken

    this.nextToken()
    const expr2 = this.parseExpression(LOWEST)
    if (expr2) statement.value = expr2
    if (this.peekTokenIs(TokenType.SEMICOLON)) this.nextToken()

    // while (!this.curTokenIs(TokenType.SEMICOLON)) this.nextToken()

    return statement
  }
  parseLetStatement(): LetStatement | null {
    const statement = new LetStatement(this.curToken, new Identifier(new Token()), new PlhoEx())
    statement.token = this.curToken
    if (!this.expectPeek(TokenType.IDENT)) {
      return null
    }

    statement.name = new Identifier(this.curToken)

    if (!this.expectPeek(TokenType.ASSIGN)) {
      return null
    }
    this.nextToken()
    const expr2 = this.parseExpression(LOWEST)
    if (expr2) statement.value = expr2
    if (this.peekTokenIs(TokenType.SEMICOLON)) this.nextToken()

    return statement
  }
  expectPeek(token: TokenType) {
    if (this.peekTokenIs(token)) {
      this.nextToken()
      return true
    } else return false
  }
  expectCur(token: TokenType) {
    if (this.curTokenIs(token)) {
      return true
    } else return false
  }
  peekTokenIs(token: TokenType) {
    return this.peekToken.type == token
  }
  curTokenIs(token: TokenType) {
    return this.curToken.type == token
  }
  curPrecedence() {
    return precedences.get(this.curToken.type) ?? LOWEST
  }
  peekPrecedence() {
    return precedences.get(this.peekToken.type) ?? LOWEST
  }
}
