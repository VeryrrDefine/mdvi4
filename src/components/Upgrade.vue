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
  <div style="display: inline-table;">
    <div class="upgrade" :disabled="!upgrade.canBuy() || upgrade.status" @click="upgrade.buy">
      <p v-html="upgrade.description()"></p>
      <p style="color: green" v-html="upgrade.effectDesc(upgrade.effect())"></p>
      <p v-if="upgrade.status" style="color: #0f0">已购买</p>
      <p v-else>需要 {{ format(upgrade.cost()) }} {{ prop.currency }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upgrade {
  padding: 5px;
  width: 200px;
  height: 200px;
  text-align: center;
  border:2px solid #0000ff;
  &:hover{
    cursor: pointer;
  }
  &:disabled{
    background: #000011;
    cursor: not-allowed;
  }
}
</style>
