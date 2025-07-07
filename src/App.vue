<script setup lang="ts">
import Header1 from './components/HeaderTab1.vue'
import Header2 from './components/HeaderTab2.vue'
import MainContent from './components/MainContent.vue'
import NewsTicker from './components/NewsTicker.vue'
import Notify from './components/Notify.vue'

import { device } from './core/game-loops'
</script>

<template>
  <Notify />
  <header :class="device">
    <Header1 />
    <Header2 />
    <NewsTicker />
  </header>
  <main>
    <MainContent />
  </main>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #003;
}
header.mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2.5cm;
}
main {
  border-left: 6px;
  border-right: 6px;
  border-bottom: 0;
  border-color: #33c;
  border-style: solid;
}
</style>
