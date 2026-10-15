<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { iconNameSet } from '@robot-ui/assets'
import { bem, normalizeStyle } from '../composables/useBem'
import '@robot-ui/assets/iconfont.css'

defineOptions({ name: 'RbIcon' })

const props = withDefaults(
  defineProps<{
    /** iconfont 的 font_class，如 shuaxin、fanhuishouye */
    name?: string
    size?: string | number
    color?: string
    /** 是否旋转动画（加载场景） */
    spin?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    name: '',
    size: 32,
    color: '',
    spin: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const known = computed(() => !props.name || iconNameSet.has(props.name))

const rootStyle = computed(() => {
  const base: Record<string, string | number> = {
    fontSize: addUnit(props.size),
  }
  if (props.color) {
    base.color = props.color
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(base, extra)
  }
  if (typeof props.customStyle === 'string' && props.customStyle) {
    return props.customStyle
  }
  return base
})

function onClick(event: Event) {
  emit('click', event)
}
</script>

<template>
  <text
    class="rb-icon iconfont"
    :class="[
      bem('rb-icon', spin && 'spin', !known && 'unknown'),
      name ? `icon-${name}` : '',
      customClass,
    ]"
    :style="rootStyle"
    @click="onClick"
  >
    <slot />
  </text>
</template>
