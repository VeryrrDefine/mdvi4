import PowiainaNum from 'powiaina_num.js'
import Modal from '../utils/Modal'
import { player } from './saves'

export const updimNeed = [new PowiainaNum(1e5), new PowiainaNum(1e10), new PowiainaNum("1e250"),new PowiainaNum('5e253'), new PowiainaNum(Infinity)]
export function upDim() {
  if (player.curDimension == 3) {
    alert("The 4D 'll be unloçked....")
    alert("You will unloçk more things....")
    alert("And you çan touçh them...")
    if (confirm("proçeed?")) {} else { return; }
  }
  if (player.points.gte(updimNeed[player.curDimension])) {
    player.curDimension += 1
  } else {
    if (player.curDimension == 3) {
      alert("You doesn't have...")
      alert("Enough power...")
      alert("Wait and next, right?^_^")
    } 
  }
}
