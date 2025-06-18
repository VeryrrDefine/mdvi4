import PowiainaNum from 'powiaina_num.js'
import { buyables } from './buyables'
import { player } from './saves/index'
import { linePointEffect, upgrades as lpu} from './linepoint'

export function addPoints() {
  player.points = player.points.add(1)
}

export function getPointsGainPS() {
  return buyables.autoclickers.effect().mul(linePointEffect())
}

export function getPointsCap() {
  let cap = new PowiainaNum(1e6)
  if (lpu[2].status) cap = cap.mul(10)

  return cap
}
