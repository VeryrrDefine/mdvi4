import PowiainaNum from 'powiaina_num.js'
import './assets/main.scss'
import { init } from './core/init'
import { player, type Player } from './core/saves'
import { parseString } from './lib/vrd-lang'
import { VEnvironment } from './lib/vrd-lang/evaluator'
import Modal from './utils/Modal'
import formater from './lib/formater'
import { temp } from './core/temp'
import {makeReadonly} from './utils/readonly'

PowiainaNum.prototype.rec = PowiainaNum.prototype.reciprocate = function () {
  if (this.isNaN() || this.eq(PowiainaNum.ZERO)) return PowiainaNum.NaN.clone()
  if (this.abs().gt('2e323')) return PowiainaNum.ZERO.clone()
  return PowiainaNum.div(1, this)
}
init()
//方便开发调试
declare global {
  interface Window {
    player: Player
    temp: typeof temp
    PowiainaNum: typeof PowiainaNum
    parseString: typeof parseString
    VEnvironment: typeof VEnvironment
    Modal: typeof Modal
    format: typeof formater
  }
}

if (import.meta.env.DEV) {
  window.player = player
  window.Modal = Modal
  window.parseString = parseString
  window.VEnvironment = VEnvironment
  window.temp = temp
} else {
  window.player = makeReadonly(player)
}
window.PowiainaNum = PowiainaNum
window.format = formater
