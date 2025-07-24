<script lang="ts" setup>
import { addPoints, getPointsCap, getPointsGainPS } from '@/core/game'
import formater from '@/lib/formater'
import Buyable from './Buyable.vue'
import { upDim } from '@/core/updim'
import { updimNeed } from '@/core/updim'
import { player } from '@/core/saves'
import { temp } from '@/core/temp'
import MultiTextTag from '@/components/ui/MultiTextTag.vue'
import CenterDiv from '@/components/ui/CenterDiv.vue'
import { countChallenge } from '@/core/challenges'
</script>

<template>
  <div style="margin-top: 20px; margin-bottom: 100px">
    <CenterDiv>
      <button @click="addPoints" class="asprad">
        获得1<span v-if="countChallenge(2).gte(1e14)">+{{ formater(getPointsGainPS()) }}</span
        >点数
      </button>
    </CenterDiv>
    <p class="text-center" v-if="player.plot.at_max_hardcap">
      <MultiTextTag tag="gamehasaalgomakepointscouldntreach" /> {{ formater(getPointsCap(), 0) }}
    </p>
    <p class="text-center"><MultiTextTag tag="curdimension" />{{ player.curDimension }}</p>
    <Buyable buyable="autoclickers" />
    <Buyable buyable="accelerators" />
    <div class="div-center text-center" style="margin-top: 10px">
      <button class="resetbutton" @click="upDim">
        Up your dimension.<br /><br />Require
        {{ formater(updimNeed[player.curDimension], 0) }}
        points
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
