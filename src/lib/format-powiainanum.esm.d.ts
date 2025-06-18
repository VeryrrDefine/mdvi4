import PowiainaNum from 'powiaina_num.js'

export default (
  num: PowiainaNum | number | string,
  precision?: number,
  options?: {
    UCF?: boolean
    replaceBeforeF?: (num: PowiainaNum | number | string, precision?: number) => string
  },
) => string
export const regularFormat: (num: PowiainaNum, precision: number) => string
export const commaFormat: (num: PowiainaNum, precision: number) => string
export const myPolarize: (
  array: any,
  hasOperationRepeat?: boolean,
  toArrowVared?: boolean,
  parseToArrowNum?: number,
) => { bottom: number; repeation: number; arrows: number }
