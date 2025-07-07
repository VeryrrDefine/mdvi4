import PowiainaNum from 'powiaina_num.js'
import { buyables } from './buyables'
import { player } from './saves/index'
import { linePointsEffect, upgrades as lpu } from './linepoint'
import { countChallenge, inChallenge } from './challenges'
export const secondsRunPerTick = 3000

export function addPoints() {
  if (inChallenge(2)) return
  player.points = player.points.add(1)
  if (countChallenge(2).gte(1e14)) player.points = player.points.add(getPointsGainPS().mul(0.4))
}

export function getPointsGainPS() {
  let a = buyables.autoclickers.effect()
  return a
}

export function getPointsCap() {
  let cap = new PowiainaNum(1e6)
  if (lpu[2].status) cap = cap.mul(10)
  if (lpu[4].status) cap = cap.mul(player.linePoints)
  if (countChallenge(1, 0).gt(0))
    cap = cap.pow(PowiainaNum.pow(2, player.panelPointPower.add(1)).max(1))
  return cap
}
