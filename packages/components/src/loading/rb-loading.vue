<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import RbLoadingIcon from '../loading-icon/rb-loading-icon.vue'

defineOptions({ name: 'RbLoading' })

const props = withDefaults(
  defineProps<{
    /** 为 false 时不渲染（页级加载常用） */
    loading?: boolean
    text?: string
    vertical?: boolean
    size?: string | number
    color?: string
    mode?: 'circle' | 'spinner'
    /** 全屏遮罩；false 为内联加载 */
    fullscreen?: boolean
    /** fullscreen 下相对父级定位（文档预览用） */
    absolute?: boolean
    bgColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    loading: true,
    text: '',
    vertical: true,
    size: 40,
    color: '',
    mode: 'circle',
    fullscreen: false,
    absolute: false,
    bgColor: 'rgba(255,255,255,0.9)',
    customStyle: '',
    customClass: '',
  },
)

const rootClass = computed(() =>
  [
    bem(
      'rb-loading',
      props.fullscreen && 'fullscreen',
      props.fullscreen && props.absolute && 'absolute',
      !props.vertical && 'horizontal',
    ),
    props.customClass,
  ]
    .filter(Boolean)
    .join(' '),
)

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.fullscreen) {
    style.backgroundColor = props.bgColor
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view v-if="loading" class="rb-loading" :class="rootClass" :style="rootStyle">
    <rb-loading-icon :mode="mode" :size="size" :color="color" />
    <text v-if="text" class="rb-loading__text">{{ text }}</text>
    <slot />
  </view>
</template>
