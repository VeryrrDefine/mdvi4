import PowiainaNum from 'powiaina_num.js'
import { player } from './saves'
import {Upgrade} from './upgrade'
import format from '@/lib/formater'
export function linePointsGain() {
  return player.points.root(5).div(10).floor()
}
export function nextLineGain() {
  return linePointsGain().add(1).mul(10).pow(5)
}
export function lineReset(e?: any, force = false) {
  if (linePointsGain().gte(1) || force) {
    if (!force) player.linePoints = player.linePoints.add(linePointsGain())
    player.points = new PowiainaNum(0)
    if (upgrades[0].status) player.points = new PowiainaNum(120)
    player.buyables.accelerators = new PowiainaNum(0)
    player.buyables.autoclickers = new PowiainaNum(0)
  }
}

export function linePointEffect() {
  return player.linePoints.add(1).max(1).pow(0.5)
}

export const upgrades = [
  new class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint1 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint1
    }
    description(): string {
      return "每一次重置都会从120点数开始"
    }
    cost(): PowiainaNum {
      return new PowiainaNum(8)
    }
    canBuy(): boolean {
      return player.linePoints.gte(8)
    }
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.linePoints = player.linePoints.sub(8)
        this.status = true
        return true
      }
      return false
    }
  },
  new class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint2 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint2
    }
    description(): string {
      return "每个Accelerators给予1免费的Autoclickers（购买此升级消耗8线数）"
    }
    cost(): PowiainaNum {
      return new PowiainaNum(15)
    }
    canBuy(): boolean {
      return player.linePoints.gte(15)
    }
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.linePoints = player.linePoints.sub(8)
        this.status = true
        return true
      }
      return false
    }
  },
  new class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint3 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint3
    }
    description(): string {
      return `点数上限从${format(1000000,0)}到${format(10000000,0)}(购买此升级消耗8线数)`
    }
    cost(): PowiainaNum {
      return new PowiainaNum(20)
    }
    canBuy(): boolean {
      return player.linePoints.gte(20)
    }
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.linePoints = player.linePoints.sub(8)
        this.status = true
        return true
      }
      return false
    }
  },
  new class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint4 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint4
    }
    description(): string {
      return `点数增加Autoclickers的效果(-8)`
    }
    cost(): PowiainaNum {
      return new PowiainaNum(25)
    }
    canBuy(): boolean {
      return player.linePoints.gte(25)
    }
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.linePoints = player.linePoints.sub(8)
        this.status = true
        return true
      }
      return false

    }
  }

]
