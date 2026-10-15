<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
</script>

<template>
<rb-radio v-model="value" name="1" label="选项一" />
<rb-radio v-model="value" name="2" label="选项二" />
</template>
