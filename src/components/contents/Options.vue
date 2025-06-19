<script lang="ts" setup>
import { requestedHardReset, export_file, import_file } from '@/core/saves'
import {loadFromGalaxy} from '@/core/saves/galaxy-cloud-save';
function loadFromGalaxyTest(){
  loadFromGalaxy(0)
}
</script>

<template>
  <div>
    <button @click="requestedHardReset">硬重置</button>
    <button @click="export_file">导出至文件</button>
    <button @click="import_file">从文件导入</button>
    <br>
  </div>
</template>
