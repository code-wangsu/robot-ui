<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbScrollList' })

const props = withDefaults(
  defineProps<{
    height?: string | number
    indicator?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    height: 200,
    indicator: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  scroll: [event: Event]
}>()

const listStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <scroll-view
    class="rb-scroll-list"
    :class="[bem('rb-scroll-list'), customClass]"
    :style="listStyle"
    scroll-x
    :show-scrollbar="indicator"
    @scroll="emit('scroll', $event)"
  >
    <view class="rb-scroll-list__inner">
      <slot />
    </view>
  </scroll-view>
</template>
