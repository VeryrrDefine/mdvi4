import PowiainaNum from 'powiaina_num.js'
import { player } from './saves'
import { Upgrade } from './upgrade'
import format from '@/lib/formater'

export function linePointsEffect() {
  return player.linePoints.add(1).max(0.0001).pow(0.5)
}

export function linePointsGain() {
  let gain = player.points.max(0).root(5).div(10)
  if (upgrades[5].status) gain = gain.mul(player.linePoints.max(1).root(5))
  return gain.floor()
}

export function nextLineGain() {
  let next = linePointsGain().add(1)
  if (upgrades[5].status) next = next.div(player.linePoints.max(1).root(5))
  next = next.mul(10).pow(5)
  return next
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

export const upgrades = [
  new (class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint1 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint1
    }
    description(): string {
      return '每一次重置都会从120点数开始'
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
  })(),
  new (class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint2 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint2
    }
    description(): string {
      return '每个Accelerators给予1免费的Autoclickers（购买此升级消耗8线数）'
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
  })(),
  new (class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint3 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint3
    }
    description(): string {
      return `点数上限从${format(1000000, 0)}到${format(10000000, 0)}(购买此升级消耗8线数)`
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
  })(),
  new (class extends Upgrade {
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
  })(),
  new (class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint5 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint5
    }
    description(): string {
      return `linepoint add caps of points(-30)`
    }
    cost(): PowiainaNum {
      return new PowiainaNum(40)
    }
    canBuy(): boolean {
      return player.linePoints.gte(40)
    }
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.linePoints = player.linePoints.sub(30)
        this.status = true
        return true
      }
      return false
    }
  })(),
  new (class extends Upgrade {
    set status(x: boolean) {
      player.upgrades.linepoint6 = x
    }
    get status(): boolean {
      return player.upgrades.linepoint6
    }
    description(): string {
      return `linepoints add linepoints gain(-30)`
    }
    cost(): PowiainaNum {
      return new PowiainaNum(100)
    }
    canBuy(): boolean {
      return player.linePoints.gte(100)
    }
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.linePoints = player.linePoints.sub(30)
        this.status = true
        return true
      }
      return false
    }
  })(),
]
