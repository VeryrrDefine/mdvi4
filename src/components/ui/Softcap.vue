<template>
  <span>
    <slot></slot>
    <span v-if="softcapped(props.value, props.capid)" class="softcap">(softcapped)</span>
  </span>
</template>

<script setup lang="ts">
import { softcapped } from '@/core/softcaps'
import type PowiainaNum from 'powiaina_num.js'
const props = defineProps<{
  capid: number
  value: PowiainaNum
}>()
</script>
