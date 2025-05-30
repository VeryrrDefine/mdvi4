<script setup lang="ts">
import Header1 from './components/HeaderTab1.vue'
import Header2 from './components/HeaderTab2.vue'
import MainContent from './components/MainContent.vue'
</script>

<template>
  <header>
    <Header1 />
    <Header2 />
    <!-- HEADER1 HEADER2 NEWSTICKER-->
  </header>
  <main>
    <MainContent />
  </main>
</template>

<style scoped>
header {
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
