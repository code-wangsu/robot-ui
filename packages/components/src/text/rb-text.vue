<script setup lang="ts">
import { computed } from 'vue'
import type { RbSize, RbType } from '../types'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { showToast } from '../toast/toast'

defineOptions({ name: 'RbText' })

const props = withDefaults(
  defineProps<{
    text?: string
    type?: RbType | 'main' | 'content' | 'tips' | 'default'
    size?: RbSize | number
    color?: string
    bold?: boolean
    /** 超出省略行数，0 不限制 */
    lines?: number
    /** 单行省略（对齐 Element Plus truncated） */
    truncated?: boolean
    align?: 'left' | 'center' | 'right'
    /** 点击复制全文 */
    copyable?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '',
    type: 'default',
    size: 'medium',
    color: '',
    bold: false,
    lines: 0,
    truncated: false,
    align: 'left',
    copyable: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
  copy: [text: string]
}>()

const resolvedType = computed(() => (props.type === 'default' ? 'main' : props.type))

const rootClass = computed(() =>
  bem(
    'rb-text',
    resolvedType.value,
    typeof props.size === 'string' ? props.size : undefined,
    props.bold && 'bold',
    (props.lines > 0 || props.truncated) && 'ellipsis',
    props.truncated && 'truncated',
  ),
)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = { textAlign: props.align }
  if (typeof props.size === 'number') {
    style.fontSize = addUnit(props.size)
  }
  if (props.color) {
    style.color = props.color
  }
  if (props.lines > 0) {
    style['-webkit-line-clamp'] = props.lines
  }
  if (props.truncated) {
    style['-webkit-line-clamp'] = 1
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})

function displayContent() {
  return props.text
}

function onClick(event: Event) {
  emit('click', event)
  if (!props.copyable) return
  const content = props.text || ''
  if (!content) return

  // #ifdef H5
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(content).then(() => {
      showToast({ message: '已复制', type: 'success', duration: 1200 })
      emit('copy', content)
    })
    return
  }
  // #endif

  uni.setClipboardData({
    data: content,
    success: () => {
      showToast({ message: '已复制', type: 'success', duration: 1200 })
      emit('copy', content)
    },
  })
}
</script>

<template>
  <text
    class="rb-text"
    :class="[rootClass, customClass]"
    :style="rootStyle"
    @click="onClick"
  >
    <slot>{{ displayContent() }}</slot>
  </text>
</template>
