import PowiainaNum from 'powiaina_num.js'
import { player, type Player } from '../saves'
import { getPointsCap, getPointsGainPS, secondsRunPerTick } from '../game'
import { temp } from '../temp'
import { panelPointLoop } from '../panelpoints'
import { checkPlot } from '../plot'
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

  checkPlot()
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

