import { Program } from '@/lib/vrd-lang/ast'
import { Token } from '@/lib/vrd-lang/token'
import { reactive } from 'vue'

function tempData() {
  return {
    automatorresult: '',
    inGalaxyIFrame: false,
    nocap: false,
    watchGalaxyID: -1,
    curScript: 0,
    simulatingTime: false,

    runningProgram: new Program(new Token()),
    expands: ~~0x7fffffff, // bitmap
    baixieSystemConsole: "",
    BSCtips: "",
    BSCattempts: 0,
    yesyoushouldnt_go_there_counter: 0,
  }
}

export var temp = tempData()
export function initTemp() {
  temp = tempData()
  temp = reactive(temp)
}
