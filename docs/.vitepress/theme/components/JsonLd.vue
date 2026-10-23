<template>
  <!-- JSON-LD 注入由 Vue 渲染 -->
  <component :is="'script'" type="application/ld+json" v-html="jsonString"></component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  }
})

const jsonString = computed(() => {
  return JSON.stringify(props.schema)
})
</script>
