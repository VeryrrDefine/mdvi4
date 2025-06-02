import PowiainaNum from 'powiaina_num.js'
import {buyables} from './buyables'
import { player } from './saves/index'

export function addPoints(){
  player.points = player.points.add(1)
}

export function getPointsGainPS(){
  return buyables.autoclickers.effect()
}

export function getPointsCap() {
  return new PowiainaNum(1e6)
}
