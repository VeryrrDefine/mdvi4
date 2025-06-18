import { builtins } from '../../lib/vrd-lang/builtins'
import { VBuiltin, VTypes, type VObject } from '../../lib/vrd-lang/object'
import { objConst } from '@/lib/vrd-lang/evaluator'
import { temp } from '../temp'
import formater from '@/lib/formater'
import type PowiainaNum from 'powiaina_num.js'
import { player } from '../saves'
export class VBignum implements VObject {
  type(): VTypes {
    return VTypes.INTEGER_OBJECT
  }
  inspect(): string {
    return 'Bignum(' + formater(this.value) + ')'
  }
  value: PowiainaNum
  constructor(value: PowiainaNum) {
    this.value = value
  }
}
export function postInitVRDLang() {
  builtins.puts = new VBuiltin(function (...args: VObject[]) {
    temp.automatorresult = temp.automatorresult + args.map((x) => x.inspect()).join(' ') + '\n'
    return objConst.NULL
  })
  builtins.envPoints = new VBuiltin(function () {
    return new VBignum(player.points.clone())
  })
}
