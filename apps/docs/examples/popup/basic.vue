<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="打开弹层" type="primary" @click="show = true" />
<rb-popup v-model:show="show" mode="center" :round="16">
  <view style="padding:24px;min-width:200px;text-align:center">弹层内容</view>
</rb-popup>
</template>
