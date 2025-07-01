import PowiainaNum, { type PowiainaNumSource } from 'powiaina_num.js'
import myFormat from './format-powiainanum.esm.js'
import { player } from '@/core/saves/index.js'
import { formatHyperE } from './formaters/hyperE.js'
export enum formaters {
  PSICUBED2,
  BLIND,
  HYPERE,
  POWIAINANUM_STRUCTURE,
}
export const formaterMap = new Map<
  formaters,
  (num: PowiainaNum | number | string, precision?: number) => string
>()
formaterMap.set(formaters.PSICUBED2, myFormat)
formaterMap.set(formaters.BLIND, function () {
  return ''
})
formaterMap.set(formaters.HYPERE, formatHyperE)
formaterMap.set(formaters.POWIAINANUM_STRUCTURE, function (x: PowiainaNumSource) {
  return new PowiainaNum(x).toString(1)
})

export const formaterNameMap = new Map<formaters, string>()

formaterNameMap.set(formaters.PSICUBED2, "PsiCubed2's Letter Notation before {10, 10, 1000000, 2}")
formaterNameMap.set(formaters.BLIND, 'Blind')
formaterNameMap.set(formaters.HYPERE, 'Hyper E before 10^^^9e15')
formaterNameMap.set(formaters.POWIAINANUM_STRUCTURE, 'PowiainaNum.js Number Structure')

export default function (num: PowiainaNum | number | string, precision?: number) {
  return (formaterMap.get(player.visualSettings.curFormater) ?? myFormat)(num, precision ?? 4)
}
