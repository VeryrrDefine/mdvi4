export type StringOrFunc<T> = T | (() => T)
export default function <T>(x: undefined | StringOrFunc<T>, defValue: T): T {
  if (x === undefined) return defValue
  if (x instanceof Function) return x()
  else return x
}
