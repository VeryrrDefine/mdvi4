import PowiainaNum from 'powiaina_num.js'
import { buyables } from './buyables'
import { player } from './saves/index'
import { linePointsEffect, upgrades as lpu } from './linepoint'
import { countChallenge, inChallenge } from './challenges'
import { applySoftcap } from './softcaps'
import { temp } from './temp'
import { capitalize, watch } from 'vue'
export const secondsRunPerTick = 3000

export function addPoints() {
  if (inChallenge(2)) return
  player.points = player.points.add(1)
  if (countChallenge(2).gte(1e14)) player.points = player.points.add(getPointsGainPS().mul(0.4))
}
export function getPointsGainPS() {
  let a = buyables.autoclickers.effect()

  if (player.plot.fake_hard_reseted) a = a.mul(1e5)
  a = a.mul("1e200")
  return a
}

export function getPointsCap() {
  let cap = new PowiainaNum(2.5e8)
  if (lpu[2].status) cap = cap.mul(10)
  if (lpu[4].status) cap = cap.mul(player.linePoints)
  if (!countChallenge(1, 0).isZero())
    cap = cap.mul(player.panelPointPower.add(1).pow(10).max(1))

  cap = applySoftcap(cap, 1)

  if (temp.yesyoushouldnt_go_there_counter < 33) {
    if (temp.yesyoushouldnt_go_there_counter>=1) {
      cap = new PowiainaNum("1e230")
    }
    if (temp.yesyoushouldnt_go_there_counter>=1.7) {
      cap = new PowiainaNum("1e200")
    }
    if (temp.yesyoushouldnt_go_there_counter>=3.2) {
      cap = new PowiainaNum("1e100")
    }
    if (temp.yesyoushouldnt_go_there_counter>=4.0) {
      cap = new PowiainaNum("1e50")
    }
    if (temp.yesyoushouldnt_go_there_counter>=5.0) {
      cap = new PowiainaNum("1e20")
    }
    if (temp.yesyoushouldnt_go_there_counter>=6.0) {
      cap = new PowiainaNum("1e10")
    }
    if (temp.yesyoushouldnt_go_there_counter>=7.0) {
      cap = new PowiainaNum("32050")
    }
    if (temp.yesyoushouldnt_go_there_counter>=8.0) {
      cap = new PowiainaNum("1")
    }
    if (temp.yesyoushouldnt_go_there_counter>=9.0) {
      cap = new PowiainaNum("/1e10000")
    }
    if (temp.yesyoushouldnt_go_there_counter>=10.0) {
      cap = new PowiainaNum("/(10^)^320 32050")
    }
    if (temp.yesyoushouldnt_go_there_counter>=15.0) {
      cap = new PowiainaNum("/(10^)^310004 1000000000320")
    }
    if (temp.yesyoushouldnt_go_there_counter>=20.0) {
      cap = new PowiainaNum("/(10^)^1000000000 1000000000320")
    }
    if (temp.yesyoushouldnt_go_there_counter>=25.0) {
      cap = new PowiainaNum("/10^^e40")
    }
    if (temp.yesyoushouldnt_go_there_counter>=30.0) {
      cap = new PowiainaNum("/Infinity")
    }
    if (temp.yesyoushouldnt_go_there_counter>=32.0) {
      cap = new PowiainaNum("/-10^^^1e92")
    }
  }

  if (player.volumePoints.gte(1)) {
    cap = cap.mul(player.volumePoints)
  }
  return cap
}
