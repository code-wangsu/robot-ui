<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { addUnit, toPx } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { useSelectorQuery } from '../composables/useSelectorQuery'

defineOptions({ name: 'RbReadMore' })

const props = withDefaults(
  defineProps<{
    showHeight?: string | number
    closeText?: string
    openText?: string
    toggle?: boolean
    color?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    showHeight: 200,
    closeText: '展开阅读全文',
    openText: '收起',
    toggle: true,
    color: '',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  open: []
  close: []
}>()

const expanded = ref(false)
const overflow = ref(true)
const uid = `rb-read-more-${Math.random().toString(36).slice(2, 9)}`
const { getRect } = useSelectorQuery()

const contentStyle = computed(() => {
  if (expanded.value || !overflow.value) return undefined
  return {
    maxHeight: addUnit(props.showHeight),
    overflow: 'hidden',
  }
})

const toggleStyle = computed(() => (props.color ? { color: props.color } : undefined))

async function measure() {
  await nextTick()
  const rect = await getRect(`#${uid}-probe`)
  const limit = toPx(props.showHeight)
  overflow.value = (rect?.height ?? 0) > limit + 1
}

function onToggle() {
  if (!props.toggle) return
  expanded.value = !expanded.value
  emit(expanded.value ? 'open' : 'close')
}

watch(() => props.showHeight, measure)

onMounted(() => {
  void measure()
  setTimeout(() => {
    void measure()
  }, 50)
})

defineExpose({
  open: () => {
    expanded.value = true
  },
  close: () => {
    expanded.value = false
  },
  measure,
})
</script>

<template>
  <view class="rb-read-more" :class="[bem('rb-read-more', expanded && 'open'), customClass]" :style="normalizeStyle(customStyle)">
    <view class="rb-read-more__content" :style="contentStyle">
      <slot />
    </view>
    <!-- 探针：始终完整渲染以测量真实高度 -->
    <view :id="`${uid}-probe`" class="rb-read-more__probe">
      <slot />
    </view>
    <text v-if="overflow" class="rb-read-more__toggle" :style="toggleStyle" @click="onToggle">
      {{ expanded ? openText : closeText }}
    </text>
  </view>
</template>
