<script setup lang="ts">
import { computed } from 'vue'
import type { RbType } from '../types'
import { bem, normalizeStyle } from '../composables/useBem'
import RbLoading from '../loading/rb-loading.vue'

defineOptions({ name: 'RbButton' })

/** 对齐 Element Plus：large / default / small，并保留 mini */
export type RbButtonSize = 'large' | 'default' | 'medium' | 'small' | 'mini'

const props = withDefaults(
  defineProps<{
    type?: RbType
    /** 尺寸：large / default / small / mini（medium 等同 default） */
    size?: RbButtonSize
    plain?: boolean
    round?: boolean
    block?: boolean
    disabled?: boolean
    loading?: boolean
    text?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    type: 'primary',
    size: 'default',
    plain: false,
    round: false,
    block: false,
    disabled: false,
    loading: false,
    text: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const sizeMod = computed(() => {
  const size = props.size
  if (size === 'default' || size === 'medium') return undefined
  return size
})

const rootClass = computed(() =>
  bem(
    'rb-button',
    props.type,
    sizeMod.value,
    props.plain && 'plain',
    props.round && 'round',
    props.block && 'block',
    props.disabled && 'disabled',
  ),
)

function onClick(event: Event) {
  if (props.disabled || props.loading) {
    return
  }
  emit('click', event)
}
</script>

<template>
  <view
    class="rb-button"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
    hover-class="rb-button--hover"
    :hover-stay-time="100"
    @click="onClick"
  >
    <rb-loading v-if="loading" text="" />
    <text v-if="text || $slots.default" class="rb-button__text">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>
