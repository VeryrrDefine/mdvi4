import { reactive } from 'vue'

function tempData() {
  return {
    automatorresult: '',
    inGalaxyIFrame: false,
    nocap: false,
  }
}

export var temp = tempData()
export function initTemp() {
  temp = tempData()
  temp = reactive(temp)
}
