<script setup lang="ts">
import { computed } from 'vue'
import type { RbType } from '../types'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbLink' })

const props = withDefaults(
  defineProps<{
    text?: string
    /** 页面路径，内部走 uni.navigateTo；外链请自行在 click 处理 */
    href?: string
    type?: RbType | 'default'
    /** 是否显示下划线（对齐 Element Plus underline） */
    underline?: boolean
    disabled?: boolean
    /** 图标文案（简单字符，避免强依赖字体图标） */
    icon?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '',
    href: '',
    type: 'default',
    underline: true,
    disabled: false,
    icon: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const rootClass = computed(() =>
  bem(
    'rb-link',
    props.type,
    props.underline && 'underline',
    props.disabled && 'disabled',
  ),
)

function onClick(event: Event) {
  if (props.disabled) return
  emit('click', event)
  if (!props.href) return
  if (/^https?:\/\//.test(props.href)) {
    // #ifdef H5
    if (typeof window !== 'undefined') window.open(props.href, '_blank')
    // #endif
    // #ifndef H5
    uni.setClipboardData({ data: props.href })
    // #endif
    return
  }
  uni.navigateTo({ url: props.href })
}
</script>

<template>
  <text
    class="rb-link"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    @click="onClick"
  >
    <text v-if="icon" class="rb-link__icon">{{ icon }}</text>
    <slot>{{ text }}</slot>
  </text>
</template>
