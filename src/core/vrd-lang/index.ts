import { builtins } from '../../lib/vrd-lang/builtins'
import { VBuiltin, VInteger, VTypes, type VObject } from '../../lib/vrd-lang/object'
import { externalInfixHandlers, objConst } from '@/lib/vrd-lang/evaluator'
import { temp } from '../temp'
import formater from '@/lib/formater'
import PowiainaNum from 'powiaina_num.js'
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

externalInfixHandlers.push({
  left: VBignum,
  right: VBignum,
  handler(op, left, right) {
    if (left instanceof VBignum) {
      if (right instanceof VBignum) {
        return new VBignum(left.value.add(right.value))
      }

    }
    return new VBignum(PowiainaNum.NaN);
  },
})
externalInfixHandlers.push({
  left: VBignum,
  right: VInteger,
  handler(op, left, right) {
    if (left instanceof VBignum) {
      if (right instanceof VInteger) {
        return new VBignum(left.value.add(right.value))

      }

    }
    return new VBignum(PowiainaNum.NaN);
  },
})
export function postInitVRDLang() {
  builtins.puts = new VBuiltin(function (...args: VObject[]) {
    temp.automatorresult = temp.automatorresult + args.map((x) => x.inspect()).join(' ') + '\n'
    return objConst.NULL
  })
  builtins.envPoints = new VBuiltin(function () {
    return new VBignum(player.points.clone())
  })
}
