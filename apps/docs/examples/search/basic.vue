<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
</script>

<template>
<rb-search v-model="keyword" placeholder="搜索" />
</template>
