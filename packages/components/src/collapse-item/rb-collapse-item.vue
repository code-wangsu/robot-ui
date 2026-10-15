<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'
import { useSelectorQuery } from '../composables/useSelectorQuery'
import RbIcon from '../icon/rb-icon.vue'

defineOptions({ name: 'RbCollapseItem' })

export type RbCollapseName = string | number
export type RbCollapseArrowPlacement = 'left' | 'right' | 'none'

const props = withDefaults(
  defineProps<{
    /** 唯一标识，对应折叠面板 v-model */
    name?: RbCollapseName
    /** 标题 */
    title?: string
    /** 标题右侧内容 */
    value?: string
    /** 标题下方说明 */
    label?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 是否显示箭头（兼容旧 isLink） */
    isLink?: boolean
    /** 箭头位置，默认左侧 */
    arrowPlacement?: RbCollapseArrowPlacement
    /** 点击后是否切换展开（默认 true） */
    clickable?: boolean
    /** 内容区是否延迟渲染（首次展开前不挂载） */
    lazyRender?: boolean
    /** 展开收起动画时长（ms） */
    duration?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    name: '',
    title: '',
    value: '',
    label: '',
    disabled: false,
    isLink: true,
    arrowPlacement: 'left',
    clickable: true,
    lazyRender: false,
    duration: 280,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  click: [name: RbCollapseName]
  change: [expanded: boolean]
}>()

interface CollapseContext {
  activeNames: Ref<RbCollapseName[]>
  border: ComputedRef<boolean> | boolean
  toggle: (name: RbCollapseName) => void
}

const ctx = inject<CollapseContext | null>('rbCollapse', null)
const { getRect } = useSelectorQuery()
const uid = `rb-collapse-item-${Math.random().toString(36).slice(2, 9)}`

const expanded = computed(() => {
  if (!ctx) {
    return false
  }
  return ctx.activeNames.value.includes(props.name)
})

const showBorder = computed(() => {
  if (!ctx) {
    return true
  }
  return typeof ctx.border === 'boolean' ? ctx.border : ctx.border.value
})

const showArrow = computed(
  () => props.isLink && props.arrowPlacement !== 'none',
)

const arrowOnLeft = computed(
  () => showArrow.value && props.arrowPlacement === 'left',
)

const arrowOnRight = computed(
  () => showArrow.value && props.arrowPlacement === 'right',
)

/** lazyRender：首次展开前不挂载；展开过后保持挂载 */
const hasRendered = ref(!props.lazyRender)
const wrapperHeight = ref(expanded.value ? 'auto' : '0px')
const animating = ref(false)
let animTimer: ReturnType<typeof setTimeout> | null = null
let frameTimer: ReturnType<typeof setTimeout> | null = null

function clearAnimTimers() {
  if (animTimer) {
    clearTimeout(animTimer)
    animTimer = null
  }
  if (frameTimer) {
    clearTimeout(frameTimer)
    frameTimer = null
  }
}

async function measureContent(): Promise<number> {
  await nextTick()
  const rect = await getRect(`#${uid}-content`)
  return Math.ceil(rect?.height ?? 0)
}

async function open() {
  clearAnimTimers()
  hasRendered.value = true
  await nextTick()
  const height = await measureContent()
  if (!height) {
    wrapperHeight.value = 'auto'
    animating.value = false
    return
  }
  animating.value = true
  wrapperHeight.value = '0px'
  await nextTick()
  frameTimer = setTimeout(() => {
    wrapperHeight.value = `${height}px`
  }, 16)
  animTimer = setTimeout(() => {
    wrapperHeight.value = 'auto'
    animating.value = false
  }, props.duration + 24)
}

async function close() {
  clearAnimTimers()
  const height = await measureContent()
  animating.value = true
  wrapperHeight.value = height ? `${height}px` : '0px'
  await nextTick()
  frameTimer = setTimeout(() => {
    wrapperHeight.value = '0px'
  }, 16)
  animTimer = setTimeout(() => {
    animating.value = false
  }, props.duration + 24)
}

watch(expanded, (val, oldVal) => {
  if (val) {
    hasRendered.value = true
    void open()
  } else if (oldVal !== undefined) {
    void close()
  }
})

onMounted(() => {
  if (expanded.value) {
    hasRendered.value = true
    void nextTick(async () => {
      const height = await measureContent()
      wrapperHeight.value = height ? `${height}px` : 'auto'
      frameTimer = setTimeout(() => {
        wrapperHeight.value = 'auto'
      }, 32)
    })
  }
})

const wrapperStyle = computed(() => ({
  height: wrapperHeight.value,
  transitionDuration:
    animating.value && wrapperHeight.value !== 'auto'
      ? `${props.duration}ms`
      : '0ms',
}))

function onClick() {
  if (props.disabled || !props.clickable) {
    return
  }
  emit('click', props.name)
  if (!ctx) {
    return
  }
  const next = !expanded.value
  ctx.toggle(props.name)
  emit('change', next)
}
</script>

<template>
  <view
    class="rb-collapse-item"
    :class="[
      bem(
        'rb-collapse-item',
        expanded && 'expanded',
        disabled && 'disabled',
        showBorder && 'border',
      ),
      customClass,
    ]"
    :style="normalizeStyle(customStyle)"
  >
    <view
      class="rb-collapse-item__title"
      :class="{ 'rb-collapse-item__title--disabled': disabled }"
      @click="onClick"
    >
      <view class="rb-collapse-item__title-left">
        <view v-if="arrowOnLeft" class="rb-collapse-item__arrow-wrap">
          <rb-icon
            name="jiantou_you"
            :size="28"
            class="rb-collapse-item__arrow"
            :class="{ 'rb-collapse-item__arrow--expanded': expanded }"
          />
        </view>
        <view v-if="$slots.icon" class="rb-collapse-item__icon">
          <slot name="icon" />
        </view>
        <view class="rb-collapse-item__title-main">
          <view class="rb-collapse-item__title-text">
            <slot name="title">{{ title }}</slot>
          </view>
          <view v-if="label || $slots.label" class="rb-collapse-item__label">
            <slot name="label">{{ label }}</slot>
          </view>
        </view>
      </view>
      <view class="rb-collapse-item__title-right">
        <view v-if="value || $slots.value" class="rb-collapse-item__value">
          <slot name="value">{{ value }}</slot>
        </view>
        <view v-if="arrowOnRight" class="rb-collapse-item__arrow-wrap">
          <rb-icon
            name="jiantou_you"
            :size="28"
            class="rb-collapse-item__arrow"
            :class="{ 'rb-collapse-item__arrow--expanded': expanded }"
          />
        </view>
      </view>
    </view>
    <view class="rb-collapse-item__wrapper" :style="wrapperStyle">
      <view
        v-if="hasRendered"
        :id="`${uid}-content`"
        class="rb-collapse-item__content"
      >
        <slot />
      </view>
    </view>
  </view>
</template>
