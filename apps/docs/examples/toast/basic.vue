<script setup lang="ts">
import { showToast } from '../../../../packages/components/src/toast/toast'

function open() {
  showToast({ title: '成功', message: '操作完成', type: 'success' })
}
</script>

<template>
<rb-button type="primary" text="打开 Toast" @click="open" />
<rb-toast />
</template>
