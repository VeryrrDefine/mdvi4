<script setup lang="ts">
import formater from '@/lib/formater'
import { buyables } from '@/core/buyables'
import { player } from '@/core/saves'
import Softcap from '@/components/ui/Softcap.vue'
interface Props {
  buyable: keyof typeof buyables
}
const props = defineProps<Props>()
const buyable = props.buyable
</script>

<template>
  <div class="div-center text-center buyable-box">
    <div>{{ buyables[buyable].name }} ({{ formater(player.buyables[buyable], 0) }})</div>
    <div>
      {{ buyables[buyable].desc.replace('%s', formater(buyables[buyable].effect()))
      }}

      <template v-if="buyables[buyable].softcapid !== undefined">
        <Softcap
          :capid="buyables[buyable].softcapid ?? 0"
          :value="buyables[buyable].effect()"
        ></Softcap
      ></template>
    </div>
    <div>
      <button :disabled="!buyables[buyable].canAfford()" @click="buyables[buyable].buy">
        购买：花费 {{ formater(buyables[buyable].cost(), 0) }} 点数
      </button>
    </div>
  </div>
</template>
