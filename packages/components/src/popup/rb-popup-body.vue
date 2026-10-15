<script setup lang="ts">
import type { CSSProperties } from 'vue'
import RbOverlay from '../overlay/rb-overlay.vue'
import RbTransition from '../transition/rb-transition.vue'

defineOptions({ name: 'RbPopupBody' })

defineProps<{
  show: boolean
  mode: string
  overlay: boolean
  overlayOpacity: number
  zIndex: number
  duration: number
  closeable: boolean
  rootClass: string | Record<string, boolean> | (string | Record<string, boolean>)[]
  contentClass: string | Record<string, boolean> | (string | Record<string, boolean>)[]
  contentStyle: CSSProperties | Record<string, string | number>
  transitionMode: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom'
  transitionStyle: CSSProperties | Record<string, string | number>
}>()

const emit = defineEmits<{
  'overlay-click': []
  'transition-click': []
  'after-enter': []
  close: []
}>()
</script>

<template>
  <view class="rb-popup" :class="rootClass">
    <rb-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex - 1"
      :opacity="overlayOpacity"
      :duration="duration"
      @click="emit('overlay-click')"
    />

    <rb-transition
      :show="show"
      :mode="transitionMode"
      :duration="duration"
      :custom-style="transitionStyle"
      @after-enter="emit('after-enter')"
      @click="emit('transition-click')"
    >
      <view
        class="rb-popup__content"
        :class="contentClass"
        :style="contentStyle"
        @click.stop
      >
        <view v-if="closeable" class="rb-popup__close" @click.stop="emit('close')">×</view>
        <slot />
      </view>
    </rb-transition>
  </view>
</template>
