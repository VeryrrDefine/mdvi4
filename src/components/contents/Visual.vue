<script lang="ts" setup>
import { formaterNameMap, formaters } from '@/lib/formater'
import { player } from '@/core/saves'
function displayName(val: formaters) {
  return formaterNameMap.get(val)
}
</script>

<template>
  <div>
    <div>
      <label for="enum-select">选择记数法:</label>
      <select name="formaters" id="enum-select" v-model="player.visualSettings.curFormater">
        <template v-for="(value, key) in formaters" :key="key">
          <option v-if="formaterNameMap.has(value)" :value="value">
            {{ displayName(value) }}
          </option>
        </template>
      </select>
    </div>
  </div>
</template>
