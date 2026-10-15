<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbSubsection' })

export interface SubsectionItem {
  name: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: number
    list?: SubsectionItem[] | string[]
    activeColor?: string
    inactiveColor?: string
    bgColor?: string
    /** 滑块背景色 */
    buttonColor?: string
    height?: string | number
    /** 滑块切换动画时长（ms） */
    duration?: number
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    modelValue: 0,
    list: () => [],
    activeColor: '',
    inactiveColor: '',
    bgColor: '',
    buttonColor: '',
    height: 64,
    duration: 280,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const current = ref(props.modelValue)
/** 首帧关闭过渡，避免进页时从 0 滑到当前项 */
const animatable = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    current.value = val
  },
)

const items = computed(() =>
  props.list.map((item) => (typeof item === 'string' ? { name: item } : item)),
)

const count = computed(() => items.value.length || 1)

const activeIndex = computed(() =>
  Math.min(Math.max(current.value, 0), count.value - 1),
)

const wrapStyle = computed(() => {
  const style: Record<string, string | number> = {
    height: addUnit(props.height),
  }
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') {
    Object.assign(style, extra)
  }
  return style
})

/**
 * 用 left 百分比定位（与等分 item 对齐），避免 App 端 transform 百分比错位
 */
const sliderStyle = computed(() => {
  const n = count.value
  const index = activeIndex.value
  return {
    width: `${100 / n}%`,
    left: `${(index / n) * 100}%`,
    transitionDuration: animatable.value ? `${props.duration}ms` : '0ms',
    backgroundColor: props.buttonColor || undefined,
  }
})

function onSelect(index: number) {
  if (current.value === index) {
    return
  }
  animatable.value = true
  current.value = index
  emit('update:modelValue', index)
  emit('change', index)
}

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    animatable.value = true
  }, 50)
})
</script>

<template>
  <view class="rb-subsection" :class="[bem('rb-subsection'), customClass]" :style="wrapStyle">
    <view class="rb-subsection__track">
      <view class="rb-subsection__slider" :style="sliderStyle" />
      <view
        v-for="(item, index) in items"
        :key="index"
        class="rb-subsection__item"
        :class="bem('rb-subsection__item', current === index && 'active')"
        :style="{
          color: current === index ? activeColor || undefined : inactiveColor || undefined,
        }"
        @click="onSelect(index)"
      >
        <text class="rb-subsection__text">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>
