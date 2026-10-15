<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
</script>

<template>
<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="标题" value="右侧" label="说明">折叠内容</rb-collapse-item>
</rb-collapse>
</template>
