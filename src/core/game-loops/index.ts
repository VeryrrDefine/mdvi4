import PowiainaNum from 'powiaina_num.js'
import { player, type Player } from '../saves'
import { getPointsCap, getPointsGainPS, secondsRunPerTick } from '../game'
import { temp } from '../temp'
import { panelPointLoop } from '../panelpoints'
import { checkPlot } from '../plot'
import { volumePLoop } from '../volumepoints'
import { FourD } from '../4d'
import { infGenLoop } from '../4d/infinity-generator'
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
  
    

  if (temp.yesyoushouldnt_go_there_counter>=1 && temp.yesyoushouldnt_go_there_counter<38) {
    player.points = getPointsCap();
  } else {
    player.points = player.points.add(getPointsGainPS().mul(diff))
    
    panelPointLoop()
  }
  checkPlot()
  volumePLoop()
  FourD.loop();
  infGenLoop()
  if (player.plot.yes_you_shouldnt_go_there && !player.plot.yysgt_reached && temp.yesyoushouldnt_go_there_counter<38) {
    temp.yesyoushouldnt_go_there_counter+=diff2;
    temp.simulatingTime = false;
  }

  if (temp.yesyoushouldnt_go_there_counter >= 38) {
    player.plot.yysgt_reached = true;
  }
  if (temp.yesyoushouldnt_go_there_counter >= 15) {
    player.plot.yysgt_reached = true;
    temp.yesyoushouldnt_go_there_counter = 38
  }
  if (player.plot.yysgt_reached) {
    temp.yesyoushouldnt_go_there_counter = 38

  }
  if (player.plot.fake_hard_reseted && player.tab.curTab[0]==0 && player.tab.curTab[1]==2) {
    player.challenges[0][0] = new PowiainaNum(1e20)
    player.challenges[0][1] = new PowiainaNum(1e20)
    player.challenges[0][2] = new PowiainaNum(1e20)
  }
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

