export default function <T>(x: undefined | T | (() => T), defValue: T): T {
  if (!x) return defValue
  if (x instanceof Function) return x()
  else return x
}
