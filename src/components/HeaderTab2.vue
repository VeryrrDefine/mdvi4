<script setup lang="ts">
import SubTab from './tab/Tab2.vue'
import { player } from '../core/saves/'
import { tabs, changeSubtab } from '../core/tab/Tabs.ts'
import fnchoice from '@/lib/fnchoice.ts'
function curTab() {
  return tabs.tabs[player.tab.curTab[0]]
}
import { device } from '@/core/game-loops/index.ts'
</script>

<template>
  <div class="tab-comp" :class="device">
    <div class="tab-1" :class="device">
      <template v-for="tab in curTab().subtabs" :key="tab.id">
        <SubTab
          :style="{ display: device == 'computer' ? 'inline-block' : 'block' }"
          :content="tab.text"
          v-if="fnchoice(tab.unlocked, true)"
          @click="changeSubtab(player.tab, tab.id, curTab().id)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.tab-comp.mobile {
  display: flex;
  height: 100%;
  border: #33c 3px solid;
}
.tab-1.mobile {
  width: 100%;
  height: 100%;
  border: #33c 3px solid;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
.tab-1.computer {
  text-align: center;
}
</style>
