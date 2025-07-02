<script setup lang="ts">
import {
  enterChallenge,
  exitChallenge,
  inChallenge,
  type singleChallenge,
  countChallenge,
} from '@/core/challenges'
import { defineProps } from 'vue'
import fnchoice from '@/lib/fnchoice'
const props = defineProps<{
  chal: singleChallenge
}>()

function handleChallengeButton() {
  if (inChallenge(props.chal.id, props.chal.layer)) exitChallenge(props.chal.id, props.chal.layer)
  else enterChallenge(props.chal.id, props.chal.layer)
}
function curClass() {
  if (inChallenge(props.chal.id, props.chal.layer)) return 'actived'
  if (countChallenge(props.chal.id, props.chal.layer).gt(0)) return 'completed'
  return ''
}
</script>

<template>
  <div :class="curClass()">
    <h4>{{ props.chal.title ?? `Challenge ${props.chal.layer}-${props.chal.id}` }}</h4>
    <p v-html="fnchoice(props.chal.description, '???')"></p>
    <p class="goal">目标：{{ fnchoice(props.chal.goal, '???') }}</p>
    <p class="reward">奖励：{{ fnchoice(props.chal.reward, '???') }}</p>
    <p><button @click="handleChallengeButton">Enter challenges</button></p>
  </div>
</template>

<style scoped>
.goal {
  color: #ffff00;
}

.reward {
  color: #0f0;
}
.completed {
  background-color: #030;
}
.actived {
  background-color: #330000;
}
div {
  margin: auto 20px;
  border: 2px solid #888;
  border-radius: 10px;
  text-align: center;
}
</style>
