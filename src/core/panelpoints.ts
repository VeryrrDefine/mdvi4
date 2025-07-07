import PowiainaNum from 'powiaina_num.js'
import { player } from './saves'
import { diff } from './game-loops'
import { inChallenge, type singleChallenge } from './challenges'
import formater from '@/lib/formater'
import { Upgrade } from './upgrade'

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
      return false
    }
    cost(): PowiainaNum {
      return PowiainaNum.POSITIVE_INFINITY
    }
    canBuy(): boolean {
      return false
    }
    description(): string {
      return 'foo'
    }
    effect() {}
    effectDesc(effect: any): string {
      return 'Cao'
    }
    set status(x: boolean) {}
    get status(): boolean {
      return false
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
  player.panelPointPower = player.panelPointPower.add(panelPointGain())
  player.linePoints = player.linePoints.add(player.panelPointPower.mul(diff))
  if (inChallenge(2)) player.points = player.points.add(player.panelPointPower.mul(diff))
}
