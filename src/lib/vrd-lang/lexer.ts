import { TokenType, Token, lookupIdent } from './token'

export class Lexer {
  input: string
  position = 0
  readPosition = 0
  ch: string

  static symbolsMap: { [key: string]: TokenType } = {
    ';': TokenType.SEMICOLON,
    '(': TokenType.LPAREN,
    ')': TokenType.RPAREN,
    ',': TokenType.COMMA,
    '{': TokenType.LBRACE,
    '}': TokenType.RBRACE,
    '': TokenType.EOF,
    '+': TokenType.PLUS,
    '-': TokenType.MINUS,
    '*': TokenType.ASTERISK,
    '/': TokenType.SLASH,
  }
  static doubleCharMap: { [key: string]: [string, TokenType, TokenType] } = {
    '=': ['=', TokenType.EQ, TokenType.ASSIGN],
    '>': ['=', TokenType.GTE, TokenType.GT],
    '<': ['=', TokenType.LTE, TokenType.LT],
    '!': ['=', TokenType.NEQ, TokenType.BANG],
  }

  constructor(input: string) {
    this.input = input
    this.ch = this.input[this.position]
    this.readChar()
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = ''
    } else {
      this.ch = this.input[this.readPosition]
    }
    this.position = this.readPosition
    this.readPosition++
  }

  peekChar() {
    if (this.readPosition >= this.input.length) {
      return ''
    }
    return this.input[this.readPosition]
  }

  nextToken(): Token {
    this.skipWhiteSpace()

    if(this.ch=='&' && this.peekChar()=='/') {
      while( !(this.peekChar()=="\n"||this.peekChar()=="\r"||this.peekChar()=='')) this.readPosition++
      return this.nextToken()
    } else{
      return this.normalyToken()
    }
  }
  normalyToken(): Token{
    const token = new Token()
    if (Lexer.symbolsMap[this.ch]) {
      token.type = Lexer.symbolsMap[this.ch]
      token.literal = this.ch
    }
    let token2: Token = new Token()
    if (Lexer.doubleCharMap[this.ch]) {
      token2 = this.doubleCharacter(...Lexer.doubleCharMap[this.ch])

      token.type = token2.type
      token.literal = token2.literal
    }
    if (this.ch == `"`) {
      token.type = TokenType.STRING
      token.literal = this.readString()
    }

    if (isLetter(this.ch)) {
      token.literal = this.readIdentifier()
      token.type = lookupIdent(token.literal)

      return token
    }
    if (isDigit(this.ch)) {
      token.literal = this.readNumber()
      token.type = TokenType.INT

      return token
    }
    this.readChar()
    return token
  }
  doubleCharacter(secondChar: string, doubleT: TokenType, singleT: TokenType): Token {
    const token = new Token()
    if (this.peekChar() == secondChar) {
      const ch = this.ch
      this.readChar()
      const literal = ch + this.ch
      ;(token.type = doubleT), (token.literal = literal)
    } else {
      token.type = singleT
      token.literal = this.ch
    }
    return token
  }
  readIdentifier(): string {
    const start = this.position
    while (isLetter(this.ch)) this.readChar()

    return this.input.substring(start, this.position)
  }
  readString(): string {
    const start = this.position
    let res = ''
    while (true) {
      this.readChar()
      const curChar = this.ch
      if (curChar == '"' || !curChar) break

      if (curChar == '\\') {
        this.readChar()
        const appChar = this.ch
        if (appChar == 'n') res = res.concat('\n')
      } else {
        res = res.concat(curChar)
      }
    }
    return res
  }
  readNumber(): string {
    const start = this.position
    while (isDigit(this.ch)) this.readChar()

    return this.input.substring(start, this.position)
  }
  skipWhiteSpace() {
    while (this.ch == '\n' || this.ch == '\r' || this.ch == ' \t' || this.ch == ' ') {
      this.readChar()
    }
  }
}

function isDigit(ch: string) {
  return ch !== '' && /[0-9]/.test(ch)
}
function isLetter(ch: string) {
  return ch !== '' && /[a-zA-Z]/.test(ch)
}
