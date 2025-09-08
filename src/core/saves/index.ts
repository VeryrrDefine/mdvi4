import { saveSerializer } from './serializer'
import { reactive, watchEffect } from 'vue'
import PowiainaNum from 'powiaina_num.js'

import type { Tab } from '../tab/Tabs'
import Modal from '@/utils/Modal'
import { formaters } from '@/lib/formater'
import type { PlayerPlot } from '../plot'
import { temp } from '../temp'
import { panelPointReset } from '../panelpoints'
import { lineReset } from '../linepoint'
import { v4 as uuidv4 } from 'uuid'
const SAVE_ID = 'caution_wetfloor2_test5'
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
    hasPEITRnews: boolean
    newsSpeed: number
  }
  upgrades: {
    linepoint1: boolean
    linepoint2: boolean
    linepoint3: boolean
    linepoint4: boolean
    linepoint5: boolean
    linepoint6: boolean
    panelpoint1: boolean
    panelpoint2: boolean
    panelpoint3: boolean
  }
  curDimension: number
  linePoints: PowiainaNum
  panelPoints: PowiainaNum
  panelPointPower: PowiainaNum
  volumePoints: PowiainaNum
  unrunnedTimes: number
  gameBoost: number
  curChallenge: number[]
  challenges: PowiainaNum[][]
  scripts: string[]
  plot: PlayerPlot
  uuid: string
  fd: {
    d1: PowiainaNum
    d2: PowiainaNum
    d3: PowiainaNum
    d4: PowiainaNum
    inf_gen_t: PowiainaNum
    inf_bases: PowiainaNum
  }
}
function getInitialPlayerData(): Player {
  return {
    points: new PowiainaNum(0),
    lastUpdated: Date.now(),
    uuid: "00000000-0000-0000-0000-000000000000",
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
      panelpoint1: false,
      panelpoint2: false,
      panelpoint3: false,
    },
    visualSettings: {
      curFormater: 0,
      hasPEITRnews: false,
      newsSpeed: 1,
    },
    curDimension: 0,

    linePoints: new PowiainaNum(0),
    panelPoints: new PowiainaNum(0),
    panelPointPower: new PowiainaNum(0),
    volumePoints: new PowiainaNum(0),
    unrunnedTimes: 0,
    gameBoost: 0,
    curChallenge: [0],
    challenges: [[new PowiainaNum(0), new PowiainaNum(0), new PowiainaNum(0)]],
    scripts: [
      'let fibbonacci = fn(a) {\nif (a<=2) { return 1; }\nelse { return fibbonacci(a-1) + fibbonacci(a-2); }\n};puts(fibbonacci(10))',
    ],
    plot: {
      at_max_hardcap: false,
      very_important_news: false,
      terminal_discovered: false,
      what_is_this_shard: false,
      yes_you_shouldnt_go_there: false,
      dimens_amount_getting_started: false,
      yysgt_reached: false,
      fake_hard_reseted: false,
      fake_hard_resets: 0,

      terminal_found: false,
    },
    fd: {
      d1: new PowiainaNum(0),
      d2: new PowiainaNum(0),
      d3: new PowiainaNum(0),
      d4: new PowiainaNum(0),
      inf_gen_t: new PowiainaNum(0),
      inf_bases: new PowiainaNum(0),
    }
  }
}

let player: Player = getInitialPlayerData()

const blackListProperties: string[] = ['scripts']
export function deepCopyProps(source: any, target: any) {
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
    if (typeof object[key] === 'string' && object[key].startsWith("PN")) {
      object[key] = new PowiainaNum(object[key])
    }
    if (typeof object[key] === 'object') {
      transformToP(object[key])
    }
  }
}

function load(): void {
  player = getInitialPlayerData()
  try{
    if (localStorage.getItem(SAVE_ID)) {
      const temp_player: any = saveSerializer.deserialize(localStorage.getItem(SAVE_ID))
      deepCopyProps(temp_player, player)
      transformToP(player)
    }
  } catch {
    console.error("The save meet a problem")
    player=getInitialPlayerData();
  }
  player.unrunnedTimes += Date.now() - player.lastUpdated
  player.lastUpdated = Date.now()
  player = reactive(player) as Player
  postInit(player)
}
function postInit(player: Player) {
  if (player.scripts.length < 20) {
    player.scripts.length = 20
  }
}
function save(): void {
  localStorage.setItem(SAVE_ID, saveSerializer.serialize(player))
}
const savefn = save;
function hardReset(): void {
  Object.assign(player, getInitialPlayerData()) as Player
  player.uuid = uuidv4()
}
function fakeHardReset(): void {
  let tag=false;
  let hardresets = player.plot.fake_hard_resets;
  if (player.plot.yysgt_reached) tag = true
  if (player.plot.fake_hard_resets==0)
    Object.assign(player, getInitialPlayerData()) as Player
  if (player.plot.fake_hard_resets==1)
    panelPointReset()
  if (player.plot.fake_hard_resets==2)
    panelPointReset()
  if (player.plot.fake_hard_resets==3)
    lineReset()
  if (player.plot.fake_hard_resets==4)
    lineReset()
  player.plot.fake_hard_reseted = tag;
  player.plot.fake_hard_resets = hardresets+1;
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
  a.setAttribute('accepted', '.txt')
  a.click()
  a.onchange = () => {
    const fr = new FileReader()
    if (a.files == null) return void alert('未选择文件')
    fr.onload = () => {
      const save = fr.result
      const temp_player: any = saveSerializer.deserialize(save)
      hardReset();
      transformToP(temp_player)
      temp_player.unrunnedTimes = temp_player.unrunnedTimes + Date.now() - temp_player.lastUpdated
      temp_player.lastUpdated = Date.now()
      Object.assign(player, temp_player)
      postInit(player)
      savefn();
      location.reload();
      
    }
    fr.readAsText(a.files[0])
  }
}

export function requestedHardReset() {
  Modal.show({
    title: '硬重置存档!?!?',
    get content() {
      return '你真的要硬重置吗？'+(
        (!player.plot.yysgt_reached || player.curDimension>=4)?'这将重置当前存档的所有内容，你不会获得任何奖励！<img style="height: 1em; vertical-align: middle;" src="jingxia.gif">': "<span class='red'>这就是你应该做的。</span>")
    },
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
          if (player.plot.yysgt_reached || player.curDimension>=4) {
            temp.yesyoushouldnt_go_there_counter = 0;
            fakeHardReset()
          } else {
            hardReset()
          }
        },
        class: 'danger-button',
      },
    ],
    showCancelButton: false,
    showConfirmButton: false,
  })
}
