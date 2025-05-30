<template>
  <div>
    {{ props.content }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['content'])
</script>

<style scoped>
div {
  width: calc(33% - 0.5px);
  height: calc(100% - 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  border: #33f 1px solid;
}
</style>
