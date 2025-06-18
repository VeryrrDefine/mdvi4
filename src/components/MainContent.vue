<script setup lang="ts">
import { tabs } from '../core/tab/Tabs.ts'
import { player } from '../core/saves/index.ts'

function curTab() {
  return tabs.tabs[player.tab.curTab[0]].subtabs[player.tab.curTab[1]].component
}
</script>

<template>
  <component :is="curTab()" />
</template>
