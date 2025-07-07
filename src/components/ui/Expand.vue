<script lang="ts" setup>
import { defineProps } from 'vue'
import { temp } from '@/core/temp'
import { hasFlag, setFlag } from '@/utils/bitflag'

const props = defineProps<{
  expandid: number
}>()

function toggleFlag() {
  temp.expands = setFlag(
    props.expandid,
    temp.expands,
    hasFlag(props.expandid, temp.expands) ? 0 : 1,
  )
}
</script>

<template>
  <div>
    <button class="button" @click="toggleFlag">
      {{ hasFlag(props.expandid, temp.expands) ? '-' : '+' }}</button
    >Expandable
    <div>
      <slot v-if="hasFlag(props.expandid, temp.expands)"></slot>
    </div>
  </div>
</template>

<style scoped>
.button {
  border-radius: 0px;
  padding: 0;
  width: 1rem;
  height: 1rem;
}
</style>
