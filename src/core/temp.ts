import {reactive} from "vue"

function tempData(){
  return {
    automatorresult:''
  }

}

export var temp = tempData()
export function initTemp() {
  temp = tempData()
  temp = reactive(temp)
}
