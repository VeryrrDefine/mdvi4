import PowiainaNum from 'powiaina_num.js'
import Modal from '../utils/Modal'
import { player } from './saves'

export const updimNeed = [new PowiainaNum(1e5), new PowiainaNum('1e6365')]
export function upDim() {
  if (player.points.gte(updimNeed[player.curDimension])) {
    if (player.curDimension == 0)
      Modal.show({
        title: '升维',
        content: '100000 点数已经到达，在升维之后，你会获得 “线数” 。<br />不是，这是什么名字啊',
        onConfirm(values) {
          player.curDimension += 1
        },
      })
  }
}
