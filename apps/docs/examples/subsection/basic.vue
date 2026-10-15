<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const list = ['待处理', '进行中', '已完成']
</script>

<template>
<rb-subsection v-model="current" :list="list" />
</template>
