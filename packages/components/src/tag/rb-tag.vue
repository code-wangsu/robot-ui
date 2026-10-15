<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbTag' })

/** 对齐 Element Plus Tag type（danger 与 error 等价） */
export type RbTagType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'error'
/** 对齐 Element Plus Tag effect */
export type RbTagEffect = 'dark' | 'light' | 'plain'
/** 对齐 Element Plus Tag size */
export type RbTagSize = 'large' | 'default' | 'small'

const props = withDefaults(
  defineProps<{
    /** 标签文案；也可用默认插槽 */
    text?: string
    type?: RbTagType
    /** dark 实心 / light 浅底 / plain 描边 */
    effect?: RbTagEffect
    size?: RbTagSize
    /** 是否可关闭 */
    closable?: boolean
    /** 是否圆角胶囊 */
    round?: boolean
    /** 是否有边框描边强调（hit） */
    hit?: boolean
    /** 自定义颜色（设置后覆盖 type 色板） */
    color?: string
    disabled?: boolean
    /** @deprecated 请用 effect="plain" */
    plain?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    text: '',
    type: 'primary',
    effect: 'light',
    size: 'default',
    closable: false,
    round: false,
    hit: false,
    color: '',
    disabled: false,
    plain: false,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
  close: [event: Event]
}>()

const resolvedType = computed(() => (props.type === 'danger' ? 'error' : props.type))

const resolvedEffect = computed<RbTagEffect>(() => {
  if (props.plain) return 'plain'
  return props.effect
})

const rootClass = computed(() =>
  bem(
    'rb-tag',
    resolvedType.value,
    resolvedEffect.value,
    props.size === 'default' ? undefined : props.size,
    props.round && 'round',
    props.hit && 'hit',
    props.disabled && 'disabled',
    Boolean(props.color) && 'custom',
  ),
)

const rootStyle = computed(() => {
  const base: Record<string, string | number> = {}
  if (props.color) {
    if (resolvedEffect.value === 'dark') {
      base.backgroundColor = props.color
      base.borderColor = props.color
      base.color = '#fff'
    } else if (resolvedEffect.value === 'plain') {
      base.backgroundColor = '#fff'
      base.borderColor = props.color
      base.color = props.color
    } else {
      base.backgroundColor = `${props.color}1a`
      base.borderColor = `${props.color}33`
      base.color = props.color
    }
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') Object.assign(base, extra)
  return base
})

function onClose(event: Event) {
  if (props.disabled) return
  event.stopPropagation?.()
  emit('close', event)
}
</script>

<template>
  <view
    class="rb-tag"
    :class="[rootClass, customClass]"
    :style="rootStyle"
    @click="emit('click', $event)"
  >
    <text class="rb-tag__text">
      <slot>{{ text }}</slot>
    </text>
    <text v-if="closable" class="rb-tag__close" @click.stop="onClose">×</text>
  </view>
</template>
