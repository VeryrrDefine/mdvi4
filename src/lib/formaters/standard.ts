// 标准记数法

import PowiainaNum, {type PowiainaNumSource} from "powiaina_num.js";

const prefixes = {
  t1: ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
  t1_2: ["", ""]
}
export function getPrefix(power: PowiainaNum):string {
  if (power.lt(0)) return `/${getPrefix(power.mul(-1))}`;


}

export function standardFormat(x: PowiainaNumSource) {
  const num = new PowiainaNum(x)
}
