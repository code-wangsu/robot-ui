<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
function onRefresh() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 800)
}
</script>

<template>
<rb-pull-refresh :refreshing="loading" @refresh="onRefresh">
  <view style="padding:16px">下拉刷新演示</view>
</rb-pull-refresh>
</template>
