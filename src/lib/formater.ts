import PowiainaNum, { type PowiainaNumSource } from 'powiaina_num.js'
import { player } from '@/core/saves/index.js'
import formatPowiainanumEsm from './format-powiainanum.esm'
export enum formaters {
  PSICUBED2,
  ENGINEERING,
  BLIND,
  POWIAINANUM_STRUCTURE,
}
export const formaterMap = new Map<
  formaters,
  (num: PowiainaNum | number | string, precision?: number) => string
>()
formaterMap.set(formaters.PSICUBED2, formatPowiainanumEsm)
formaterMap.set(formaters.ENGINEERING, function(num, precision){
  return Object.prototype.toString.call(new PowiainaNum(num)).toString()
})
formaterMap.set(formaters.BLIND, function () {
  return ''
})
formaterMap.set(formaters.POWIAINANUM_STRUCTURE, function (x: PowiainaNumSource) {
  return Object.prototype.toString.call(new PowiainaNum(x)).toString()
})

export const formaterNameMap = new Map<formaters, string>()

formaterNameMap.set(formaters.PSICUBED2, "Scientific (PsiCubed2's Letter Notation before {10, 10, 1000000, 2})")
formaterNameMap.set(formaters.ENGINEERING, "Engineering");
formaterNameMap.set(formaters.BLIND, 'Blind')
formaterNameMap.set(formaters.POWIAINANUM_STRUCTURE, 'PowiainaNum.js Number Structure')

export default function (num: PowiainaNum | number | string, precision?: number) {
  return (formaterMap.get(player.visualSettings.curFormater) ?? formatPowiainanumEsm)?.(num, precision ?? 4)
}
