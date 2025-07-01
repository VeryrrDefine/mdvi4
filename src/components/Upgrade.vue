<script setup lang="ts">
import type { Upgrade } from '@/core/upgrade'
import format from '@/lib/formater'
const prop = defineProps<{
  upgrade: Upgrade
  currency: string
}>()
const upgrade = prop.upgrade
</script>

<template>
  <div>
    <button class="upgrade" :disabled="!upgrade.canBuy() || upgrade.status" @click="upgrade.buy">
      <p v-html="upgrade.description()"></p>
      <p style="color: green" v-html="upgrade.effectDesc(upgrade.effect())"></p>
      <p v-if="upgrade.status" style="color: #0f0">Bought!</p>
      <p v-else>需要 {{ format(upgrade.cost()) }} {{ prop.currency }}</p>
    </button>
  </div>
</template>

<style scoped>
.upgrade {
  padding: 5px;
}
</style>
