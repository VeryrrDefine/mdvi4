<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';

// this component is test only

const mainCanvas = ref<HTMLCanvasElement|null>(null)
let intervalId = 114514;
let ctx: CanvasRenderingContext2D|null;
function canvasDisplay() {
  if (mainCanvas.value !== null) {
    if (!ctx)
      ctx = mainCanvas.value.getContext("2d");
    if (ctx) {
      ctx.font = "MonospaceTypewriter 12px;";
      ctx.fillStyle = "#000011";
      ctx.fillRect(0,0,300,300);
    }
  }
}
onMounted(() => {
  intervalId = setInterval(canvasDisplay,100)
})
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div>
    <canvas ref="mainCanvas" width="300" height="300"></canvas>
  </div>
  <!-- code... -->
</template>

<style scoped>
canvas {
  width: 300px;
  height: 300px;
  touch-action: none;
}
</style>
