import PowiainaNum from "powiaina_num.js";
import { player } from "./saves";
import {diff} from "./game-loops";
export function getPanelPointGain() {
  let gain = player.points.root(10).div(10)
  return gain.floor()
}
export function getNextPanelPointGain() {
  let next = getPanelPointGain().add(1)
  next = next.mul(10).pow(10)

  return next
}
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
    player.panelPointPower=new PowiainaNum(0)

  } else if (player.points.gte(1e10)){
    player.panelPoints = player.panelPoints.add(getPanelPointGain())
    panelPointReset(null, true)

  }
}
export function panelPointLoop() {
  player.panelPointPower = player.panelPointPower.add(player.panelPoints.pow(3).div(1e6).mul(diff));
  player.linePoints = player.linePoints.add(player.panelPointPower.mul(diff));
}
