<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <div style="padding: 8px 4px">
    <rb-slider v-model="value" :min="0" :max="100" active-color="#3c9cff" />
    <div style="margin-top: 8px; color: #909399; font-size: 13px">当前值：{{ value }}</div>
  </div>
</template>
