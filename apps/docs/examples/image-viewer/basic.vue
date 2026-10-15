<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const list = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]
</script>

<template>
<rb-button text="预览图片" type="primary" @click="show = true" />
<rb-image-viewer v-model:show="show" :url-list="list" />
</template>
