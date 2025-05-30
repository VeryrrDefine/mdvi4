import { createApp } from 'vue'
import App from '../App.vue'
import { mainLoop } from './game-loops'
import { load, save } from './saves'

export function init() {

  load()
  setInterval(save, 2000)
  setInterval(mainLoop, 1000 / 60)
  createApp(App).mount('#app')
}
