<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import { showToast } from '../toast/toast'

defineOptions({ name: 'RbColor' })

const props = withDefaults(
  defineProps<{
    /** 色值，如 #3c9cff */
    color?: string
    /** 展示名称 */
    label?: string
    /** 是否显示色值文字 */
    showValue?: boolean
    /** 点击复制色值 */
    copyable?: boolean
    /** 色块尺寸 */
    size?: 'small' | 'default' | 'large'
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    color: '#3c9cff',
    label: '',
    showValue: true,
    copyable: true,
    size: 'default',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [color: string]
  copy: [color: string]
}>()

const rootClass = computed(() =>
  bem('rb-color', props.size === 'default' ? undefined : props.size),
)

const swatchStyle = computed(() => ({
  backgroundColor: props.color,
}))

function onClick() {
  emit('click', props.color)
  if (!props.copyable) return

  // #ifdef H5
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(props.color).then(() => {
      showToast({ message: `已复制 ${props.color}`, type: 'success', duration: 1500 })
      emit('copy', props.color)
    })
    return
  }
  // #endif

  uni.setClipboardData({
    data: props.color,
    success: () => {
      showToast({ message: `已复制 ${props.color}`, type: 'success', duration: 1500 })
      emit('copy', props.color)
    },
  })
}
</script>

<template>
  <view
    class="rb-color"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click="onClick"
  >
    <view class="rb-color__swatch" :style="swatchStyle" />
    <view class="rb-color__meta">
      <text v-if="label" class="rb-color__label">{{ label }}</text>
      <text v-if="showValue" class="rb-color__value">{{ color }}</text>
    </view>
  </view>
</template>
