<script setup lang="ts">
import { provide, ref } from 'vue'

defineOptions({ name: 'RbSwipeAction' })

const props = withDefaults(
  defineProps<{
    autoClose?: boolean
  }>(),
  {
    autoClose: true,
  },
)

const activeName = ref<string | number>('')

provide('rbSwipeAction', {
  activeName,
  autoClose: props.autoClose,
  open: (name: string | number) => {
    activeName.value = name
  },
  close: () => {
    activeName.value = ''
  },
})
</script>

<template>
  <view class="rb-swipe-action">
    <slot />
  </view>
</template>
