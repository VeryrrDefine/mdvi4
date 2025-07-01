import {panelPointReset} from "./panelpoints";
import { player } from "./saves";

const challengeFunctions = [
  () => panelPointReset(null,true)
]
const challengeGoalFunctions = [
  []
]
export function enterChallenge(id: number , layer=0) {
  challengeFunctions[layer]();
  player.curChallenge[layer] = id;
}

export function exitChallenge(id: number, layer=0) {
  if (challengeGoalFunctions[layer][id-1]) player.challenges[layer][id-1] = player.points;
  challengeFunctions[layer]();
  player.curChallenge[layer] = 0;
}

export function inChallenge(id: number, layer=0) {
  return player.curChallenge[layer] == id;
}

export function countChallenge(id: number, layer=0) {
  return player.challenges[layer][id-1]
}
