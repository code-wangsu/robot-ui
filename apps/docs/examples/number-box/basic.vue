<script setup lang="ts">
import { ref } from 'vue'
const count = ref(1)
</script>

<template>
<rb-number-box v-model="count" :min="1" :max="99" />
</template>
