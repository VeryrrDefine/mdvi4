import PowiainaNum from 'powiaina_num.js'

export default (
  num: PowiainaNum | number | string,
  precision?: number,
  options?: {
    UCF?: boolean
    engineering: boolean
    replaceBeforeF?: (num: PowiainaNum | number | string, precision?: number) => string
  },
) => string
export const regularFormat: (num: PowiainaNum, precision: number) => string
export const commaFormat: (num: PowiainaNum, precision: number) => string
export const myPolarize: (
  arr01: any,
  hasOperationRepeat?: boolean,
  toArrowVared?: boolean,
  parseToArrowNum?: number,
) => { bottom: number; repeation: number; arrows: number }
