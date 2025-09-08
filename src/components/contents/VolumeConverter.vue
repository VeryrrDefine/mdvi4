<script setup lang="ts">
import { FourD } from '@/core/4d';
import {player} from '@/core/saves'
import formater from '@/lib/formater.ts'
import { infinityTime } from '@/core/4d/infinity-generator';
</script>

<template>
  <div class="text-center div-center">
    <p  style="color: grey;">欢迎来到第四维度，点击下面的按钮运行获得以mm,mm<sup>2</sup>,...为单位的维度大小。</p>
    <p style="color: grey;">
      随着点数的维度提升，我们将获取对应的大小体积。<br>
    </p>
    <p><button v-if="!player.plot.dimens_amount_getting_started" @click="player.plot.dimens_amount_getting_started=true">激活维度大小获取</button></p>
    基于线数，你有{{ formater(player.fd.d1) }} mm<sup>1</sup> (+{{formater(FourD.resGain('1d'))}}/s)<br />
    基于面数，你有{{ formater(player.fd.d2) }} mm<sup>2</sup> (+{{formater(FourD.resGain('2d'))}}/s)<br />
    基于体数，你有{{ formater(player.fd.d3) }} mm<sup>3</sup> (+{{formater(FourD.resGain('3d'))}}/s)<br />
    基于mm<sup>1</sup>,mm<sup>2</sup>,mm<sup>3</sup>，你有{{ formater(player.fd.d4) }} mm<sup>4</sup> (+{{formater(FourD.resGain('4d'))}}/s)<br />
    你当前有 0 Infinity-Base，增加mm<sup>3</sup>获取<br />
    {{ formater(infinityTime()) }}
  </div>
</template>
