import { saveSerializer } from './serializer'
import { reactive } from 'vue'
import PowiainaNum from 'powiaina_num.js'

import type { Tab } from '../tab/Tabs'
import Modal from '@/utils/Modal'
import { formaters } from '@/lib/formater'
const SAVE_ID = 'caution_wetfloor2'
export interface Player {
  points: PowiainaNum
  lastUpdated: number
  buyables: {
    autoclickers: PowiainaNum
    accelerators: PowiainaNum
  }
  tab: Tab
  visualSettings: {
    curFormater: formaters
  }
  upgrades: {
    linepoint1: boolean
    linepoint2: boolean
    linepoint3: boolean
    linepoint4: boolean
    linepoint5: boolean
    linepoint6: boolean
  }
  curDimension: number
  linePoints: PowiainaNum
  panelPoints: PowiainaNum
  panelPointPower: PowiainaNum
  unrunnedTimes: number
  gameBoost: number
  curChallenge: number[]
  challenges: PowiainaNum[][]
}
function getInitialPlayerData(): Player {
  return {
    points: new PowiainaNum(0),
    lastUpdated: Date.now(),
    buyables: {
      autoclickers: new PowiainaNum(0),
      accelerators: new PowiainaNum(0),
    },
    tab: {
      curTab: [0, 0],
      memoryTab: [0],
    },
    upgrades: {
      linepoint1: false,
      linepoint2: false,
      linepoint3: false,
      linepoint4: false,
      linepoint5: false,
      linepoint6: false,
    },
    visualSettings: {
      curFormater: 0,
    },
    curDimension: 0,

    linePoints: new PowiainaNum(0),
    panelPoints: new PowiainaNum(0),
    panelPointPower: new PowiainaNum(0),
    unrunnedTimes: 0,
    gameBoost: 0,
    curChallenge: [0],
    challenges: [
      [new PowiainaNum(0)]
    ],
  }
}

let player: Player = getInitialPlayerData()

const blackListProperties: string[] = []
function deepCopyProps(source: any, target: any) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      // 如果源对象的属性是对象或数组，则递归复制
      if (
        typeof source[key] === 'object' &&
        !(source[key] instanceof PowiainaNum) &&
        source[key] !== null
      ) {
        // 如果目标对象没有这个属性，或者属性是null，则创建一个新的
        if (
          !target.hasOwnProperty(key) ||
          target[key] == null ||
          Array.isArray(source[key]) !== Array.isArray(target[key])
        ) {
          target[key] = Array.isArray(source[key]) ? [] : {}
        }
        // 递归复制属性
        deepCopyProps(source[key], target[key])
      } else {
        // 如果属性不是对象或数组，则直接复制
        target[key] = source[key]
      }
    }
  }
}

function transformToP(object: any): any {
  for (const key in object) {
    if (blackListProperties.includes(key)) {
      continue
    }
    if (
      typeof object[key] === 'string' &&
      !new PowiainaNum(object[key]).array[0].toString().includes('NaN')
    ) {
      object[key] = new PowiainaNum(object[key])
    }
    if (typeof object[key] === 'object') {
      transformToP(object[key])
    }
  }
}

function load(): void {
  player = getInitialPlayerData()
  if (localStorage.getItem(SAVE_ID)) {
    const temp_player: any = saveSerializer.deserialize(localStorage.getItem(SAVE_ID))
    deepCopyProps(temp_player, player)
    transformToP(player)
  }
  player.unrunnedTimes+= Date.now()-player.lastUpdated;
  player.lastUpdated = Date.now();
  player = reactive(player) as Player
}

function save(): void {
  localStorage.setItem(SAVE_ID, saveSerializer.serialize(player))
}

function hardReset(): void {
  Object.assign(player, getInitialPlayerData()) as Player
}

export { load, save, player }

export function export_file(): void {
  const str = saveSerializer.serialize(player)
  const file = new Blob([str], {
    type: 'text/plain',
  })
  window.URL = window.URL || window.webkitURL
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(file)
  a.download = 'Baixie Incremental Save - ' + getCurrentBeijingTime() + '.txt'
  a.click()
}

function getCurrentBeijingTime(): string {
  const t = new Date(),
    e = t.getUTCFullYear(),
    r = String(t.getUTCMonth() + 1).padStart(2, '0'),
    a = String(t.getUTCDate()).padStart(2, '0'),
    n = t.getUTCHours(),
    g = t.getUTCMinutes(),
    i = t.getUTCSeconds(),
    S = t.getUTCMilliseconds()
  let o = (n + 8) % 24
  return (
    o < 0 && (t.setUTCDate(t.getUTCDate() + 1), (o += 24)),
    `${e}-${r}-${a} ${o.toString().padStart(2, '0')}:${g.toString().padStart(2, '0')}:${i.toString().padStart(2, '0')}.${S.toString().padStart(3, '0')}`
  )
}

export function import_file(): void {
  const a = document.createElement('input')
  a.setAttribute('type', 'file')
  a.click()
  a.onchange = () => {
    const fr = new FileReader()
    if (a.files == null) return void alert('未选择文件')
    fr.onload = () => {
      const save = fr.result
      const temp_player: any = saveSerializer.deserialize(save)
      transformToP(temp_player)
      Object.assign(player, temp_player)
    }
    fr.readAsText(a.files[0])
  }
}

export function requestedHardReset() {
  Modal.show({
    title: '硬重置存档!?!?',
    content:
      '你真的要硬重置吗？这将重置当前存档的所有内容，你不会获得任何奖励！<img style="height: 1em; vertical-align: middle;" src="jingxia.gif">',
    closeOnClickMask: false,
    buttons: [
      {
        text: '取消',
        handler(e, instance) {
          instance?.handleCancel?.()
        },
        class: 'confirm-button',
      },
      {
        text: '我确定我在做什么！',
        handler(e, instance) {
          instance?.handleConfirm?.()
          hardReset()
        },
        class: 'danger-button',
      },
    ],
    showCancelButton: false,
    showConfirmButton: false,
  })
}
