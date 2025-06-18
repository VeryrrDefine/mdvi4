import Decimal from 'break_eternity.js'
import PowiainaNum from 'powiaina_num.js'
const F179E308 = PowiainaNum.tetrate(10, Number.MAX_VALUE)
export function convertPowiainaNumToBEDecimal(x: PowiainaNum): Decimal {
  if (x.lt(0)) return convertPowiainaNumToBEDecimal(x.mul(-1)).neg()
  else if (x.eq(PowiainaNum.ZERO)) return Decimal.dZero
  else if (x.isNaN()) return Decimal.dNaN
  else if (!isFinite(x.operator(0, 1, 1))) return Decimal.dInf
  else if (x.gt(F179E308)) return Decimal.dInf
  else if (x.lt(Number.MAX_SAFE_INTEGER)) {
    return new Decimal(x.operator(0, 1, 1))
  } else if (x.operator(2, 1, 1) == 0) {
    // [y, [1, z, 1, 1]]
    let y = x.operator(0, 1, 1)
    let z = x.operator(1, 1, 1)
    // BE Decimal:
    // (e)^z y
    let result = new Decimal()
    result.sign = 1
    result.layer = z
    result.mag = y
    result = result.normalize()
    return result
  } else if (x.operator(2, 1, 1) == 1) {
    // [y, [1, 1, 1, 1], [2, 1, 1, 1]]
    return Decimal.tetrate(10, 10 ** x.operator(0, 1, 1))
  }
  return Decimal.dNaN
}
