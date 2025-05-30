<template>
  <div>
    {{ props.content }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['content'])
</script>

<style scoped lang="scss">
div {
  height: calc(100% - 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  border: #339 1px solid;
}
</style>
