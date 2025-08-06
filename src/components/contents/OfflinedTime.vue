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
    <p style="text-align: center;color: grey;">
      因为一些事情而耽误的时间，我们希望可以重新利用。<br>
    </p>
    <p>
      <MultiTextTag tag="youhave" />
      <span style="position: relative" class="number"
        >&nbsp;{{ formater(player.unrunnedTimes / 1e3) }}
        <span ref="usedrestext" class="usedresource" style="animation: none">-60</span> </span
      ><MultiTextTag tag="secondsof" />
      <MultiTextTag tag="offlinedtime" />
    </p>
    <button @click="useOffline">使用60秒的时间，获得60秒加速。</button>
    <button @click="temp.simulatingTime = true">Simulate rest times</button>
    <button @click="temp.simulatingTime = false">Stop simulate</button>
    <p @dblclick="resetGameBoost">Game is boosting in {{ formater(player.gameBoost) }} seconds</p>
  </CenterDiv>
</template>
