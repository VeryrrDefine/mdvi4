<script lang="ts" setup>
import formater from '@/lib/formater'
import { player } from '@/core/saves'
import MultiTextTag from '@/components/ui/MultiTextTag.vue'
import {
  getNextPanelPointGain,
  ppUpgrades,
  getPanelPointGain,
  panelPointReset,
} from '@/core/panelpoints'
import CenterDiv from '@/components/ui/CenterDiv.vue'
import Challenges from './Challenges.vue'
import Expand from '@/components/ui/Expand.vue'
import { countChallenge } from '@/core/challenges'
import Upgrade from '@/components/Upgrade.vue'
</script>
<template>
  <div style="margin-top: 20px; margin-bottom: 100px">
    <CenterDiv>
      <MultiTextTag tag="youhave" /> {{ formater(player.panelPoints) }} panel points.
      <button
        class="resetbutton"
        :disabled="!player.points.gte(10000000000)"
        @click="panelPointReset"
      >
        重置zhiqiandeneirong, 获得 {{ formater(getPanelPointGain()) }} pingmiandian数
        <br />
        下一个在 {{ formater(getNextPanelPointGain()) }} <br /><br />需要
        {{ formater(10000000000) }} 点数
      </button>
    </CenterDiv>
    <CenterDiv>
      <p>
        <MultiTextTag tag="youhave" />
        <span class="restext"> {{ formater(player.panelPointPower) }} </span>
        <MultiTextTag tag="panelpointpower" />(+/s),
      </p>
      <MultiTextTag tag="whichgivesyou" />
      <span class="restext">{{ formater(player.panelPointPower) }}</span> line points per second
    </CenterDiv>
    <CenterDiv v-if="player.panelPoints.lt(2)"> Get 2 panel points to unlock next part </CenterDiv>
    <Expand v-else :expandid="0">
      <Challenges />
    </Expand>

    <Expand v-if="countChallenge(3).gte(1e5)" :expandid="1">
      <Upgrade :upgrade="ppUpgrades[0]" currency="panel points" />
    </Expand>
    <!--
    <CenterDiv>
      <MultiTextTag tag="youhave" />
      {{formater(NaN)}}
      <MultiTextTag tag="panelpointpower " />, <MultiTextTag tag="whichgivesyou" />
    </CenterDiv>-->
  </div>
</template>

<style scoped>
/* code... */
</style>
