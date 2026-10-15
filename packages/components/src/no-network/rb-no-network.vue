<script setup lang="ts">
import { bem, normalizeStyle } from '../composables/useBem'
import RbButton from '../button/rb-button.vue'

defineOptions({ name: 'RbNoNetwork' })

const props = withDefaults(
  defineProps<{
    text?: string
    buttonText?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '网络连接失败',
    buttonText: '重试',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <view
    class="rb-no-network"
    :class="[bem('rb-no-network'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <text class="rb-no-network__icon">📶</text>
    <text class="rb-no-network__text">
      <slot>{{ text }}</slot>
    </text>
    <rb-button type="primary" size="small" :text="buttonText" @click="emit('retry')" />
  </view>
</template>
