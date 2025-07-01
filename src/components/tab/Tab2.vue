<template>
  <div :class="device">
    {{ props.content }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['content'])
import { device } from '@/core/game-loops'
</script>

<style scoped lang="scss">
div {
  border: #339 1px solid;
}
.computer {
  padding: 5px;
  margin: 6px;
}
.mobile {
  height: calc(100% - 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
</style>
