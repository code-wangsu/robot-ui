<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
<rb-textarea v-model="value" placeholder="请输入" />
</template>
