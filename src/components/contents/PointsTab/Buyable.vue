<script setup lang="ts">
import formater from '@/lib/formater';
import { buyables } from '@/core/buyables';
import { player } from '@/core/saves';
interface Props{
  buyable: keyof typeof buyables
}
const props = defineProps<Props>()
const buyable = props.buyable
</script>

<template>
  <div class="div-center text-center buyable-box">
    <div>{{buyables[buyable].name}} ({{ formater(player.buyables[buyable],0) }})</div>
    <div>{{ buyables[buyable].desc.replace('%s', formater(buyables[buyable].effect())) }}</div>
      <div><button :disabled='!buyables[buyable].canAfford()'
          @click="buyables[buyable].buy">购买：花费 {{ formater(buyables[buyable].cost(), 0)}} 点数</button></div>
  </div>

</template>
