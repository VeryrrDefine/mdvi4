<template>
  <div :class="device">
    {{ props.content }}
  </div>
</template>

<script lang="ts" setup>
import { device } from '@/core/game-loops'
const props = defineProps(['content'])
</script>

<style scoped lang="scss">
div {
  border: #33f 1px solid;
  &:hover {
    cursor: pointer;
  }
}
.computer {
  padding: 5px;
  margin: 6px;
}
.mobile {
  width: calc(33% - 0.5px);
  height: calc(100% - 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
</style>
