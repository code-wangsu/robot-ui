/**
 * 批量生成 robot-ui 组件（Vue3 + rpx，兼容 uni-app 安卓 Pad）
 * 参考 uView2.0 组件清单与 API 设计
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const compRoot = path.join(root, 'packages/components/src')
const styleRoot = path.join(root, 'packages/styles/components')

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function write(file, content) {
  ensureDir(path.dirname(file))
  fs.writeFileSync(file, content.trimStart(), 'utf8')
}

/** kebab -> Pascal */
function toPascal(name) {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

const existing = new Set([
  'button',
  'icon',
  'loading',
  'empty',
  'cell',
  'table',
  'loadmore',
  'pull-refresh',
  'virtual-list',
])

/**
 * 组件定义：name 为目录名（kebab），实现模板类型
 */
const catalog = [
  // 基础
  { name: 'image', category: 'basic', kind: 'image' },
  { name: 'text', category: 'basic', kind: 'text' },
  { name: 'row', category: 'basic', kind: 'row' },
  { name: 'col', category: 'basic', kind: 'col' },
  { name: 'badge', category: 'basic', kind: 'badge' },
  { name: 'tag', category: 'basic', kind: 'tag' },
  { name: 'loading-icon', category: 'basic', kind: 'loading-icon' },
  { name: 'loading-page', category: 'basic', kind: 'loading-page' },
  { name: 'cell-group', category: 'basic', kind: 'cell-group' },
  // 表单
  { name: 'form', category: 'form', kind: 'form' },
  { name: 'form-item', category: 'form', kind: 'form-item' },
  { name: 'input', category: 'form', kind: 'input' },
  { name: 'textarea', category: 'form', kind: 'textarea' },
  { name: 'checkbox', category: 'form', kind: 'checkbox' },
  { name: 'checkbox-group', category: 'form', kind: 'checkbox-group' },
  { name: 'radio', category: 'form', kind: 'radio' },
  { name: 'radio-group', category: 'form', kind: 'radio-group' },
  { name: 'switch', category: 'form', kind: 'switch' },
  { name: 'slider', category: 'form', kind: 'slider' },
  { name: 'rate', category: 'form', kind: 'rate' },
  { name: 'search', category: 'form', kind: 'search' },
  { name: 'number-box', category: 'form', kind: 'number-box' },
  { name: 'upload', category: 'form', kind: 'upload' },
  { name: 'code', category: 'form', kind: 'code' },
  { name: 'code-input', category: 'form', kind: 'code-input' },
  { name: 'picker', category: 'form', kind: 'picker' },
  { name: 'datetime-picker', category: 'form', kind: 'datetime-picker' },
  { name: 'calendar', category: 'form', kind: 'calendar' },
  { name: 'keyboard', category: 'form', kind: 'keyboard' },
  { name: 'album', category: 'form', kind: 'album' },
  // 数据
  { name: 'list', category: 'data', kind: 'list' },
  { name: 'list-item', category: 'data', kind: 'list-item' },
  { name: 'line-progress', category: 'data', kind: 'line-progress' },
  { name: 'count-down', category: 'data', kind: 'count-down' },
  { name: 'count-to', category: 'data', kind: 'count-to' },
  // 反馈
  { name: 'overlay', category: 'feedback', kind: 'overlay' },
  { name: 'popup', category: 'feedback', kind: 'popup' },
  { name: 'modal', category: 'feedback', kind: 'modal' },
  { name: 'toast', category: 'feedback', kind: 'toast' },
  { name: 'notify', category: 'feedback', kind: 'notify' },
  { name: 'action-sheet', category: 'feedback', kind: 'action-sheet' },
  { name: 'alert', category: 'feedback', kind: 'alert' },
  { name: 'notice-bar', category: 'feedback', kind: 'notice-bar' },
  { name: 'tooltip', category: 'feedback', kind: 'tooltip' },
  { name: 'swipe-action', category: 'feedback', kind: 'swipe-action' },
  { name: 'swipe-action-item', category: 'feedback', kind: 'swipe-action-item' },
  { name: 'collapse', category: 'feedback', kind: 'collapse' },
  { name: 'collapse-item', category: 'feedback', kind: 'collapse-item' },
  // 布局
  { name: 'scroll-list', category: 'layout', kind: 'scroll-list' },
  { name: 'line', category: 'layout', kind: 'line' },
  { name: 'no-network', category: 'layout', kind: 'no-network' },
  { name: 'grid', category: 'layout', kind: 'grid' },
  { name: 'grid-item', category: 'layout', kind: 'grid-item' },
  { name: 'swiper', category: 'layout', kind: 'swiper' },
  { name: 'skeleton', category: 'layout', kind: 'skeleton' },
  { name: 'sticky', category: 'layout', kind: 'sticky' },
  { name: 'divider', category: 'layout', kind: 'divider' },
  { name: 'gap', category: 'layout', kind: 'gap' },
  // 导航
  { name: 'tabbar', category: 'nav', kind: 'tabbar' },
  { name: 'tabbar-item', category: 'nav', kind: 'tabbar-item' },
  { name: 'back-top', category: 'nav', kind: 'back-top' },
  { name: 'navbar', category: 'nav', kind: 'navbar' },
  { name: 'tabs', category: 'nav', kind: 'tabs' },
  { name: 'subsection', category: 'nav', kind: 'subsection' },
  { name: 'index-list', category: 'nav', kind: 'index-list' },
  { name: 'index-anchor', category: 'nav', kind: 'index-anchor' },
  { name: 'steps', category: 'nav', kind: 'steps' },
  { name: 'steps-item', category: 'nav', kind: 'steps-item' },
  // 其他
  { name: 'parse', category: 'other', kind: 'parse' },
  { name: 'read-more', category: 'other', kind: 'read-more' },
  { name: 'avatar', category: 'other', kind: 'avatar' },
  { name: 'avatar-group', category: 'other', kind: 'avatar-group' },
  { name: 'link', category: 'other', kind: 'link' },
  { name: 'transition', category: 'other', kind: 'transition' },
  { name: 'status-bar', category: 'other', kind: 'status-bar' },
  { name: 'safe-bottom', category: 'other', kind: 'safe-bottom' },
]

function vueShell(pascal, script, template, style = '') {
  return `<script setup lang="ts">
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'

defineOptions({ name: 'Rb${pascal}' })

${script}
</script>

<template>
${template}
</template>

${style ? `<style lang="scss">\n${style}\n</style>\n` : ''}`
}

/** 各组件实现生成器 */
const generators = {
  image(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  src: string
  mode?: string
  width?: string | number
  height?: string | number
  radius?: string | number
  lazyLoad?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  mode: 'aspectFill',
  width: '100%',
  height: 300,
  radius: 0,
  lazyLoad: true,
  customStyle: '',
  customClass: '',
})

const emit = defineEmits<{ click: []; load: []; error: [] }>()

const wrapStyle = () => ({
  width: addUnit(props.width),
  height: addUnit(props.height),
  borderRadius: addUnit(props.radius),
  overflow: 'hidden',
  ...((typeof props.customStyle === 'object' ? props.customStyle : {}) as object),
})`,
      `  <view class="rb-image" :class="[bem('rb-image'), customClass]" :style="normalizeStyle(wrapStyle())" @click="emit('click')">
    <image
      class="rb-image__img"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="emit('load')"
      @error="emit('error')"
    />
  </view>`,
      `.rb-image { display: inline-flex; }
.rb-image__img { width: 100%; height: 100%; display: block; }`,
    )
  },

  text(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  text?: string | number
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'main' | 'content' | 'tips'
  size?: string | number
  bold?: boolean
  lines?: number
  color?: string
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  text: '',
  type: 'main',
  size: 28,
  bold: false,
  lines: 0,
  color: '',
  customStyle: '',
  customClass: '',
})

const colorMap: Record<string, string> = {
  primary: '#3c9cff',
  success: '#5ac725',
  warning: '#f9ae3d',
  error: '#f56c6c',
  info: '#909399',
  main: '#303133',
  content: '#606266',
  tips: '#909193',
}

const style = () => ({
  fontSize: addUnit(props.size),
  fontWeight: props.bold ? 600 : 400,
  color: props.color || colorMap[props.type],
  ...(props.lines > 0
    ? {
        display: '-webkit-box',
        WebkitLineClamp: props.lines,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
      }
    : {}),
  ...((typeof props.customStyle === 'object' ? props.customStyle : {}) as object),
})`,
      `  <text class="rb-text" :class="[bem('rb-text'), customClass]" :style="normalizeStyle(style())">
    <slot>{{ text }}</slot>
  </text>`,
    )
  },

  row(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  gutter?: string | number
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  align?: 'top' | 'center' | 'bottom'
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  customStyle: '',
  customClass: '',
})

const justifyMap = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around' }
const alignMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' }

const style = () => ({
  display: 'flex',
  flexDirection: 'row' as const,
  flexWrap: 'wrap' as const,
  justifyContent: justifyMap[props.justify],
  alignItems: alignMap[props.align],
  marginLeft: props.gutter ? \`-\${Number(props.gutter) / 2}rpx\` : undefined,
  marginRight: props.gutter ? \`-\${Number(props.gutter) / 2}rpx\` : undefined,
  ...((typeof props.customStyle === 'object' ? props.customStyle : {}) as object),
})

provideGutter()
function provideGutter() {
  // gutter 通过 CSS 变量传给 col
}

import { provide } from 'vue'
provide('rbRowGutter', props.gutter)`,
      `  <view class="rb-row" :class="[bem('rb-row'), customClass]" :style="normalizeStyle(style())">
    <slot />
  </view>`,
    ).replace(
      `provideGutter()
function provideGutter() {
  // gutter 通过 CSS 变量传给 col
}

import { provide } from 'vue'
provide('rbRowGutter', props.gutter)`,
      `import { provide } from 'vue'
provide('rbRowGutter', props.gutter)`,
    )
  },

  col(name, pascal) {
    return vueShell(
      pascal,
      `import { inject, computed } from 'vue'

const props = withDefaults(defineProps<{
  span?: number
  offset?: number
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  span: 12,
  offset: 0,
  customStyle: '',
  customClass: '',
})

const gutter = inject<string | number>('rbRowGutter', 0)

const style = computed(() => {
  const pad = Number(gutter) / 2
  return {
    width: \`\${(props.span / 12) * 100}%\`,
    marginLeft: props.offset ? \`\${(props.offset / 12) * 100}%\` : undefined,
    paddingLeft: pad ? \`\${pad}rpx\` : undefined,
    paddingRight: pad ? \`\${pad}rpx\` : undefined,
    boxSizing: 'border-box' as const,
    ...((typeof props.customStyle === 'object' ? props.customStyle : {}) as object),
  }
})`,
      `  <view class="rb-col" :class="[bem('rb-col'), customClass]" :style="normalizeStyle(style)">
    <slot />
  </view>`,
    )
  },

  badge(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  value?: string | number
  max?: number
  isDot?: boolean
  show?: boolean
  bgColor?: string
  color?: string
  absolute?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  value: '',
  max: 99,
  isDot: false,
  show: true,
  bgColor: '#f56c6c',
  color: '#fff',
  absolute: false,
  customStyle: '',
  customClass: '',
})

const text = () => {
  if (props.isDot) return ''
  const num = Number(props.value)
  if (!Number.isNaN(num) && num > props.max) return \`\${props.max}+\`
  return String(props.value)
}`,
      `  <view class="rb-badge-wrap" :class="customClass">
    <slot />
    <view
      v-if="show && (isDot || value !== '' && value !== undefined)"
      class="rb-badge"
      :class="[bem('rb-badge', isDot && 'dot', absolute && 'absolute')]"
      :style="normalizeStyle({ backgroundColor: bgColor, color, ...(typeof customStyle === 'object' ? customStyle : {}) })"
    >{{ text() }}</view>
  </view>`,
      `.rb-badge-wrap { position: relative; display: inline-flex; }
.rb-badge {
  min-width: 32rpx; height: 32rpx; padding: 0 10rpx; border-radius: 999rpx;
  font-size: 20rpx; line-height: 32rpx; text-align: center; box-sizing: border-box;
}
.rb-badge--dot { width: 16rpx; height: 16rpx; min-width: 16rpx; padding: 0; }
.rb-badge--absolute { position: absolute; top: -8rpx; right: -8rpx; }`,
    )
  },

  tag(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  text?: string
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  plain?: boolean
  size?: 'mini' | 'medium' | 'large'
  closable?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  text: '',
  type: 'primary',
  plain: false,
  size: 'medium',
  closable: false,
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ click: []; close: [] }>()`,
      `  <view
    class="rb-tag"
    :class="[bem('rb-tag', type, size, plain && 'plain'), customClass]"
    :style="normalizeStyle(customStyle)"
    @click="emit('click')"
  >
    <text><slot>{{ text }}</slot></text>
    <text v-if="closable" class="rb-tag__close" @click.stop="emit('close')">×</text>
  </view>`,
      `.rb-tag {
  display: inline-flex; align-items: center; padding: 4rpx 16rpx; border-radius: 8rpx;
  font-size: 24rpx; border: 1px solid transparent;
}
.rb-tag--mini { font-size: 20rpx; padding: 2rpx 10rpx; }
.rb-tag--large { font-size: 28rpx; padding: 8rpx 20rpx; }
.rb-tag--primary { background: #ecf5ff; color: #3c9cff; border-color: #3c9cff; }
.rb-tag--success { background: #f5fff0; color: #5ac725; border-color: #5ac725; }
.rb-tag--warning { background: #fdf6ec; color: #f9ae3d; border-color: #f9ae3d; }
.rb-tag--error { background: #fef0f0; color: #f56c6c; border-color: #f56c6c; }
.rb-tag--info { background: #f4f4f5; color: #909399; border-color: #909399; }
.rb-tag--plain { background: transparent; }
.rb-tag__close { margin-left: 8rpx; }`,
    )
  },

  'loading-icon'(name, pascal) {
    return vueShell(
      pascal,
      `withDefaults(defineProps<{
  size?: string | number
  color?: string
  text?: string
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  size: 40,
  color: '#3c9cff',
  text: '',
  customStyle: '',
  customClass: '',
})`,
      `  <view class="rb-loading-icon" :class="[bem('rb-loading-icon'), customClass]" :style="normalizeStyle(customStyle)">
    <view class="rb-loading-icon__spinner" :style="{ width: addUnit(size), height: addUnit(size), borderTopColor: color }" />
    <text v-if="text" class="rb-loading-icon__text">{{ text }}</text>
  </view>`,
      `.rb-loading-icon { display: inline-flex; flex-direction: column; align-items: center; }
.rb-loading-icon__spinner {
  border: 4rpx solid #ecf5ff; border-radius: 50%;
  animation: rb-spin 0.8s linear infinite;
}
.rb-loading-icon__text { margin-top: 12rpx; font-size: 24rpx; color: #909193; }
@keyframes rb-spin { to { transform: rotate(360deg); } }`,
    )
  },

  'loading-page'(name, pascal) {
    return vueShell(
      pascal,
      `withDefaults(defineProps<{
  loading?: boolean
  text?: string
  bgColor?: string
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  loading: true,
  text: '加载中...',
  bgColor: '#ffffff',
  customStyle: '',
  customClass: '',
})`,
      `  <view
    v-if="loading"
    class="rb-loading-page"
    :class="[bem('rb-loading-page'), customClass]"
    :style="normalizeStyle({ backgroundColor: bgColor, ...(typeof customStyle === 'object' ? customStyle : {}) })"
  >
    <view class="rb-loading-page__spinner" />
    <text class="rb-loading-page__text">{{ text }}</text>
  </view>`,
      `.rb-loading-page {
  position: fixed; inset: 0; z-index: 10090;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.rb-loading-page__spinner {
  width: 64rpx; height: 64rpx; border: 6rpx solid #ecf5ff; border-top-color: #3c9cff;
  border-radius: 50%; animation: rb-spin 0.8s linear infinite;
}
.rb-loading-page__text { margin-top: 24rpx; color: #909193; font-size: 28rpx; }
@keyframes rb-spin { to { transform: rotate(360deg); } }`,
    )
  },

  'cell-group'(name, pascal) {
    return vueShell(
      pascal,
      `withDefaults(defineProps<{
  title?: string
  border?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  title: '',
  border: true,
  customStyle: '',
  customClass: '',
})`,
      `  <view class="rb-cell-group" :class="[bem('rb-cell-group', border && 'border'), customClass]" :style="normalizeStyle(customStyle)">
    <view v-if="title" class="rb-cell-group__title">{{ title }}</view>
    <view class="rb-cell-group__body"><slot /></view>
  </view>`,
      `.rb-cell-group__title { padding: 24rpx 32rpx 12rpx; color: #909193; font-size: 26rpx; }
.rb-cell-group__body { background: #fff; }
.rb-cell-group--border .rb-cell-group__body { border-top: 1px solid #dadbde; border-bottom: 1px solid #dadbde; }`,
    )
  },

  form(name, pascal) {
    return vueShell(
      pascal,
      `import { provide, reactive, ref } from 'vue'

const props = withDefaults(defineProps<{
  model?: Record<string, unknown>
  rules?: Record<string, Array<{ required?: boolean; message?: string; pattern?: RegExp }>>
  labelWidth?: string | number
  labelPosition?: 'left' | 'top'
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  model: () => ({}),
  rules: () => ({}),
  labelWidth: 160,
  labelPosition: 'left',
  customStyle: '',
  customClass: '',
})

const errors = reactive<Record<string, string>>({})

function validateField(prop: string) {
  const rules = props.rules[prop] || []
  const value = props.model[prop]
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors[prop] = rule.message || \`\${prop} 必填\`
      return false
    }
    if (rule.pattern && value != null && !rule.pattern.test(String(value))) {
      errors[prop] = rule.message || \`\${prop} 格式错误\`
      return false
    }
  }
  delete errors[prop]
  return true
}

function validate() {
  return Object.keys(props.rules).every((key) => validateField(key))
}

function clearValidate() {
  Object.keys(errors).forEach((k) => delete errors[k])
}

provide('rbForm', { props, errors, validateField })

defineExpose({ validate, clearValidate, validateField })`,
      `  <view class="rb-form" :class="[bem('rb-form'), customClass]" :style="normalizeStyle(customStyle)">
    <slot />
  </view>`,
    )
  },

  'form-item'(name, pascal) {
    return vueShell(
      pascal,
      `import { inject, computed } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  prop?: string
  required?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  label: '',
  prop: '',
  required: false,
  customStyle: '',
  customClass: '',
})

const form = inject<{
  props: { labelWidth: string | number; labelPosition: string }
  errors: Record<string, string>
}>('rbForm', null as never)

const error = computed(() => (props.prop && form ? form.errors[props.prop] : ''))
const labelWidth = computed(() => addUnit(form?.props.labelWidth ?? 160))
const isTop = computed(() => form?.props.labelPosition === 'top')`,
      `  <view class="rb-form-item" :class="[bem('rb-form-item', isTop && 'top'), customClass]" :style="normalizeStyle(customStyle)">
    <view class="rb-form-item__label" :style="{ width: isTop ? '100%' : labelWidth }">
      <text v-if="required" class="rb-form-item__required">*</text>
      <text>{{ label }}</text>
    </view>
    <view class="rb-form-item__content">
      <slot />
      <text v-if="error" class="rb-form-item__error">{{ error }}</text>
    </view>
  </view>`,
      `.rb-form-item { display: flex; padding: 24rpx 0; border-bottom: 1px solid #f0f0f0; }
.rb-form-item--top { flex-direction: column; }
.rb-form-item__label { color: #303133; font-size: 28rpx; display: flex; align-items: center; }
.rb-form-item__required { color: #f56c6c; margin-right: 6rpx; }
.rb-form-item__content { flex: 1; min-width: 0; }
.rb-form-item__error { display: block; margin-top: 8rpx; color: #f56c6c; font-size: 22rpx; }`,
    )
  },

  input(name, pascal) {
    return vueShell(
      pascal,
      `import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  password?: boolean
  maxlength?: number
  border?: 'surround' | 'bottom' | 'none'
  fontSize?: string | number
  color?: string
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: false,
  password: false,
  maxlength: -1,
  border: 'surround',
  fontSize: 28,
  color: '#303133',
  customStyle: '',
  customClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  focus: [e: unknown]
  blur: [value: string]
  confirm: [value: string]
  clear: []
}>()

const focused = ref(false)
const showClear = computed(() => props.clearable && !props.readonly && focused.value && String(props.modelValue) !== '')

function onInput(e: { detail: { value: string } }) {
  const value = e.detail.value
  emit('update:modelValue', value)
  emit('input', value)
  emit('change', value)
}
function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}`,
      `  <view
    class="rb-input"
    :class="[bem('rb-input', border, disabled && 'disabled'), customClass]"
    :style="normalizeStyle(customStyle)"
  >
    <view class="rb-input__prefix"><slot name="prefix" /></view>
    <input
      class="rb-input__field"
      :value="modelValue"
      :type="password ? 'password' : type"
      :placeholder="placeholder"
      :disabled="disabled || readonly"
      :maxlength="maxlength"
      :style="{ fontSize: addUnit(fontSize), color }"
      @input="onInput"
      @focus="focused = true; emit('focus', $event)"
      @blur="focused = false; emit('blur', String(modelValue))"
      @confirm="emit('confirm', String(modelValue))"
    />
    <view v-if="showClear" class="rb-input__clear" @click="onClear">×</view>
    <view class="rb-input__suffix"><slot name="suffix" /></view>
  </view>`,
      `.rb-input {
  display: flex; align-items: center; min-height: 72rpx; padding: 0 20rpx;
  background: #fff; box-sizing: border-box;
}
.rb-input--surround { border: 1px solid #dadbde; border-radius: 12rpx; }
.rb-input--bottom { border-bottom: 1px solid #dadbde; border-radius: 0; padding-left: 0; padding-right: 0; }
.rb-input--none { padding-left: 0; padding-right: 0; }
.rb-input--disabled { background: #f5f7fa; }
.rb-input__field { flex: 1; height: 72rpx; font-size: 28rpx; }
.rb-input__clear {
  width: 36rpx; height: 36rpx; margin-left: 12rpx; border-radius: 50%;
  background: #c0c4cc; color: #fff; text-align: center; line-height: 36rpx; font-size: 24rpx;
}
.rb-input__prefix { margin-right: 12rpx; }
.rb-input__suffix { margin-left: 12rpx; }`,
    )
  },

  textarea(name, pascal) {
    return vueShell(
      pascal,
      `withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  maxlength?: number
  height?: string | number
  count?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
  maxlength: 140,
  height: 200,
  count: false,
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ 'update:modelValue': [v: string]; change: [v: string] }>()
function onInput(e: { detail: { value: string } }) {
  emit('update:modelValue', e.detail.value)
  emit('change', e.detail.value)
}`,
      `  <view class="rb-textarea" :class="[bem('rb-textarea'), customClass]" :style="normalizeStyle(customStyle)">
    <textarea
      class="rb-textarea__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :style="{ height: addUnit(height) }"
      @input="onInput"
    />
    <text v-if="count" class="rb-textarea__count">{{ String(modelValue).length }}/{{ maxlength }}</text>
  </view>`,
      `.rb-textarea { position: relative; padding: 20rpx; border: 1px solid #dadbde; border-radius: 12rpx; background: #fff; }
.rb-textarea__field { width: 100%; font-size: 28rpx; color: #303133; }
.rb-textarea__count { position: absolute; right: 16rpx; bottom: 12rpx; color: #909193; font-size: 22rpx; }`,
    )
  },

  checkbox(name, pascal) {
    return vueShell(
      pascal,
      `import { inject, computed } from 'vue'

const props = withDefaults(defineProps<{
  name?: string | number | boolean
  label?: string
  disabled?: boolean
  shape?: 'square' | 'circle'
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  name: true,
  label: '',
  disabled: false,
  shape: 'square',
  customStyle: '',
  customClass: '',
})

const group = inject<{
  modelValue: { value: Array<string | number | boolean> }
  toggle: (name: string | number | boolean) => void
} | null>('rbCheckboxGroup', null)

const checked = computed(() => {
  if (!group) return false
  return group.modelValue.value.includes(props.name)
})

function onTap() {
  if (props.disabled || !group) return
  group.toggle(props.name)
}`,
      `  <view class="rb-checkbox" :class="[bem('rb-checkbox', checked && 'checked', disabled && 'disabled', shape), customClass]" :style="normalizeStyle(customStyle)" @click="onTap">
    <view class="rb-checkbox__icon">{{ checked ? '✓' : '' }}</view>
    <text class="rb-checkbox__label"><slot>{{ label }}</slot></text>
  </view>`,
      `.rb-checkbox { display: inline-flex; align-items: center; margin-right: 24rpx; }
.rb-checkbox__icon {
  width: 36rpx; height: 36rpx; border: 1px solid #c0c4cc; border-radius: 6rpx;
  display: flex; align-items: center; justify-content: center; font-size: 22rpx; color: #fff;
}
.rb-checkbox--circle .rb-checkbox__icon { border-radius: 50%; }
.rb-checkbox--checked .rb-checkbox__icon { background: #3c9cff; border-color: #3c9cff; }
.rb-checkbox--disabled { opacity: 0.5; }
.rb-checkbox__label { margin-left: 12rpx; font-size: 28rpx; color: #303133; }`,
    )
  },

  'checkbox-group'(name, pascal) {
    return vueShell(
      pascal,
      `import { provide, toRef } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: Array<string | number | boolean>
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: () => [],
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ 'update:modelValue': [v: Array<string | number | boolean>]; change: [v: Array<string | number | boolean>] }>()

function toggle(name: string | number | boolean) {
  const next = [...props.modelValue]
  const idx = next.indexOf(name)
  if (idx >= 0) next.splice(idx, 1)
  else next.push(name)
  emit('update:modelValue', next)
  emit('change', next)
}

provide('rbCheckboxGroup', { modelValue: toRef(props, 'modelValue'), toggle })`,
      `  <view class="rb-checkbox-group" :class="[bem('rb-checkbox-group'), customClass]" :style="normalizeStyle(customStyle)">
    <slot />
  </view>`,
    )
  },

  radio(name, pascal) {
    return vueShell(
      pascal,
      `import { inject, computed } from 'vue'
const props = withDefaults(defineProps<{
  name: string | number | boolean
  label?: string
  disabled?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), { label: '', disabled: false, customStyle: '', customClass: '' })

const group = inject<{ modelValue: { value: string | number | boolean }; select: (n: string | number | boolean) => void } | null>('rbRadioGroup', null)
const checked = computed(() => group?.modelValue.value === props.name)
function onTap() {
  if (props.disabled || !group) return
  group.select(props.name)
}`,
      `  <view class="rb-radio" :class="[bem('rb-radio', checked && 'checked', disabled && 'disabled'), customClass]" :style="normalizeStyle(customStyle)" @click="onTap">
    <view class="rb-radio__icon"><view v-if="checked" class="rb-radio__dot" /></view>
    <text class="rb-radio__label"><slot>{{ label }}</slot></text>
  </view>`,
      `.rb-radio { display: inline-flex; align-items: center; margin-right: 24rpx; }
.rb-radio__icon {
  width: 36rpx; height: 36rpx; border: 1px solid #c0c4cc; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.rb-radio--checked .rb-radio__icon { border-color: #3c9cff; }
.rb-radio__dot { width: 20rpx; height: 20rpx; border-radius: 50%; background: #3c9cff; }
.rb-radio--disabled { opacity: 0.5; }
.rb-radio__label { margin-left: 12rpx; font-size: 28rpx; }`,
    )
  },

  'radio-group'(name, pascal) {
    return vueShell(
      pascal,
      `import { provide, toRef } from 'vue'
const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), { modelValue: '', customStyle: '', customClass: '' })
const emit = defineEmits<{ 'update:modelValue': [v: string | number | boolean]; change: [v: string | number | boolean] }>()
function select(name: string | number | boolean) {
  emit('update:modelValue', name)
  emit('change', name)
}
provide('rbRadioGroup', { modelValue: toRef(props, 'modelValue'), select })`,
      `  <view class="rb-radio-group" :class="customClass" :style="normalizeStyle(customStyle)"><slot /></view>`,
    )
  },

  switch(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  modelValue?: boolean
  disabled?: boolean
  size?: number
  activeColor?: string
  inactiveColor?: string
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: false,
  disabled: false,
  size: 50,
  activeColor: '#3c9cff',
  inactiveColor: '#ffffff',
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ 'update:modelValue': [v: boolean]; change: [v: boolean] }>()
function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}`,
      `  <view
    class="rb-switch"
    :class="[bem('rb-switch', modelValue && 'on', disabled && 'disabled'), customClass]"
    :style="normalizeStyle({
      width: addUnit(size * 2),
      height: addUnit(size),
      backgroundColor: modelValue ? activeColor : '#e5e5e5',
      ...(typeof customStyle === 'object' ? customStyle : {}),
    })"
    @click="toggle"
  >
    <view class="rb-switch__node" :style="{ width: addUnit(size - 8), height: addUnit(size - 8), backgroundColor: inactiveColor }" />
  </view>`,
      `.rb-switch {
  display: inline-flex; align-items: center; border-radius: 999rpx; padding: 4rpx; box-sizing: border-box;
  transition: background-color 0.2s;
}
.rb-switch__node { border-radius: 50%; transition: transform 0.2s; box-shadow: 0 2rpx 6rpx rgba(0,0,0,.15); }
.rb-switch--on .rb-switch__node { transform: translateX(100%); }
.rb-switch--disabled { opacity: 0.5; }`,
    )
  },

  slider(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  activeColor?: string
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  activeColor: '#3c9cff',
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ 'update:modelValue': [v: number]; change: [v: number] }>()
function onChanging(e: { detail: { value: number } }) {
  emit('update:modelValue', e.detail.value)
}
function onChange(e: { detail: { value: number } }) {
  emit('update:modelValue', e.detail.value)
  emit('change', e.detail.value)
}`,
      `  <view class="rb-slider" :class="[bem('rb-slider'), customClass]" :style="normalizeStyle(customStyle)">
    <slider
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :activeColor="activeColor"
      :block-size="20"
      @changing="onChanging"
      @change="onChange"
    />
  </view>`,
    )
  },

  rate(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  modelValue?: number
  count?: number
  size?: number
  activeColor?: string
  inactiveColor?: string
  disabled?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: 0,
  count: 5,
  size: 40,
  activeColor: '#f9ae3d',
  inactiveColor: '#c0c4cc',
  disabled: false,
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ 'update:modelValue': [v: number]; change: [v: number] }>()
function select(i: number) {
  if (props.disabled) return
  emit('update:modelValue', i)
  emit('change', i)
}`,
      `  <view class="rb-rate" :class="[bem('rb-rate'), customClass]" :style="normalizeStyle(customStyle)">
    <text
      v-for="i in count"
      :key="i"
      class="rb-rate__item"
      :style="{ fontSize: addUnit(size), color: i <= modelValue ? activeColor : inactiveColor }"
      @click="select(i)"
    >★</text>
  </view>`,
      `.rb-rate { display: inline-flex; align-items: center; }
.rb-rate__item { margin-right: 8rpx; line-height: 1; }`,
    )
  },

  search(name, pascal) {
    return vueShell(
      pascal,
      `withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  showAction?: boolean
  actionText?: string
  disabled?: boolean
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: '',
  placeholder: '请输入搜索关键词',
  showAction: true,
  actionText: '搜索',
  disabled: false,
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{
  'update:modelValue': [v: string]
  search: [v: string]
  clear: []
  custom: [v: string]
}>()
function onInput(e: { detail: { value: string } }) {
  emit('update:modelValue', e.detail.value)
}`,
      `  <view class="rb-search" :class="[bem('rb-search'), customClass]" :style="normalizeStyle(customStyle)">
    <view class="rb-search__box">
      <text class="rb-search__icon">⌕</text>
      <input
        class="rb-search__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        confirm-type="search"
        @input="onInput"
        @confirm="emit('search', modelValue)"
      />
      <text v-if="modelValue" class="rb-search__clear" @click="emit('update:modelValue', ''); emit('clear')">×</text>
    </view>
    <text v-if="showAction" class="rb-search__action" @click="emit('custom', modelValue); emit('search', modelValue)">{{ actionText }}</text>
  </view>`,
      `.rb-search { display: flex; align-items: center; }
.rb-search__box {
  flex: 1; display: flex; align-items: center; height: 68rpx; padding: 0 20rpx;
  background: #f3f4f6; border-radius: 999rpx;
}
.rb-search__icon { margin-right: 12rpx; color: #909193; }
.rb-search__input { flex: 1; font-size: 28rpx; }
.rb-search__clear { color: #c0c4cc; padding: 0 8rpx; }
.rb-search__action { margin-left: 20rpx; color: #3c9cff; font-size: 28rpx; }`,
    )
  },

  'number-box'(name, pascal) {
    return vueShell(
      pascal,
      `const props = withDefaults(defineProps<{
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  inputWidth?: number
  buttonSize?: number
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  modelValue: 1,
  min: 1,
  max: 999,
  step: 1,
  disabled: false,
  inputWidth: 80,
  buttonSize: 56,
  customStyle: '',
  customClass: '',
})
const emit = defineEmits<{ 'update:modelValue': [v: number]; change: [v: number] }>()
function set(v: number) {
  const next = Math.min(props.max, Math.max(props.min, v))
  emit('update:modelValue', next)
  emit('change', next)
}`,
      `  <view class="rb-number-box" :class="[bem('rb-number-box'), customClass]" :style="normalizeStyle(customStyle)">
    <view class="rb-number-box__btn" :style="{ width: addUnit(buttonSize), height: addUnit(buttonSize) }" @click="!disabled && set(modelValue - step)">-</view>
    <input class="rb-number-box__input" type="number" :value="modelValue" :disabled="disabled" :style="{ width: addUnit(inputWidth) }" @blur="set(Number(($event as any).detail.value))" />
    <view class="rb-number-box__btn" :style="{ width: addUnit(buttonSize), height: addUnit(buttonSize) }" @click="!disabled && set(modelValue + step)">+</view>
  </view>`,
      `.rb-number-box { display: inline-flex; align-items: center; }
.rb-number-box__btn {
  display: flex; align-items: center; justify-content: center;
  background: #f3f4f6; border-radius: 8rpx; font-size: 32rpx; color: #303133;
}
.rb-number-box__input { margin: 0 8rpx; text-align: center; height: 56rpx; font-size: 28rpx; background: #f3f4f6; border-radius: 8rpx; }`,
    )
  },
}

/**
 * 占位生成器：组件已在磁盘落地，仅用于补缺失壳；勿覆盖手工深化后的实现。
 * 剩余 kind 统一走 genericShell，避免半成品 generators 误导。
 */
function genericShell(name, pascal) {
  return vueShell(
    pascal,
    `withDefaults(defineProps<{
  customStyle?: string | Record<string, string | number>
  customClass?: string
}>(), {
  customStyle: '',
  customClass: '',
})`,
    `  <view class="rb-${name}" :class="[bem('rb-${name}'), customClass]" :style="normalizeStyle(customStyle)">
    <slot />
  </view>`,
    `.rb-${name} { display: block; }`,
  )
}

function scssShell(name) {
  return `.rb-${name} {
  display: block;
}
`
}

function resolveArgs() {
  const args = process.argv.slice(2)
  return {
    force: args.includes('--force'),
    dryRun: args.includes('--dry-run'),
  }
}

function main() {
  const { force, dryRun } = resolveArgs()
  let created = 0
  let skipped = 0
  let missingGenerator = 0

  for (const item of catalog) {
    if (existing.has(item.name)) {
      skipped++
      continue
    }

    const pascal = toPascal(item.name)
    const vuePath = path.join(compRoot, item.name, `rb-${item.name}.vue`)
    const scssPath = path.join(styleRoot, `${item.name}.scss`)
    const gen = generators[item.kind]
    if (!gen) missingGenerator++

    const vueExists = fs.existsSync(vuePath)
    const scssExists = fs.existsSync(scssPath)

    // 默认只补「整组件缺失」；子项样式常合并在父 scss，不单独落盘
    if (!force && vueExists) {
      skipped++
      continue
    }

    const vueContent = gen ? gen(item.name, pascal) : genericShell(item.name, pascal)

    if (dryRun) {
      console.log(
        `[dry-run] write ${item.name} (${gen ? 'generator' : 'generic'})${vueExists ? ' [force overwrite]' : ''}`,
      )
      created++
      continue
    }

    write(vuePath, vueContent)
    if (force || !scssExists) write(scssPath, scssShell(item.name))
    created++
  }

  console.log(
    `[generate-components] catalog=${catalog.length}, generators=${Object.keys(generators).length}, created/updated=${created}, skipped=${skipped}, kindsWithoutDedicatedGenerator=${missingGenerator}`,
  )
  if (!force) {
    console.log('提示：默认不覆盖已有 vue；需要重建请加 --force（会覆盖手工实现）。')
  }
}

main()
