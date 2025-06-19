import PowiainaNum from 'powiaina_num.js'
import Modal from '../utils/Modal'
import { player } from './saves'

export const updimNeed = [new PowiainaNum(1e5), new PowiainaNum(1e10), new PowiainaNum('1e6365')]
export function upDim() {
  if (player.points.gte(updimNeed[player.curDimension])) {
    player.curDimension += 1
  }
}
