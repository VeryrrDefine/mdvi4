export enum TokenType {
  ILLEGAL,
  EOF,

  IDENT,
  INT,

  ASSIGN,
  PLUS,
  MINUS,
  BANG,
  ASTERISK,
  SLASH,
  LT,
  GT,
  LTE,
  GTE,
  EQ,
  NEQ,
  COMMA,
  SEMICOLON,

  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,

  LBRACKET,
  RBRACKET,

  FUNCTION,
  LET,
  RETURN,
  TRUE,
  FALSE,
  IF,
  ELSE,
  WHEN,
  ASYNC,
  ONCE,

  STRING,

  COMMENT,
}

export const keywords: { [key: string]: TokenType } = {
  fn: TokenType.FUNCTION,
  function: TokenType.FUNCTION,
  let: TokenType.LET,
  return: TokenType.RETURN,
  true: TokenType.TRUE,
  false: TokenType.FALSE,
  if: TokenType.IF,
  else: TokenType.ELSE,
  when: TokenType.WHEN,
  once: TokenType.ONCE,
}

export function lookupIdent(ident: string) {
  if (keywords[ident]) return keywords[ident]
  else return TokenType.IDENT
}
export class Token {
  type: TokenType = TokenType.ILLEGAL
  literal: string = ''

  constructor(type?: TokenType, literal?: string) {
    if (type) this.type = type
    if (literal) this.literal = literal
  }
}
