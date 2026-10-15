<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
</script>

<template>
<rb-radio-group v-model="value">
  <rb-radio name="1" label="A" />
  <rb-radio name="2" label="B" />
</rb-radio-group>
</template>
