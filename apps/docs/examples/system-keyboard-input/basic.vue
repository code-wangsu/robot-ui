<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
<rb-system-keyboard-input v-model="value" placeholder="系统键盘输入" />
</template>
