<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
</script>

<template>
<rb-pagination v-model:current-page="page" :total="100" background />
</template>
