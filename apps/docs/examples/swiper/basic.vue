<script setup lang="ts">
const images = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]
</script>

<template>
<rb-swiper :list="images" height="180" />
</template>
