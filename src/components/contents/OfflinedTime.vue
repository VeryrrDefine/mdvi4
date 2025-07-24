<script setup lang="ts">
import formater from '@/lib/formater'
import CenterDiv from '../ui/CenterDiv.vue'
import MultiTextTag from '../ui/MultiTextTag.vue'
import { resetAnimation } from '@/utils/resetAnimation'
import { player } from '@/core/saves'
import { onMounted, onUnmounted, ref } from 'vue'
import { temp } from '@/core/temp'
const usedrestext = ref<null | HTMLSpanElement>(null)
var interval = 0
function useOffline() {
  if (player.unrunnedTimes > 60000) {
    if (usedrestext.value !== null) {
      let d = usedrestext.value
      resetAnimation(d, 'usedresource 2s ease-out')
      d.innerText = '-60'
    }
    player.unrunnedTimes -= 60000
    player.gameBoost += 60
  }
}
function resetGameBoost() {
  player.unrunnedTimes += player.gameBoost * 1000
  if (usedrestext.value !== null) {
    let d = usedrestext.value
    resetAnimation(d, 'usedanimation 2s ease-out')
    d.innerText = '+' + formater(player.gameBoost)
  }
  player.gameBoost = 0
}
</script>

<template>
  <CenterDiv>
    <p>
      <MultiTextTag tag="youhave" />
      <span style="position: relative" class="number"
        >&nbsp;{{ formater(player.unrunnedTimes / 1e3) }}
        <span ref="usedrestext" class="usedresource" style="animation: none">-60</span> </span
      ><MultiTextTag tag="secondsof" />
      <MultiTextTag tag="offlinedtime" />
    </p>
    <button @click="useOffline">Use 60 seconds of offlined times for a 1 min x2 boost</button>
    <button @click="temp.simulatingTime = true">Simulate rest times</button>
    <button @click="temp.simulatingTime = false">Stop simulate</button>
    <p @dblclick="resetGameBoost">Game is boosting in {{ formater(player.gameBoost) }} seconds</p>
  </CenterDiv>
</template>
