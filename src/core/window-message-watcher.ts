import {temp} from "./temp";
import Modal from "@/utils/Modal";
export function isGalaxyMessage(e: any){
  if (e.galaxy) return true
}
interface GalaxyInfo {
  "type": "info"
  "galaxy": boolean
  "api_version": number
  "theme_preference": string
  "logged_in": boolean
}
interface GalaxySaveContent {
  "type": "save_content"
  error: boolean
  message: string
  slot: number
}
var attempts = 0;
export function watchListeners() {
  window.addEventListener("message", e => {

    temp.automatorresult += `[${e.origin}]`
    temp.automatorresult += JSON.stringify(e.data)
    if (e.origin === "https://galaxy.click") {
      let data = e.data
      temp.automatorresult += `\n${data.type}`
      switch (true) {
        case data.type == "info":
          let infodata = data as GalaxyInfo
          temp.inGalaxyIFrame = true
          break;
        case data.type == "save_content":
          let savedata = data as GalaxySaveContent
          if (savedata.error) {
            Modal.show({
              title:"Reading cloud saves error",
              content: savedata.message
            })
          }
          break;
      }
    }
    temp.automatorresult += "\n"
  });
  temp.watchGalaxyID = setInterval( function() {
    if (window.top && !temp.inGalaxyIFrame && attempts <= 3) {
      window.top.postMessage({
	      action: "info",
      }, "https://galaxy.click");
      attempts++;

    } else {clearInterval(temp.watchGalaxyID)}
  },10000)
}
