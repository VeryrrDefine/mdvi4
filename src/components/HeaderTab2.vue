<script setup lang="ts">
import SubTab from './tab/Tab2.vue'
import { player } from '../core/saves/'
import { tabs, changeSubtab } from '../core/tab/Tabs.ts'
function curTab(){
  return tabs.tabs[player.tab.curTab[0]]
}
</script>

<template>
  <div class="tab-comp">
    <div class="tab-1">
      <SubTab v-for="tab in curTab().subtabs" :content="tab.text" :key='tab.id' @click="changeSubtab(player.tab, tab.id, curTab().id)"/>
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
  width: 100%;
  height: 100%;
  border: #33c 3px solid;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
</style>
