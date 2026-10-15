<script setup lang="ts">
import { computed, inject } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbGridItem' })

const props = withDefaults(
  defineProps<{
    span?: number
    /** 简写文案；也可用默认插槽 */
    text?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    span: 1,
    text: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

interface GridContext {
  col: number
  border: boolean
}

const ctx = inject<GridContext>('rbGrid', { col: 3, border: false })

const itemStyle = computed(() => {
  const width = `${(props.span / ctx.col) * 100}%`
  const style: Record<string, string | number> = { width }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view
    class="rb-grid-item"
    :class="[bem('rb-grid-item', ctx.border && 'border'), customClass]"
    :style="itemStyle"
    @click="emit('click', $event)"
  >
    <slot>
      <text v-if="text" class="rb-grid-item__text">{{ text }}</text>
    </slot>
  </view>
</template>
