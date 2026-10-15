<script setup lang="ts">
import { computed } from 'vue'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'RbPagination' })

export type RbPaginationSize = 'large' | 'default' | 'small'
export type RbPaginationLayout =
  | 'total'
  | 'sizes'
  | 'prev'
  | 'pager'
  | 'next'
  | 'jumper'

const props = withDefaults(
  defineProps<{
    /** 总条目数 */
    total?: number
    /** 总页数（若传则优先于 total/pageSize 计算） */
    pageCount?: number
    /** 当前页，可用 v-model:current-page */
    currentPage?: number
    /** 每页条数，可用 v-model:page-size */
    pageSize?: number
    /** 每页条数选项 */
    pageSizes?: number[]
    /** 页码按钮数量，奇数，默认 5（移动端） */
    pagerCount?: number
    /**
     * 布局，对齐 Element Plus
     * 默认：prev, pager, next
     */
    layout?: string
    /** 是否带背景色页码（EP background） */
    background?: boolean
    /** 尺寸 */
    size?: RbPaginationSize
    disabled?: boolean
    /** 只有一页时隐藏 */
    hideOnSinglePage?: boolean
    prevText?: string
    nextText?: string
    /** 总数文案，可用 {total} 占位 */
    totalText?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    total: 0,
    pageCount: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: () => [10, 20, 50, 100],
    pagerCount: 5,
    layout: 'total, prev, pager, next',
    background: true,
    size: 'default',
    disabled: false,
    hideOnSinglePage: false,
    prevText: '上一页',
    nextText: '下一页',
    totalText: '共 {total} 条',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  'current-change': [page: number]
  'size-change': [size: number]
  change: [page: number, pageSize: number]
}>()

const layoutParts = computed(() =>
  props.layout
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean) as RbPaginationLayout[],
)

const innerPageSize = computed({
  get: () => Math.max(1, props.pageSize || 10),
  set: (val: number) => {
    emit('update:pageSize', val)
    emit('size-change', val)
    emit('change', 1, val)
  },
})

const pageTotal = computed(() => {
  if (props.pageCount && props.pageCount > 0) return Math.floor(props.pageCount)
  return Math.max(1, Math.ceil((props.total || 0) / innerPageSize.value) || 1)
})

const current = computed({
  get: () => {
    const page = Math.floor(props.currentPage || 1)
    return Math.min(Math.max(page, 1), pageTotal.value)
  },
  set: (val: number) => {
    const next = Math.min(Math.max(Math.floor(val), 1), pageTotal.value)
    emit('update:currentPage', next)
    emit('current-change', next)
    emit('change', next, innerPageSize.value)
  },
})

const visible = computed(() => {
  if (props.hideOnSinglePage && pageTotal.value <= 1) return false
  return true
})

const sizeMod = computed(() => (props.size === 'default' ? undefined : props.size))

const rootClass = computed(() =>
  bem(
    'rb-pagination',
    sizeMod.value,
    props.background && 'background',
    props.disabled && 'disabled',
  ),
)

const totalLabel = computed(() =>
  (props.totalText || '共 {total} 条').replace('{total}', String(props.total ?? 0)),
)

/**
 * 生成页码序列，含省略号标记
 * 对齐 Element Plus pager 折叠逻辑
 */
const pagers = computed(() => {
  const pageCount = pageTotal.value
  const currentPage = current.value
  let pagerCount = Math.floor(props.pagerCount || 5)
  if (pagerCount % 2 === 0) pagerCount += 1
  pagerCount = Math.max(5, Math.min(pagerCount, 21))

  const half = Math.floor(pagerCount / 2)
  const pages: Array<number | 'prev-ellipsis' | 'next-ellipsis'> = []

  if (pageCount <= pagerCount) {
    for (let i = 1; i <= pageCount; i++) pages.push(i)
    return pages
  }

  const showPrevMore = currentPage > half + 1
  const showNextMore = currentPage < pageCount - half

  pages.push(1)

  if (showPrevMore) pages.push('prev-ellipsis')

  let start: number
  let end: number
  if (!showPrevMore && showNextMore) {
    start = 2
    end = pagerCount - 1
  } else if (showPrevMore && !showNextMore) {
    start = pageCount - (pagerCount - 2)
    end = pageCount - 1
  } else {
    start = currentPage - (half - 1)
    end = currentPage + (half - 1)
  }

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < pageCount) pages.push(i)
  }

  if (showNextMore) pages.push('next-ellipsis')
  pages.push(pageCount)

  return pages
})

function go(page: number) {
  if (props.disabled) return
  if (page === current.value) return
  if (page < 1 || page > pageTotal.value) return
  current.value = page
}

function prev() {
  go(current.value - 1)
}

function next() {
  go(current.value + 1)
}

function onEllipsis(dir: 'prev-ellipsis' | 'next-ellipsis') {
  if (props.disabled) return
  const step = Math.max(1, Math.floor((props.pagerCount || 5) - 2))
  if (dir === 'prev-ellipsis') go(current.value - step)
  else go(current.value + step)
}

function onSizeTap() {
  if (props.disabled || !props.pageSizes.length) return
  uni.showActionSheet({
    itemList: props.pageSizes.map((n) => `${n} 条/页`),
    success: (res) => {
      const size = props.pageSizes[res.tapIndex]
      if (!size || size === innerPageSize.value) return
      innerPageSize.value = size
      // 切换每页条数后回到第一页
      if (current.value !== 1) {
        emit('update:currentPage', 1)
        emit('current-change', 1)
      }
    },
  })
}

function onJumperConfirm(e: { detail?: { value?: string } }) {
  if (props.disabled) return
  const raw = e?.detail?.value ?? ''
  const num = Number.parseInt(String(raw), 10)
  if (!Number.isFinite(num)) return
  go(num)
}
</script>

<template>
  <view
    v-if="visible"
    class="rb-pagination"
    :class="[rootClass, customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <template v-for="(part, idx) in layoutParts" :key="`${part}-${idx}`">
      <text v-if="part === 'total'" class="rb-pagination__total">{{ totalLabel }}</text>

      <view
        v-else-if="part === 'sizes'"
        class="rb-pagination__sizes"
        :class="{ 'is-disabled': disabled }"
        @click="onSizeTap"
      >
        <text class="rb-pagination__sizes-text">{{ innerPageSize }} 条/页</text>
        <text class="rb-pagination__sizes-arrow">▾</text>
      </view>

      <view
        v-else-if="part === 'prev'"
        class="rb-pagination__btn rb-pagination__btn--prev"
        :class="{ 'is-disabled': disabled || current <= 1 }"
        @click="prev"
      >
        <text>{{ prevText }}</text>
      </view>

      <view v-else-if="part === 'pager'" class="rb-pagination__pager">
        <view
          v-for="(item, pIndex) in pagers"
          :key="`${item}-${pIndex}`"
          class="rb-pagination__number"
          :class="{
            'is-active': item === current,
            'is-ellipsis': item === 'prev-ellipsis' || item === 'next-ellipsis',
            'is-disabled': disabled,
          }"
          @click="
            item === 'prev-ellipsis' || item === 'next-ellipsis'
              ? onEllipsis(item)
              : go(item as number)
          "
        >
          <text>{{ item === 'prev-ellipsis' || item === 'next-ellipsis' ? '…' : item }}</text>
        </view>
      </view>

      <view
        v-else-if="part === 'next'"
        class="rb-pagination__btn rb-pagination__btn--next"
        :class="{ 'is-disabled': disabled || current >= pageTotal }"
        @click="next"
      >
        <text>{{ nextText }}</text>
      </view>

      <view v-else-if="part === 'jumper'" class="rb-pagination__jumper">
        <text class="rb-pagination__jumper-label">前往</text>
        <input
          class="rb-pagination__jumper-input"
          type="number"
          :disabled="disabled"
          :value="String(current)"
          @confirm="onJumperConfirm"
        />
        <text class="rb-pagination__jumper-label">页</text>
      </view>
    </template>
  </view>
</template>
