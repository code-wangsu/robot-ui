<script setup lang="ts">
import { computed } from 'vue'
import type { RbType } from '../types'
import { bem, normalizeStyle } from '../composables/useBem'
import RbTransition from '../transition/rb-transition.vue'

defineOptions({ name: 'RbNotify' })

const props = withDefaults(
  defineProps<{
    show?: boolean
    message?: string
    type?: RbType
    duration?: number
    top?: string | number
    safeAreaInsetTop?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    message: '',
    type: 'primary',
    duration: 3000,
    top: 0,
    safeAreaInsetTop: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  close: []
  'update:show': [value: boolean]
}>()

const rootClass = computed(() => bem('rb-notify', props.type))

const notifyStyle = computed(() => {
  const style: Record<string, string | number> = {}
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})
</script>

<template>
  <view v-if="show" class="rb-notify" :class="bem('rb-notify', safeAreaInsetTop && 'safe-top')">
    <rb-transition :show="show" mode="slide-down" :duration="250">
      <view
        class="rb-notify__content"
        :class="[rootClass, customClass]"
        :style="notifyStyle"
        @click="emit('close')"
      >
        <slot>{{ message }}</slot>
      </view>
    </rb-transition>
  </view>
</template>
