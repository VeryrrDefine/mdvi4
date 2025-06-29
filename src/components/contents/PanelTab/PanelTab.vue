<script lang="ts" setup>
import formater from '@/lib/formater';
import { player } from '@/core/saves';
import MultiTextTag from '@/components/ui/MultiTextTag.vue';
import {getNextPanelPointGain, getPanelPointGain, panelPointReset} from '@/core/panelpoints';
import CenterDiv from '@/components/ui/CenterDiv.vue';

</script>

<template>
  <div style="margin-top: 20px; margin-bottom: 100px">
    <CenterDiv>
      <MultiTextTag tag="youhave" /> {{ formater(player.panelPoints) }} panel points.
      <button class="resetbutton" :disabled="!player.points.gte(10000000000)" @click="panelPointReset">
        重置zhiqiandeneirong, 获得 {{ formater(getPanelPointGain()) }} pingmiandian数
        <br />
        下一个在 {{ formater(getNextPanelPointGain()) }} <br /><br />需要 {{ formater(10000000000) }} 点数
      </button>
    </CenterDiv>
    <CenterDiv>

      <p><MultiTextTag tag="youhave" />
      <span class="restext"> {{formater(player.panelPointPower)}} </span>
      <MultiTextTag tag="panelpointpower" />(+/s),</p>
      <MultiTextTag tag="whichgivesyou" /> <span class="restext">{{ formater (player.panelPointPower)}}</span> line points per second
    </CenterDiv>
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
