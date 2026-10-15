<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbList' })

const props = withDefaults(
  defineProps<{
    height?: string | number
    scrollY?: boolean
    refresherEnabled?: boolean
    lowerThreshold?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    height: '100%',
    scrollY: true,
    refresherEnabled: false,
    lowerThreshold: 50,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  scroll: [event: Event]
  scrolltolower: []
  refresherrefresh: []
}>()

const listStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.height !== '100%') {
    style.height = addUnit(props.height)
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
    class="rb-list"
    :class="[bem('rb-list'), customClass]"
    :style="listStyle"
    :scroll-y="scrollY"
    :refresher-enabled="refresherEnabled"
    :lower-threshold="lowerThreshold"
    @scroll="emit('scroll', $event)"
    @scrolltolower="emit('scrolltolower')"
    @refresherrefresh="emit('refresherrefresh')"
  >
    <slot />
  </scroll-view>
</template>
