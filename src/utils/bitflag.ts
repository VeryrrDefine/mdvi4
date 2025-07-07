export function hasFlag(flag: number, bitset: number): boolean {
  return Boolean((bitset >> flag) % 2)
}

export function setFlag(flag: number, bitset: number, value: 0 | 1): number {
  if (value == 0) return ~(~bitset | (1 << flag))
  else return bitset | (1 << flag)
}
