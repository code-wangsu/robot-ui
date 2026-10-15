<script setup lang="ts">
import { computed, toRef } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { usePageScrollLock } from '../composables/usePageScrollLock'
import RbRootPortal from '../root-portal/rb-root-portal.vue'
import RbPopupBody from './rb-popup-body.vue'

defineOptions({ name: 'RbPopup' })

type PopupMode = 'top' | 'bottom' | 'left' | 'right' | 'center'

const props = withDefaults(
  defineProps<{
    show?: boolean
    mode?: PopupMode
    round?: string | number
    closeable?: boolean
    closeOnClickOverlay?: boolean
    overlay?: boolean
    overlayOpacity?: number
    zIndex?: number
    duration?: number
    safeAreaInsetBottom?: boolean
    bgColor?: string
    /** 锁定背景滚动：H5 写 body；App/微信由 page-meta 处理 */
    lockScroll?: boolean
    /**
     * 挂到页面根，避免父级 transform / overflow / swiper 导致 fixed 失效。
     * H5=teleport，微信/支付宝=root-portal，App=renderjs 挪根。
     * App 若不想用 renderjs，可设 false 并把弹层放到页面根级。
     */
    rootPortal?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: false,
    mode: 'bottom',
    round: 0,
    closeable: false,
    closeOnClickOverlay: true,
    overlay: true,
    overlayOpacity: 0.5,
    zIndex: 10075,
    duration: 300,
    safeAreaInsetBottom: true,
    bgColor: '',
    lockScroll: true,
    rootPortal: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  open: []
  close: []
  click: []
  'update:show': [value: boolean]
}>()

const { isLockHost, pageStyle } = usePageScrollLock(
  toRef(props, 'show'),
  toRef(props, 'lockScroll'),
)

const transitionMode = computed(() => {
  const map: Record<PopupMode, 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom'> = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-right',
    right: 'slide-left',
    center: 'zoom',
  }
  return map[props.mode]
})

/**
 * 定位样式挂在 transition 根节点上（对齐 uView），
 * 避免 transform 创建包含块后，内部 absolute 子元素高度塌陷。
 */
const transitionStyle = computed(() => {
  const style: Record<string, string | number> = {
    zIndex: props.zIndex,
    position: 'fixed',
    display: 'flex',
  }

  if (props.mode === 'left' || props.mode === 'right') {
    style[props.mode] = 0
    style.top = 0
    style.bottom = 0
  } else if (props.mode === 'top' || props.mode === 'bottom') {
    style[props.mode] = 0
    style.left = 0
    style.right = 0
  } else {
    style.top = 0
    style.left = 0
    style.right = 0
    style.bottom = 0
    style.alignItems = 'center'
    style.justifyContent = 'center'
  }

  return style
})

const rootClass = computed(() => [bem('rb-popup', props.mode), props.customClass])

const contentClass = computed(() =>
  bem(
    'rb-popup__content',
    props.mode,
    props.safeAreaInsetBottom && props.mode === 'bottom' && 'safe-bottom',
  ),
)

const contentStyle = computed(() => {
  const style: Record<string, string | number> = {}

  if (props.mode !== 'center') {
    style.flex = 1
  }

  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }

  if (props.round) {
    const radius = addUnit(props.round)
    if (props.mode === 'top') {
      style.borderBottomLeftRadius = radius
      style.borderBottomRightRadius = radius
    } else if (props.mode === 'bottom') {
      style.borderTopLeftRadius = radius
      style.borderTopRightRadius = radius
    } else if (props.mode === 'center') {
      style.borderRadius = radius
    }
  }

  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }

  return style
})

function close() {
  emit('update:show', false)
  emit('close')
}

function onOverlayClick() {
  if (props.closeOnClickOverlay) {
    close()
  }
}

/** center 时 transition 铺满全屏，点空白区域等同点遮罩 */
function onTransitionClick() {
  if (props.mode === 'center') {
    onOverlayClick()
  }
  emit('click')
}

function onAfterEnter() {
  emit('open')
}
</script>

<template>
  <!-- App / 微信滚动锁：一页仅一个 page-meta（由 lock host 渲染） -->
  <!-- #ifdef APP || MP-WEIXIN -->
  <page-meta v-if="lockScroll && isLockHost" :page-style="pageStyle" />
  <!-- #endif -->

  <rb-root-portal v-if="rootPortal">
    <rb-popup-body
      :show="show"
      :mode="mode"
      :overlay="overlay"
      :overlay-opacity="overlayOpacity"
      :z-index="zIndex"
      :duration="duration"
      :closeable="closeable"
      :root-class="rootClass"
      :content-class="contentClass"
      :content-style="contentStyle"
      :transition-mode="transitionMode"
      :transition-style="transitionStyle"
      @overlay-click="onOverlayClick"
      @transition-click="onTransitionClick"
      @after-enter="onAfterEnter"
      @close="close"
    >
      <slot />
    </rb-popup-body>
  </rb-root-portal>

  <rb-popup-body
    v-else
    :show="show"
    :mode="mode"
    :overlay="overlay"
    :overlay-opacity="overlayOpacity"
    :z-index="zIndex"
    :duration="duration"
    :closeable="closeable"
    :root-class="rootClass"
    :content-class="contentClass"
    :content-style="contentStyle"
    :transition-mode="transitionMode"
    :transition-style="transitionStyle"
    @overlay-click="onOverlayClick"
    @transition-click="onTransitionClick"
    @after-enter="onAfterEnter"
    @close="close"
  >
    <slot />
  </rb-popup-body>
</template>
