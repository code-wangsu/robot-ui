<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['电力中断', '现场操作异常', '其他异常'])
const options = [
  '设备故障',
  '系统宕机',
  '网络中断',
  '电力中断',
  '现场操作异常',
  '其他异常',
]
</script>

<template>
<rb-multi-select
  v-model="value"
  title="选择异常类型"
  placeholder="请选择异常类型"
  :options="options"
  :max-collapse-count="2"
/>
</template>
