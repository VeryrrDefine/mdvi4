<script setup lang="ts">
import {texts} from '@/multi-language';

  const props = defineProps<{
    tag: (keyof typeof texts.en) | (keyof typeof texts.zh)
  }>()

  const text = texts.en[props.tag]
</script>

<template>
  {{ text }}
</template>
