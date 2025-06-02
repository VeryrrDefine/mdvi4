import { createApp } from 'vue'
import App from '../App.vue'
import { mainLoop } from './game-loops'
import { load, save } from './saves'
import {initTemp} from './temp'
import {postInitVRDLang} from './vrd-lang'

export function init() {

  load()
  initTemp()
  postInitVRDLang()
  setInterval(save, 2000)
  setInterval(mainLoop, 1000 / 60)
  createApp(App).mount('#app')
}
