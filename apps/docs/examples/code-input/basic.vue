<script setup lang="ts">
import { ref } from 'vue'
const code = ref('')
</script>

<template>
<rb-code-input v-model="code" :maxlength="6" />
</template>
