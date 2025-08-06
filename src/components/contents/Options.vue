<script lang="ts" setup>
import { requestedHardReset, export_file, import_file } from '@/core/saves'
import { loadFromGalaxy } from '@/core/saves/galaxy-cloud-save'
import DeveloperOptions from './DeveloperOptions.vue'
function loadFromGalaxyTest() {
  loadFromGalaxy(0)
}
const dev = import.meta.env.DEV
</script>

<template>
  <div class="div-center text-center">
    <button @click="requestedHardReset">硬重置</button>
    <button @click="export_file">导出至文件</button>
    <button @click="import_file">从文件导入</button>
    <br />
    <DeveloperOptions v-if="dev" />
  </div>
</template>
