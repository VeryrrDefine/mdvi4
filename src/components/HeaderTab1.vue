<script setup lang="ts">
import Tab from './tab/Tab.vue'
import format from '../lib/formater.ts'
import { player } from '../core/saves'
import { tabs, changeTab } from '../core/tab/Tabs'
import { setChangePoint } from '../core/dev.ts'
import { device } from '@/core/game-loops/index.ts'
</script>

<template>
  <div>
    <div class="tab-comp" v-if="device == 'mobile'">
      <div class="tab-1">
        <Tab
          v-for="tab in tabs.tabs"
          :content="tab.text"
          :key="tab.id"
          @click="changeTab(player.tab, tab.id)"
        />
      </div>
      <div
        class="tab-2"
        :class="player.points.gte('ee9') ? 'pts-size-small' : 'pts-size-big'"
        @dblclick="setChangePoint()"
      >
        {{ format(player.points, 0) }}
      </div>
    </div>
    <div v-if='device == "computer"' class="text-center">
      <p>你有 {{format(player.points,0)}} 点数</p>
      <div>
        <Tab
          style="display: inline-block"
          v-for="tab in tabs.tabs"
          :content="tab.text"
          :key="tab.id"
          @click="changeTab(player.tab, tab.id)"
        />
      </div>
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
  border: #33c 3px solid;
}

.pts-size-big {
  font-size: 18px;
}
.pts-size-small {
  font-size: 12px;
}
</style>
