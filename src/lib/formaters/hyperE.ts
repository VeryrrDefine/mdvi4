import PowiainaNum, { type PowiainaNumSource } from 'powiaina_num.js'
import formatPowiainanumEsm, { myPolarize } from '../format-powiainanum.esm'
const SLOG_OF_9 = 0.9542425094393248 // slog(9)
function splitNum(x: number) {
  let y = Math.floor(x)

  return [y, 10 ** (x - y)]
}
export function formatHyperE(numsource: PowiainaNumSource, precision = 4): string {
  const num = new PowiainaNum(numsource)
  const precision1 = Math.max(4, precision)
  if (num.isNaN()) return 'NaN'

  if (num.lt(0)) return '-' + formatHyperE(num.mul(-1))
  else if (num.lt(1e9)) return num.array[0].toFixed(precision)
  else if (num.lt('e1e9')) return 'E' + formatHyperE(num.log10(), precision1)
  else if (num.lt('10^^9007199254740992')) {
    const layers = num.slog(10).sub(SLOG_OF_9).floor()
    const top = num.slog(10).sub(layers) //slog(9) ~ slog(10^9)

    return `E${formatHyperE(PowiainaNum.tetrate(10, top), precision1)}#${formatHyperE(layers, 0)}`
  } else if (num.lt('10^^^9007199254740992')) {
    let polres = myPolarize(num.array, true, false)
    let s = splitNum(polres.bottom)
    return `E${formatHyperE(s[1], precision1)}#${formatHyperE(s[0], 0)}#${formatHyperE(polres.repeation, 0)}`
  } else if (num.lt('10^^^^9007199254740992')) {
    let polres = myPolarize(num.array, true, false)
    let s = splitNum(polres.bottom)
    let s2 = splitNum(s[1])
    return `E${formatHyperE(s2[1], precision1)}#${formatHyperE(s2[0], 0)}#${formatHyperE(s[0], 0)}#${formatHyperE(polres.repeation, 0)}`
  }

  return formatPowiainanumEsm(numsource, precision)
  // Zhuni formating yisheng, guilai renshi formatPowiainanumEsm
}
