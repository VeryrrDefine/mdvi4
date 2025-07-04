<script setup lang="ts">
import { ppChals } from '@/core/panelpoints'
import ChallengeSingle from './ChallengeSingle.vue'

// code...
</script>

<template>
  <div>
    <ChallengeSingle :chal="ppChals[0]" />
    <ChallengeSingle :chal="ppChals[1]" />
    <ChallengeSingle :chal="ppChals[2]" />
  </div>
</template>

<style scoped>
/* code... */
</style>
