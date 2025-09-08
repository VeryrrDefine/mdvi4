import PowiainaNum from 'powiaina_num.js'
import { player } from './saves'
import { applySoftcap } from './softcaps'
import { linePointsEffect, upgrades as lpu } from './linepoint'
import {inChallenge} from './challenges'

interface singleBuyable {
  name: string
  desc: string
  cost(): PowiainaNum

  effect(): PowiainaNum
  buy(): undefined
  canAfford(): boolean
  softcapid?: number
  val?(): PowiainaNum
  costInverse(res: PowiainaNum): PowiainaNum
}

export const buyables: {
  autoclickers: singleBuyable
  accelerators: singleBuyable
} = {
  autoclickers: {
    name: 'Autoclickers',
    desc: '每秒获得 %s 点数',
    val() {
      let a = player.buyables.autoclickers
      if (lpu[1].status) a = a.add(player.buyables.accelerators.mul(1.3))

      return a
    },
    cost() {
      return PowiainaNum.pow(1.2, player.buyables.autoclickers).mul(15)
    },
    costInverse(res: PowiainaNum){
      return res.div(15).log(1.2).floor();
    },
    effect() {
      let a = new PowiainaNum(this?.val?.() ?? 0).mul(buyables.accelerators.effect())
      if (lpu[3].status) a = a.mul(player.points.max(1).log10().max(0.5).mul(2))
      a = a.mul(linePointsEffect())
      if (inChallenge(3)) a = a.pow(0.5)
      a = applySoftcap(a, 2)
      return a
    },
    buy() {
      if (!this.canAfford()) return
      const cost = this.cost()
      player.buyables.autoclickers = player.buyables.autoclickers.add(1)
      player.points = player.points.sub(cost)
    },
    canAfford() {
      return player.points.gte(this.cost())
    },
  },
  accelerators: {
    name: 'Accelerators',
    desc: 'Autoclickers效果*%s',

    cost() {
      return PowiainaNum.pow(1.5, player.buyables.accelerators.pow(1.05)).mul(50)
    },
    effect() {
      return applySoftcap(PowiainaNum.pow(1.5, player.buyables.accelerators), 0)
    },
    costInverse(res: PowiainaNum){
      return res.div(50).log(1.5).root(1.05).floor();
    },
    softcapid: 0,
    buy() {
      if (!this.canAfford()) return
      const cost = this.cost()
      player.buyables.accelerators = player.buyables.accelerators.add(1)
      player.points = player.points.sub(cost)
    },
    canAfford() {
      return player.points.gte(this.cost())
    },
  },
}
