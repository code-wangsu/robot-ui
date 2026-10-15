<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { useSelectorQuery } from '../composables/useSelectorQuery'

defineOptions({ name: 'RbTabs' })

export interface TabItem {
  name: string | number
  title: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    list?: TabItem[]
    scrollable?: boolean
    lineWidth?: string | number
    lineHeight?: string | number
    /** 指示条动画时长（ms） */
    duration?: number
    activeColor?: string
    inactiveColor?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: 0,
    list: () => [],
    scrollable: false,
    lineWidth: 40,
    lineHeight: 6,
    duration: 250,
    activeColor: '',
    inactiveColor: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const uid = `rb-tabs-${Math.random().toString(36).slice(2, 9)}`
const { createQuery } = useSelectorQuery()

const active = ref(props.modelValue)
/** 指示条中心相对 nav 左侧的偏移（px），仅 scrollable 模式使用 */
const lineLeftPx = ref(0)
const lineReady = ref(false)
const scrollIntoView = ref('')
let measureTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (val) => {
    active.value = val
  },
)

const count = computed(() => props.list.length || 1)

const activeIndex = computed(() => {
  const index = props.list.findIndex((item) => item.name === active.value)
  return index < 0 ? 0 : index
})

/**
 * 非滚动：等分 flex，用百分比把指示条放到当前项正中（App 端无需测 DOM，最稳）
 * 滚动：用测量得到的 px 偏移
 */
const lineStyle = computed(() => {
  const base = {
    width: addUnit(props.lineWidth),
    height: addUnit(props.lineHeight),
    backgroundColor: props.activeColor || undefined,
    transitionDuration: lineReady.value ? `${props.duration}ms` : '0ms',
    opacity: lineReady.value || !props.scrollable ? 1 : 0,
  }

  if (!props.scrollable) {
    const percent = ((activeIndex.value + 0.5) / count.value) * 100
    return {
      ...base,
      left: `${percent}%`,
      transform: 'translateX(-50%)',
    }
  }

  return {
    ...base,
    left: `${lineLeftPx.value}px`,
    transform: 'translateX(-50%)',
  }
})

function getTabStyle(item: TabItem) {
  const isActive = active.value === item.name
  const style: Record<string, string> = {}
  if (isActive && props.activeColor) {
    style.color = props.activeColor
  } else if (!isActive && props.inactiveColor) {
    style.color = props.inactiveColor
  }
  return style
}

function itemClass(name: string | number) {
  return `${uid}-item-${name}`
}

function updateLineByMeasure() {
  return new Promise<void>((resolve) => {
    const index = activeIndex.value
    const item = props.list[index]
    if (!item) {
      resolve()
      return
    }

    // 单次 query，避免 App 端并发 query 结果错乱
    createQuery()
      .select(`.${uid}-nav`)
      .boundingClientRect()
      .select(`.${itemClass(item.name)}`)
      .boundingClientRect()
      .exec((res) => {
        const navRect = res?.[0] as UniNamespace.NodeInfo | null
        const itemRect = res?.[1] as UniNamespace.NodeInfo | null
        if (
          navRect &&
          itemRect &&
          typeof navRect.left === 'number' &&
          typeof itemRect.left === 'number' &&
          typeof itemRect.width === 'number'
        ) {
          lineLeftPx.value = itemRect.left - navRect.left + itemRect.width / 2
          lineReady.value = true
          scrollIntoView.value = `${uid}-item-${item.name}`
        }
        resolve()
      })
  })
}

async function scheduleUpdateLine() {
  if (!props.scrollable) {
    lineReady.value = true
    return
  }
  if (measureTimer) {
    clearTimeout(measureTimer)
  }
  await nextTick()
  await updateLineByMeasure()
  measureTimer = setTimeout(() => {
    void updateLineByMeasure()
  }, 50)
}

function setActive(name: string | number) {
  if (active.value === name) {
    return
  }
  active.value = name
  emit('update:modelValue', name)
  emit('change', name)
}

watch(
  () => [active.value, props.list, props.lineWidth, props.scrollable] as const,
  () => {
    void scheduleUpdateLine()
  },
)

onMounted(() => {
  void scheduleUpdateLine()
})

onUnmounted(() => {
  if (measureTimer) {
    clearTimeout(measureTimer)
  }
})
</script>

<template>
  <view
    class="rb-tabs"
    :class="[bem('rb-tabs', scrollable && 'scrollable'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <scroll-view
      v-if="scrollable"
      scroll-x
      class="rb-tabs__scroll"
      :scroll-into-view="scrollIntoView"
      scroll-with-animation
    >
      <view :class="['rb-tabs__nav', `${uid}-nav`]">
        <view
          v-for="item in list"
          :id="`${uid}-item-${item.name}`"
          :key="item.name"
          :class="[
            'rb-tabs__item',
            itemClass(item.name),
            bem('rb-tabs__item', active === item.name && 'active', item.disabled && 'disabled'),
          ]"
          :style="getTabStyle(item)"
          @click="!item.disabled && setActive(item.name)"
        >
          {{ item.title }}
        </view>
        <view class="rb-tabs__line" :style="lineStyle" />
        <slot />
      </view>
    </scroll-view>
    <view v-else :class="['rb-tabs__nav', `${uid}-nav`]">
      <view
        v-for="item in list"
        :key="item.name"
        :class="[
          'rb-tabs__item',
          itemClass(item.name),
          bem('rb-tabs__item', active === item.name && 'active', item.disabled && 'disabled'),
        ]"
        :style="getTabStyle(item)"
        @click="!item.disabled && setActive(item.name)"
      >
        {{ item.title }}
      </view>
      <view class="rb-tabs__line" :style="lineStyle" />
      <slot />
    </view>
  </view>
</template>
