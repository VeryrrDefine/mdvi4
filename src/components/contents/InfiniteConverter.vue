<script setup lang="ts">
import { preInfinityBase } from '@/core/4d/infinity-generator';
import { player } from '@/core/saves';
import formater from '@/lib/formater';

</script>

<template>
  <div class="text-center div-center">
    <p style="text-align: center;color: grey;">
      发散的力量是无穷的。<br>
    </p>
    你当前有 {{formater(player.plot.terminal_found ? preInfinityBase(player.fd.inf_gen_t) : 0)}}（+{{formater(preInfinityBase(player.fd.inf_gen_t).pow(1.15).div(100))}}/s） Preinfinity-Base（PB），每秒增长为PB<sup>1.15</sup>/100<br />
    你当前有 {{ formater(player.fd.inf_bases) }} Infinity-Base，增加mm<sup>4</sup>获取与PB初始量<br />
  </div>
</template>
