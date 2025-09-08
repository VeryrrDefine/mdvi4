import { VBuiltin, VInteger, VString } from './object'
import type { VObject } from './object'
export const builtins: { [key: string]: VBuiltin } = {
  len: new VBuiltin(async (x: VObject) => {
    if (x instanceof VString) return new VInteger(x.value.length)
    else return new VInteger(NaN)
  }),
}
