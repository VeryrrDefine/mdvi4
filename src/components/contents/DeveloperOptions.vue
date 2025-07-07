<script setup lang="ts">
import Expand from '../ui/Expand.vue'
import news from '@/news'
// code...
</script>

<template>
  <div>
    <button>simulate time for 1000 seconds</button>
    <Expand :expandid="0"></Expand>
    <template v-for="newsOne in news"> <span v-html="newsOne.text"></span><br /> </template>
  </div>
</template>

<style scoped>
/* code... */
</style>
