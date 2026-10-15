<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const tabs = [{ name: '标签一' }, { name: '标签二' }, { name: '标签三' }]
</script>

<template>
<rb-tabs v-model="current" :list="tabs" />
</template>
