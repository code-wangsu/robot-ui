<script setup lang="ts">
const list = [
  'https://picsum.photos/seed/robot-ui-1/320/240',
  'https://picsum.photos/seed/robot-ui-2/320/240',
]
</script>

<template>
  <rb-image
    :src="list[0]"
    :preview-src-list="list"
    fit="cover"
    width="200"
    height="140"
    radius="8"
  />
</template>
