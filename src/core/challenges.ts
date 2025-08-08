import type PowiainaNum from 'powiaina_num.js'
import { panelPointReset } from './panelpoints'
import { player } from './saves'
import type { StringOrFunc } from '@/lib/fnchoice'

export const challengeFunctions = [() => panelPointReset(null, true)]
export const challengeGoalFunctions: (() => boolean)[][] = [
  [() => player.points.gte(10000), () => player.points.gte(1e13), () => player.points.gte(1e5)],
]
export function enterChallenge(id: number, layer = 0) {
  challengeFunctions[layer]()
  player.curChallenge[layer] = id
}

export function exitChallenge(id: number, layer = 0) {
  if (challengeGoalFunctions[layer][id - 1]) 
    player.challenges[layer][id - 1] = player.challenges[layer][id - 1].max(player.points)
  challengeFunctions[layer]()
  player.curChallenge[layer] = 0
}

export function inChallenge(id: number, layer = 0) {
  return player.curChallenge[layer] == id
}

export function countChallenge(id: number, layer = 0) {
  return player.challenges[layer][id - 1]
}

export interface singleChallenge {
  layer: number
  id: number
  title?: string
  description: StringOrFunc<string>
  goal: StringOrFunc<string>
  reward: StringOrFunc<string>
}
