<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const columns = [
  [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ],
]
</script>

<template>
  <rb-button text="打开选择器" type="primary" @click="show = true" />
  <rb-picker v-model:show="show" :columns="columns" />
</template>
