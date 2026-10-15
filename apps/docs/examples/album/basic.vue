<script setup lang="ts">
const urls = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/3.jpg',
]
</script>

<template>
<rb-album :urls="urls" />
</template>
