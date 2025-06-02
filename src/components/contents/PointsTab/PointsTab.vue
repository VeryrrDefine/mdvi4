<script lang="ts" setup>
import { addPoints, getPointsCap } from '@/core/game';
import formater from '@/lib/formater';
import Buyable from './Buyable.vue';
import {upDim} from '@/core/updim';
import { updimNeed } from '@/core/updim';
import { player } from '@/core/saves';
</script>

<template>
  <div style="margin-top: 20px; margin-bottom: 100px;;">
    <div class="div-center text-center">
      <button @click='addPoints' class="asprad">获得1点数</button>
    </div>
    <p class='text-center'>请注意， 你当前的点数被限制在 {{ formater(getPointsCap(),0) }} 以内</p>
    <Buyable buyable='autoclickers' />
    <Buyable buyable='accelerators' />
    <div class="div-center text-center" style="margin-top: 10px;">
      <button class="resetbutton" @click='upDim'>Up your dimension.<br/><br/>Require
        {{formater(updimNeed[player.curDimension],0)}}
        points</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.asprad{
  aspect-ratio: 1/1;
}
</style>
