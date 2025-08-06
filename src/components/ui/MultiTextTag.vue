<script setup lang="ts">
import { texts } from '@/multi-language'

const props = defineProps<{
  tag: keyof typeof texts.zh
}>()

const text = texts.zh[props.tag]
</script>

<template>
  {{ text }}
</template>
