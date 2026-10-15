<script setup lang="ts">
import { ref } from 'vue'
const fileList = ref([])
</script>

<template>
<rb-upload v-model:file-list="fileList" :auto-upload="false" />
</template>
