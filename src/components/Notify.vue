<script setup lang="ts">
// code...
</script>

<template>
  <div class="notify">
    <!-- <div class="notify-content-box">
      Notify Content
    </div> -->
  </div>
</template>

<style scoped>
.notify {
  position: fixed;
  top: 5px;
  left: 5px;
  z-index: 9998;
}
.notify-content-box {
  height: 30px;
  max-width: 250px;
  font-size: 12px;
  color: #eeeeee;
  background-color: #00dddd80;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;

  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
}
</style>
