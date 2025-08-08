import { createApp, watch } from 'vue'
import App from '../App.vue'
import { mainLoop } from './game-loops'
import { load, player, save } from './saves'
import { initTemp } from './temp'
import { postInitVRDLang } from './vrd-lang'
import { watchListeners } from './window-message-watcher'
import VueVatex from 'vatex'
import { BaixieSystemEntry } from './fakeshell'

export function init() {
  load()
  

  initTemp()
  postInitVRDLang()
  setInterval(save, 2000)
  setInterval(mainLoop, 1000 / 60)

  watchListeners()
  createApp(App).use(VueVatex).mount('#app')
  BaixieSystemEntry()
}
