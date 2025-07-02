import PowiainaNum from 'powiaina_num.js'
import { player, type Player } from '../saves'
import { getPointsCap, getPointsGainPS, secondsRunPerTick } from '../game'
import { temp } from '../temp'
import { panelPointLoop } from '../panelpoints'
let diff = 0
let diff2 = 0
export function mainLoop() {
  diff2 = (Date.now() - player.lastUpdated) / 1000

  diff = diff2
  if (player.gameBoost > 0 && !temp.simulatingTime) {
    if (player.gameBoost < diff2) {
      diff += player.gameBoost
      player.gameBoost = 0
    } else {
      diff *= 2
      player.gameBoost -= diff2
    }
  }

  if (temp.simulatingTime && player.unrunnedTimes > 0) {
    if (player.unrunnedTimes <= secondsRunPerTick * 1000) {
      diff += player.unrunnedTimes / 1000
      player.unrunnedTimes = 0
    } else {
      diff += 10
      player.unrunnedTimes -= 10000
    }
  } else {
    temp.simulatingTime = false
  }
  player.points = player.points
    .add(getPointsGainPS().mul(diff))
    .min(temp.nocap ? Infinity : getPointsCap())
  panelPointLoop()
  player.lastUpdated = Date.now()
}
export { diff }

function isMobile() {
  if ('userAgentData' in navigator) {
    const ua = (navigator as any).userAgentData
    return ua.mobile
  } else {
    return /Android|webOS|iPhone||iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}
export const device = isMobile() ? 'mobile' : 'computer'
//device = "computer"

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
