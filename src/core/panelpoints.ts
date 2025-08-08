import PowiainaNum from 'powiaina_num.js'
import { player } from './saves'
import { diff } from './game-loops'
import { inChallenge, type singleChallenge } from './challenges'
import formater from '@/lib/formater'
import { Upgrade } from './upgrade'
import { buyables } from './buyables'

export function getPanelPointGain() {
  let gain = player.points.root(10).div(10)
  return gain.floor()
}

export function getNextPanelPointGain() {
  let next = getPanelPointGain().add(1)
  next = next.mul(10).pow(10)

  return next
}

export const ppChals: singleChallenge[] = [
  {
    layer: 0,
    id: 1,
    description: "Panel Point Power's production is reversed and x0.01",
    reward() {
      return `Panel Point Power adds points cap`
    },
    goal() {
      return `${formater(10000)} points`
    },
  },
  {
    layer: 0,
    id: 2,
    description:
      "Panel Point Power also produce points.<br><span style='color:red'>But you cannot produce points by your clicks.</span>",
    reward() {
      return 'Points gain from clicks is added: Autoproducted points persecond x0.4'
    },
    goal() {
      return `${formater(1e13)} points`
    },
  },
  {
    layer: 0,
    id: 3,
    description: 'Points gain is ^0.5, you cannot get linepoint-upgrades.',
    reward() {
      return 'Improve linepoints-gain formula, unlock upgrades.'
    },
    goal() {
      return `${formater(1e5)} points`
    },
  },
]
export const ppUpgrades: Upgrade[] = [
  new (class extends Upgrade {
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.panelPoints = player.panelPoints.sub(this.cost())
        this.status = true
        return true
      }
      return false
      return false
    }
    cost(): PowiainaNum {
      return new PowiainaNum(5);
    }
    canBuy(): boolean {
      return player.panelPoints.gte(this.cost());
    }
    description(): string {
      return '线数的获取量基于面数而提升。'
    }
    effect() {
      return player.panelPoints.add(1).pow(0.7).max(1);
    }
    effectDesc(effect: any): string {
      return "×"+formater(effect)
    }
    set status(x: boolean) {
      player.upgrades.panelpoint1 = x;
    }
    get status(): boolean {
      return player.upgrades.panelpoint1
    }
  })(),
  new (class extends Upgrade {
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.panelPoints = player.panelPoints.sub(this.cost())
        this.status = true
        return true
      }
      return false
      return false
    }
    cost(): PowiainaNum {
      return new PowiainaNum(50);
    }
    canBuy(): boolean {
      return player.panelPoints.gte(this.cost());
    }
    description(): string {
      return '平面点数能量获取✖2'
    }
    set status(x: boolean) {
      player.upgrades.panelpoint2 = x;
    }
    get status(): boolean {
      return player.upgrades.panelpoint2
    }
  })(),
  new (class extends Upgrade {
    buy(): boolean {
      if (!this.status && this.canBuy()) {
        player.panelPoints = player.panelPoints.sub(this.cost())
        this.status = true
        return true
      }
      return false
      return false
    }
    cost(): PowiainaNum {
      return new PowiainaNum(200);
    }
    canBuy(): boolean {
      return player.panelPoints.gte(this.cost());
    }
    description(): string {
      return '自动购买点数的购买项'
    }
    set status(x: boolean) {
      player.upgrades.panelpoint3 = x;
    }
    get status(): boolean {
      return player.upgrades.panelpoint3
    }
  })(),
]
export function panelPointReset(e?: any, force = false) {
  if (force) {
    player.points = new PowiainaNum(0)
    player.upgrades.linepoint1 = false
    player.upgrades.linepoint2 = false
    player.upgrades.linepoint3 = false
    player.upgrades.linepoint4 = false
    player.upgrades.linepoint5 = false
    player.upgrades.linepoint6 = false
    player.linePoints = new PowiainaNum(0)
    player.buyables.autoclickers = new PowiainaNum(0)
    player.buyables.accelerators = new PowiainaNum(0)
    player.panelPointPower = new PowiainaNum(0)
  } else if (player.points.gte(1e10)) {
    player.panelPoints = player.panelPoints.add(getPanelPointGain())
    panelPointReset(null, true)
  }
}
export function panelPointGain() {
  return player.panelPoints
    .pow(3)
    .div(1e6)
    .mul(diff)
    .mul(inChallenge(1, 0) ? -0.01 : 1)
}
export function panelPointLoop() {
  player.panelPointPower = player.panelPointPower.add(panelPointGain().mul(
    ppUpgrades[1].status ? 2 : 1
  ))
  player.linePoints = player.linePoints.add(player.panelPointPower.mul(diff))
  if (inChallenge(2)) player.points = player.points.add(player.panelPointPower.mul(diff))

    if (player.upgrades.panelpoint3) {
      player.buyables.autoclickers = player.buyables.autoclickers.max(
        buyables.autoclickers.costInverse(player.points)
      )
      player.buyables.accelerators = player.buyables.accelerators.max(
        buyables.accelerators.costInverse(player.points)
      )
    }
}
