<script setup lang="ts">
import Tab from './tab/Tab.vue'
import format from '../lib/formater.ts'
import { player } from '../core/saves'
import { tabs, changeTab } from '../core/tab/Tabs'
import { setChangePoint } from '../core/dev.ts'

</script>

<template>
  <div class="tab-comp">
    <div class="tab-1">
      <Tab v-for="tab in tabs.tabs" :content="tab.text" :key='tab.id' @click="changeTab(player.tab, tab.id)"
      />
    </div>
    <div class="tab-2" @dblclick='setChangePoint()' >
      {{ format(player.points,0) }}
    </div>
  </div>
</template>

<style scoped>
.tab-comp {
  display: flex;
  height: 100%;
  border: #33c 3px solid;
}
.tab-1 {
  width: 67%;
  height: 100%;
  border: #33c 3px solid;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.tab-2 {
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  font-size: 18px;
  border: #33c 3px solid;
}
</style>
