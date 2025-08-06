<script setup lang="ts">
import Tab from './tab/Tab.vue'
import format from '../lib/formater.ts'
import { player } from '../core/saves'
import { tabs, changeTab } from '../core/tab/Tabs'
import { setChangePoint } from '../core/dev.ts'
import { device } from '@/core/game-loops/index.ts'
import MultiTextTag from './ui/MultiTextTag.vue'
import { onMounted, watch, ref } from 'vue'
import type PowiainaNum from 'powiaina_num.js'
import { resetAnimation } from '@/utils/resetAnimation.ts'
import { temp } from '@/core/temp.ts'
import { getPointsCap } from '@/core/game.ts'
import fnchoice from '@/lib/fnchoice.ts'
import Resources from './Resources.vue'
const usedrestext = ref<null | HTMLSpanElement>(null)
watch(
  () => player.points,
  function (newValue: PowiainaNum, oldValue: PowiainaNum) {
    if (newValue.lt(oldValue) && usedrestext.value) {
      let d = usedrestext.value
      d.innerText = '-' + format(oldValue.sub(newValue))
      resetAnimation(d, 'usedresource 2s ease-out')
    }
  },
)
</script>

<template>
  <div>
    <div class="tab-comp" v-if="device == 'mobile'">
      <div class="tab-1">
        <template v-for="tab in tabs.tabs"

          :key="tab.id"
          >
          <Tab
          :content="tab.text"
                  v-if="fnchoice(tab.unlocked, true)"
                  @click="changeTab(player.tab, tab.id)"/>
        </template>
      </div>
      <div
        class="tab-2"
        :class="player.points.gte('ee9') ? 'pts-size-small' : 'pts-size-big'"
        @dblclick="setChangePoint()"
      >
        <span style="position: relative"
          >{{ format(player.points)
          }}<span ref="usedrestext" class="usedresource" style="animation: none">-60</span>
        </span>
      </div>
    </div>
    <div v-if="device == 'computer'" class="text-center">
      <p><MultiTextTag tag="youhave" /> <span style="font-size: 300%;">{{format(player.points, 0)}}</span> 点数</p>
      <Resources />
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
