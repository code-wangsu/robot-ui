<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import { dismissActiveSoftKeyboard } from '../composables/useSoftKeyboardDismiss'
import { showToast } from '../toast/toast'
import RbPopup from '../popup/rb-popup.vue'
import RbEmpty from '../empty/rb-empty.vue'

defineOptions({ name: 'RbMultiSelect' })

export interface MultiSelectOption {
  label?: string
  text?: string
  name?: string
  value?: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 弹层显隐（可选受控，不传则由组件内部管理） */
    show?: boolean
    /** 兼容旧写法 */
    visible?: boolean
    title?: string
    options?: Array<string | MultiSelectOption>
    modelValue?: Array<string | number>
    placeholder?: string
    searchPlaceholder?: string
    filterable?: boolean
    columns?: number
    /** 输入框最多展示几个选项，超出显示 +N */
    maxCollapseCount?: number
    disabled?: boolean
    clearable?: boolean
    required?: boolean
    selectedBadgeText?: string
    emptyText?: string
    cancelText?: string
    confirmText?: string
    requiredToastText?: string
    width?: string | number
    duration?: number
    closeOnClickOverlay?: boolean
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    show: undefined,
    visible: undefined,
    title: '请选择',
    options: () => [],
    modelValue: () => [],
    placeholder: '请选择',
    searchPlaceholder: '输入关键字查询',
    filterable: true,
    columns: 2,
    maxCollapseCount: 2,
    disabled: false,
    clearable: true,
    required: false,
    selectedBadgeText: '',
    emptyText: '暂无匹配选项',
    cancelText: '取消',
    confirmText: '确认选择',
    requiredToastText: '请至少选择一项',
    width: 640,
    duration: 300,
    closeOnClickOverlay: true,
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'update:show': [value: boolean]
  'update:visible': [value: boolean]
  'update:modelValue': [value: Array<string | number>]
  confirm: [value: Array<string | number>]
  cancel: []
  close: []
  change: [value: Array<string | number>]
  clear: []
  'visible-change': [visible: boolean]
}>()

const keyword = ref('')
const draftSelected = ref<Array<string | number>>([])
const innerShow = ref(false)
const tipVisible = ref(false)

const opened = computed(() => {
  if (props.show !== undefined) return props.show
  if (props.visible !== undefined) return props.visible
  return innerShow.value
})

const panelStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: addUnit(props.width),
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra === 'object') {
    Object.assign(style, extra)
  }
  return style
})

const optionStyle = computed(() => {
  const gap = 16
  const cols = Math.max(1, props.columns)
  return {
    width: `calc((100% - ${(cols - 1) * gap}rpx) / ${cols})`,
  }
})

const normalizedOptions = computed(() =>
  props.options.map((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item, disabled: false }
    }
    return {
      label: item?.label ?? item?.text ?? item?.name ?? String(item?.value ?? ''),
      value: item?.value ?? item?.label ?? item?.text ?? item?.name ?? '',
      disabled: !!item?.disabled,
    }
  }),
)

const labelMap = computed(() => {
  const map = new Map<string | number, string>()
  normalizedOptions.value.forEach((item) => {
    map.set(item.value, item.label)
  })
  return map
})

const selectedLabels = computed(() =>
  (props.modelValue || []).map((value) => labelMap.value.get(value) ?? String(value)),
)

const fullText = computed(() => selectedLabels.value.join('、'))

const collapseCount = computed(() => Math.max(1, props.maxCollapseCount))

const visibleLabels = computed(() => selectedLabels.value.slice(0, collapseCount.value))

const overflowCount = computed(() =>
  Math.max(0, selectedLabels.value.length - collapseCount.value),
)

const collapsedText = computed(() => visibleLabels.value.join('、'))

const filteredOptions = computed(() => {
  const text = keyword.value.trim()
  if (!text) return normalizedOptions.value
  return normalizedOptions.value.filter(
    (item) => item.label.includes(text) || String(item.value).includes(text),
  )
})

const showTip = computed(() => tipVisible.value && !!fullText.value)

function setOpened(val: boolean) {
  innerShow.value = val
  emit('update:show', val)
  emit('update:visible', val)
  emit('visible-change', val)
}

watch(
  () => [props.show, props.visible] as const,
  ([show, visible]) => {
    if (show !== undefined) {
      innerShow.value = show
      return
    }
    if (visible !== undefined) {
      innerShow.value = visible
    }
  },
)

watch(opened, (open) => {
  if (!open) {
    keyword.value = ''
    tipVisible.value = false
    return
  }
  dismissActiveSoftKeyboard()
  draftSelected.value = [...(props.modelValue || [])]
})

function open() {
  if (props.disabled) return
  tipVisible.value = false
  setOpened(true)
}

function isSelected(value: string | number) {
  return draftSelected.value.includes(value)
}

function toggleOption(value: string | number, disabled?: boolean) {
  if (disabled) return
  const selected = new Set(draftSelected.value)
  if (selected.has(value)) selected.delete(value)
  else selected.add(value)
  draftSelected.value = Array.from(selected)
  emit('change', [...draftSelected.value])
}

function handleCancel() {
  setOpened(false)
  emit('cancel')
  emit('close')
}

function handleConfirm() {
  if (props.required && !draftSelected.value.length) {
    showToast({ message: props.requiredToastText, type: 'default' })
    return
  }
  const next = [...draftSelected.value]
  emit('update:modelValue', next)
  emit('confirm', next)
  setOpened(false)
}

function onPopupUpdate(show: boolean) {
  setOpened(show)
  if (!show) emit('close')
}

function onClear(event?: Event) {
  event?.stopPropagation?.()
  event?.preventDefault?.()
  tipVisible.value = false
  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
}

function showTooltip() {
  if (!fullText.value) return
  tipVisible.value = true
}

function hideTooltip() {
  tipVisible.value = false
}
</script>

<template>
  <!-- 只读回填输入框 -->
  <view
    class="rb-multi-select-field"
    :class="[
      bem('rb-multi-select-field', disabled && 'disabled', !!selectedLabels.length && 'filled'),
      customClass,
    ]"
    @click="open"
  >
    <view
      class="rb-multi-select-field__body"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @longpress.stop="showTooltip"
    >
      <text v-if="!selectedLabels.length" class="rb-multi-select-field__placeholder">
        {{ placeholder }}
      </text>
      <view v-else class="rb-multi-select-field__value">
        <text class="rb-multi-select-field__text">{{ collapsedText }}</text>
        <text v-if="overflowCount > 0" class="rb-multi-select-field__more">
          +{{ overflowCount }}
        </text>
      </view>

      <view v-if="showTip" class="rb-multi-select-field__tooltip" @click.stop>
        <text class="rb-multi-select-field__tooltip-text">{{ fullText }}</text>
      </view>
    </view>

    <view class="rb-multi-select-field__suffix" @click.stop>
      <view
        v-if="clearable && selectedLabels.length && !disabled"
        class="rb-multi-select-field__clear"
        @click.stop="onClear"
      >
        <text class="rb-multi-select-field__clear-icon">×</text>
      </view>
      <text class="rb-multi-select-field__arrow">›</text>
    </view>
  </view>

  <rb-popup
    :show="opened"
    mode="center"
    :duration="duration"
    :round="16"
    :close-on-click-overlay="closeOnClickOverlay"
    bg-color="transparent"
    @update:show="onPopupUpdate"
  >
    <view
      class="rb-multi-select"
      :class="bem('rb-multi-select')"
      :style="panelStyle"
      @click.stop
    >
      <view class="rb-multi-select__header">
        <text class="rb-multi-select__title">{{ title }}</text>
        <view class="rb-multi-select__close" @click="handleCancel">
          <text class="rb-multi-select__close-icon">×</text>
        </view>
      </view>

      <view v-if="filterable" class="rb-multi-select__search">
        <input
          v-model="keyword"
          class="rb-multi-select__search-input"
          type="text"
          :placeholder="searchPlaceholder"
          confirm-type="search"
        />
      </view>

      <scroll-view scroll-y class="rb-multi-select__body">
        <view v-if="filteredOptions.length" class="rb-multi-select__grid">
          <view
            v-for="item in filteredOptions"
            :key="String(item.value)"
            class="rb-multi-select__option"
            :class="
              bem(
                'rb-multi-select__option',
                isSelected(item.value) && 'active',
                item.disabled && 'disabled',
              )
            "
            :style="optionStyle"
            @click="toggleOption(item.value, item.disabled)"
          >
            <text class="rb-multi-select__option-text">{{ item.label }}</text>
            <text
              v-if="selectedBadgeText && isSelected(item.value)"
              class="rb-multi-select__badge"
            >
              {{ selectedBadgeText }}
            </text>
          </view>
        </view>
        <view v-else class="rb-multi-select__empty">
          <rb-empty :text="emptyText" />
        </view>
      </scroll-view>

      <view class="rb-multi-select__footer">
        <view class="rb-multi-select__btn rb-multi-select__btn--cancel" @click="handleCancel">
          {{ cancelText }}
        </view>
        <view class="rb-multi-select__btn rb-multi-select__btn--confirm" @click="handleConfirm">
          {{ confirmText }}
        </view>
      </view>
    </view>
  </rb-popup>
</template>
