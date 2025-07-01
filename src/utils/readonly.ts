export function makeReadonly<T extends object>(object: T) {
  return new Proxy(object, {
    set (target, prop) {
      throw new TypeError("Cannot set properties of undefined (reading '"+prop.toString()+"')")
    }
  })
}
