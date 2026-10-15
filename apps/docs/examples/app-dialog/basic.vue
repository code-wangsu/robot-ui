<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="打开业务弹窗" type="primary" @click="show = true" />
<rb-app-dialog v-model="show" title="业务弹窗">
  <view style="padding:12px 0">弹窗内容</view>
  <template #footer>
    <rb-button size="small" text="取消" @click="show = false" />
    <rb-button size="small" type="primary" text="确定" @click="show = false" />
  </template>
</rb-app-dialog>
</template>
