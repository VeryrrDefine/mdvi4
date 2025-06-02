import PowiainaNum from "powiaina_num.js"
import {player} from "./saves"

export const buyables = {
  autoclickers: {
    name: 'Autoclickers',
    desc: '每秒获得 %s 点数',
    cost(){
      return PowiainaNum.pow(1.5, player.buyables.autoclickers).mul(50)
    },
    effect(){
      return new PowiainaNum(player.buyables.autoclickers).mul(buyables.accelerators.effect())
    },
    buy() {
      if (!this.canAfford()) return
      const cost = this.cost()
      player.buyables.autoclickers = player.buyables.autoclickers.add(1)
      player.points = player.points.sub(cost)
    },
    canAfford() {
      return player.points.gte(this.cost())
    }
  },
  accelerators: {
    name: 'Accelerators',
    desc: 'Autoclickers效果*%s',

    cost(){
      return PowiainaNum.pow(1.5, player.buyables.accelerators.pow(1.05)).mul(250)

    },
    effect(){
      return PowiainaNum.pow(1.5, player.buyables.accelerators)
    },
    buy() {
      if (!this.canAfford()) return
      const cost = this.cost()
      player.buyables.accelerators = player.buyables.accelerators.add(1)
      player.points = player.points.sub(cost)
    },
    canAfford() {
      return player.points.gte(this.cost())
    }
  },
}
