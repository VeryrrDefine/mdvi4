import type PowiainaNum from "powiaina_num.js"
import myFormat  from './format-powiainanum.esm.js'
export enum formaters {
  PSICUBED2,
  MIXED_STANDARD,
}
export const formaterMap=new Map<formaters, (num: PowiainaNum|number|string, precision?:number)=>(string)>

formaterMap.set(formaters.PSICUBED2, myFormat)
formaterMap.set(formaters.MIXED_STANDARD, myFormat)
export default function (num: PowiainaNum | number | string, precision?: number){
  return myFormat(num, precision??4)
}
