/* export function makeReadonly<T extends object>(object: T) {
  return new Proxy(object, {
    set(target, prop) {
      throw new TypeError("Cannot set properties of undefined (reading '" + prop.toString() + "')")
    },
  })
} */

export function makeReadonly<T extends object>(object: T): Readonly<T> {
  return new Proxy(object, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      // 如果值是对象，则递归代理
      if (typeof value === 'object' && value !== null) {
        return makeReadonly(value);
      }
      return value;
    },
    set() {
      throw new TypeError('Cannot assign to read only property');
    },
    defineProperty() {
      throw new TypeError('Cannot define property on a read-only object');
    },
    deleteProperty() {
      throw new TypeError('Cannot delete property of a read-only object');
    },
    setPrototypeOf() {
      throw new TypeError('Cannot set prototype of a read-only object');
    }
  }) as Readonly<T>;
}
