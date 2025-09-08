import PowiainaNum from 'powiaina_num.js'

interface ISoftcap {
  effectApply: 'pow' | ((num: PowiainaNum, start: PowiainaNum, eff: PowiainaNum) => PowiainaNum)
  effect(): PowiainaNum
  start(): PowiainaNum
}

const softcapEffFuncs: {
  [key: string]: (num: PowiainaNum, start: PowiainaNum, eff: PowiainaNum) => PowiainaNum
} = {
  pow(num: PowiainaNum, start: PowiainaNum, eff: PowiainaNum) {
    if (num.lte(start)) return num.clone()

    return num.div(start).pow(eff).mul(start)
  },
}
export const softcaps: ISoftcap[] = [
  {
    start() {
      return new PowiainaNum(3000)
    },
    effect() {
      return new PowiainaNum(0.5)
    },
    effectApply: 'pow',
  },
  {
    start() {
      return new PowiainaNum(1e250)
    },
    effect() {
      return new PowiainaNum("/1e8")
    },
    effectApply: 'pow',
  },
  {
    start() {
      return new PowiainaNum(Number.MAX_VALUE)
    },
    effect() {
      return new PowiainaNum("0.9")
    },
    effectApply (num: PowiainaNum, start: PowiainaNum, eff: PowiainaNum) {
      if (num.lte(start)) return num.clone()
      return num.log10().div(start.log10()).pow(eff).mul(start.log10()).pow_base(10)
    }
  },
]

export function applySoftcap(value: PowiainaNum, id: number) {
  let apply = softcaps[id].effectApply
  if (typeof apply == 'string') apply = softcapEffFuncs[apply]

  return apply(value, softcaps[id].start(), softcaps[id].effect())
}
export function softcapped(value: PowiainaNum, id: number) {
  return value.gte(softcaps[id].start())
}
