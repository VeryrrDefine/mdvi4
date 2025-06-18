import PowiainaNum from 'powiaina_num.js'
import './assets/main.scss'
import { init } from './core/init'
import { player, type Player } from './core/saves'
import { parseString } from './lib/vrd-lang'
import { VEnvironment } from './lib/vrd-lang/evaluator'
import Modal from './utils/Modal'
import formater from './lib/formater'
init()
//方便开发调试
declare global {
  interface Window {
    player: Player
    PowiainaNum: typeof PowiainaNum
    parseString: typeof parseString
    VEnvironment: typeof VEnvironment
    Modal: typeof Modal
    format: typeof formater
  }
}

if (import.meta.env.DEV) {
  window.player = player
  window.PowiainaNum = PowiainaNum
  window.Modal = Modal
  window.format = formater
  window.parseString = parseString
  window.VEnvironment = VEnvironment
}
