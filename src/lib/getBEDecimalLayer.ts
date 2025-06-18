import type PowiainaNum from 'powiaina_num.js'

export default function (num: PowiainaNum) {
  return num.max(8e15).slog(10).sub(1.0802209281505806).floor().max(0)
}
