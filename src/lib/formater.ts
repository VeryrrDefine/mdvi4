import PowiainaNum, { type PowiainaNumSource } from 'powiaina_num.js'
import myFormat from './format-powiainanum.esm.js'
import { player } from '@/core/saves/index.js'
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
formaterMap.set(formaters.PSICUBED2, myFormat)
formaterMap.set(formaters.ENGINEERING, function(num, precision){
  return myFormat(num, precision, {
      engineering: true,
  })
})
formaterMap.set(formaters.BLIND, function () {
  return ''
})
formaterMap.set(formaters.POWIAINANUM_STRUCTURE, function (x: PowiainaNumSource) {
  return new PowiainaNum(x).toString(1)
})

export const formaterNameMap = new Map<formaters, string>()

formaterNameMap.set(formaters.PSICUBED2, "Scientific (PsiCubed2's Letter Notation before {10, 10, 1000000, 2})")
formaterNameMap.set(formaters.ENGINEERING, "Engineering");
formaterNameMap.set(formaters.BLIND, 'Blind')
formaterNameMap.set(formaters.POWIAINANUM_STRUCTURE, 'PowiainaNum.js Number Structure')

export default function (num: PowiainaNum | number | string, precision?: number) {
  return (formaterMap.get(player.visualSettings.curFormater) ?? myFormat)(num, precision ?? 4)
}
