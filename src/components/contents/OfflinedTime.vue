<script setup lang="ts">
import formater from '@/lib/formater';
import CenterDiv from '../ui/CenterDiv.vue';
import MultiTextTag from '../ui/MultiTextTag.vue';
import { player } from '@/core/saves';
</script>

<template>
  <CenterDiv>
    <p>
      <MultiTextTag tag="youhave" />
      {{ formater(player.unrunnedTimes/1e3) }}
      <MultiTextTag tag="secondsof" />
      <MultiTextTag tag="offlinedtime"/>
    </p>
    <button>Use 60 seconds of offlined times for a 1 min x2 boost</button>
  </CenterDiv>
</template>
