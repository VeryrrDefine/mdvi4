import PowiainaNum from 'powiaina_num.js'
import './assets/main.scss'
import { init } from './core/init'
import { player, type Player } from './core/saves'
import { parseString } from './lib/vrd-lang'
import { VEnvironment } from './lib/vrd-lang/evaluator'
import Modal from './utils/Modal'
import formater from './lib/formater'
import { temp } from './core/temp'
import { makeReadonly } from './utils/readonly'

PowiainaNum.prototype.rec = PowiainaNum.prototype.reciprocate = function () {
  if (this.isNaN() || this.eq(PowiainaNum.ZERO)) return PowiainaNum.NaN.clone()
  if (this.abs().gt('2e323')) return PowiainaNum.ZERO.clone()
  return PowiainaNum.div(1, this)
}
init()
//方便开发调试
declare global {
  interface Window {
    player: Player
    temp: typeof temp
    PowiainaNum: typeof PowiainaNum
    parseString: typeof parseString
    VEnvironment: typeof VEnvironment
    Modal: typeof Modal
    format: typeof formater
  }
}

if (import.meta.env.DEV) {
  window.player = makeReadonly(player)
  window.Modal = Modal
  window.parseString = parseString
  window.VEnvironment = VEnvironment
  window.temp = temp
} else {
  window.player = makeReadonly(player)
}
window.PowiainaNum = PowiainaNum
window.format = formater

/*

class Chunk {
  private new_chunks: (number | [number, number])[]

  constructor(r: number[]) {
    const min: number[] = []
    const max: number[] = []
    for (const i of r) {
      const [minVal, maxVal] = this.getChunk(i)
      min.push(minVal)
      max.push(maxVal)
    }
    const sort = (a: number, b: number) => (a > b ? 1 : -1)
    min.sort(sort)
    max.sort(sort)

    this.new_chunks = []
    let min_sel = min[0]
    for (let i = 0; i < max.length; i++) {
      if (max[i] + 1 >= min[i + 1]) continue
      this.new_chunks.push(min_sel === max[i] ? max[i] : [min_sel, max[i]])
      min_sel = min[i + 1]
    }
  }

  unchunkify(): number[] {
    const list: number[] = []
    for (const i of this.new_chunks) {
      const [minVal, maxVal] = this.getChunk(i)
      for (let x = minVal; x <= maxVal; x++) {
        list.push(x)
      }
    }
    return list
  }

  getChunk(x: number | [number, number]): [number, number] {
    if (typeof x === 'number') {
      return [x, x]
    } else {
      return x || [0, 0]
    }
  }

  valueOf(): number[] {
    return this.unchunkify()
  }

  push(...x: number[]) {
    const a = this.unchunkify()
    for (let i = 0; i < x.length; i++) {
      a.push(x[i])
    }
    this.new_chunks = new Chunk(a).new_chunks
  }

  toJSON(): number[] {
    return this.unchunkify()
  }

  include(i: number): boolean {
    if ((this.new_chunks as number[]).includes(i)) return true
    for (const c of this.new_chunks as [number, number][]) {
      if (c[0] <= i && c[1] >= i) return true
    }
    return false
  }
}
 * */
