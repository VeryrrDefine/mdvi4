import { temp } from '../temp'

export function loadFromGalaxy(slot: number) {
  if (window.top && temp.inGalaxyIFrame) {
    window.top.postMessage(
      {
        action: 'load',
        slot: slot,
      },
      'https://galaxy.click',
    )
  }
}
