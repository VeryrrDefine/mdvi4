<script setup lang="ts">
import formater from '@/lib/formater'
import { linePointsGain, lineReset, nextLineGain, linePointEffect, upgrades } from '@/core/linepoint'
import { player } from '@/core/saves'
import Upgrade from '@/components/Upgrade.vue'
import CenterDiv from '@/components/ui/CenterDiv.vue'
</script>

<template>
  <div style="margin-top: 20px; margin-bottom: 100px">
    <CenterDiv>
      <p>你有 {{ formater(player.linePoints) }} 线数</p>
      <button class="resetbutton" :disabled="!player.points.gte(100000)" @click="lineReset">
        重置点数, Autoclickers and accelerators, 获得 {{ formater(linePointsGain()) }} 线数
        <br />
        下一个在 {{ formater(nextLineGain()) }} <br /><br />需要 {{ formater(100000) }} 点数
      </button>
      <p>你的线数使自动获取的点数乘以 {{ formater(linePointEffect()) }}</p>
    </CenterDiv>

    <div>
      <Upgrade :upgrade="upgrades[0]" currency="line points" />
      <Upgrade :upgrade="upgrades[1]" currency="line points" />
      <Upgrade :upgrade="upgrades[2]" currency="line points" />
      <Upgrade :upgrade="upgrades[3]" currency="line points" />
      <Upgrade :upgrade="upgrades[4]" currency="line points" />
      <Upgrade :upgrade="upgrades[5]" currency="line points" />
    </div>
  </div>
</template>
