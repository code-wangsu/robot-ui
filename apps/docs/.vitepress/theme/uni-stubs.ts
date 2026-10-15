import {
  Comment,
  Fragment,
  Text,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  watch,
  type PropType,
} from 'vue'

/** 将 uni-app 基础标签映射为 Web 标签，便于 VitePress 预览 */
function createTag(tag: string, name: string) {
  return defineComponent({
    name,
    inheritAttrs: true,
    setup(_, { attrs, slots }) {
      return () => h(tag, attrs, slots.default?.())
    },
  })
}

export const UniView = createTag('div', 'View')
export const UniText = createTag('span', 'Text')
export const UniImage = defineComponent({
  name: 'Image',
  props: {
    src: { type: String, default: '' },
    mode: { type: String, default: '' },
  },
  setup(props, { attrs }) {
    return () =>
      h('img', {
        ...attrs,
        src: props.src,
        style: {
          display: 'block',
          maxWidth: '100%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...(typeof attrs.style === 'object' ? attrs.style : {}),
        },
      })
  },
})

export const UniScrollView = defineComponent({
  name: 'ScrollView',
  props: {
    scrollY: { type: [Boolean, String] as PropType<boolean | string>, default: false },
    scrollX: { type: [Boolean, String] as PropType<boolean | string>, default: false },
    scrollLeft: { type: [Number, String] as PropType<number | string>, default: 0 },
    showScrollbar: { type: [Boolean, String] as PropType<boolean | string>, default: true },
  },
  emits: ['scroll'],
  setup(props, { attrs, slots, emit }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          style: {
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            ...(typeof attrs.style === 'object' ? attrs.style : {}),
          },
          onScroll: (e: Event) => {
            const t = e.target as HTMLElement
            emit('scroll', {
              detail: {
                scrollLeft: t.scrollLeft,
                scrollTop: t.scrollTop,
                scrollWidth: t.scrollWidth,
                scrollHeight: t.scrollHeight,
              },
            })
          },
        },
        slots.default?.(),
      )
  },
})

export const UniInput = defineComponent({
  name: 'Input',
  props: {
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'input', 'confirm'],
  setup(props, { emit, attrs }) {
    return () =>
      h('input', {
        ...attrs,
        value: props.modelValue,
        placeholder: props.placeholder,
        type: props.type === 'number' ? 'number' : 'text',
        disabled: props.disabled,
        onInput: (e: Event) => {
          const value = (e.target as HTMLInputElement).value
          emit('update:modelValue', value)
          emit('input', { detail: { value } })
        },
        onKeydown: (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            emit('confirm', { detail: { value: props.modelValue } })
          }
        },
      })
  },
})

export const UniTextarea = defineComponent({
  name: 'Textarea',
  props: {
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit, attrs }) {
    return () =>
      h('textarea', {
        ...attrs,
        value: props.modelValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        onInput: (e: Event) => {
          const value = (e.target as HTMLTextAreaElement).value
          emit('update:modelValue', value)
          emit('input', { detail: { value } })
        },
      })
  },
})

/** uni-app slider → HTML range */
export const UniSlider = defineComponent({
  name: 'Slider',
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    activeColor: { type: String, default: '' },
    backgroundColor: { type: String, default: '' },
    blockSize: { type: Number, default: 28 },
  },
  emits: ['changing', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h('input', {
        ...attrs,
        type: 'range',
        value: props.value,
        min: props.min,
        max: props.max,
        step: props.step,
        disabled: props.disabled,
        style: {
          width: '100%',
          accentColor: props.activeColor || 'var(--rb-color-primary, #3c9cff)',
          ...(typeof attrs.style === 'object' ? attrs.style : {}),
        },
        onInput: (e: Event) => {
          const value = Number((e.target as HTMLInputElement).value)
          emit('changing', { detail: { value } })
        },
        onChange: (e: Event) => {
          const value = Number((e.target as HTMLInputElement).value)
          emit('change', { detail: { value } })
        },
      })
  },
})

/** uni-app video → HTML video */
export const UniVideo = defineComponent({
  name: 'Video',
  props: {
    src: { type: String, default: '' },
    poster: { type: String, default: '' },
    controls: { type: [Boolean, String], default: true },
    autoplay: { type: [Boolean, String], default: false },
    loop: { type: [Boolean, String], default: false },
    muted: { type: [Boolean, String], default: false },
    objectFit: { type: String, default: 'contain' },
  },
  setup(props, { attrs }) {
    return () =>
      h('video', {
        ...attrs,
        src: props.src,
        poster: props.poster,
        controls: props.controls !== false && props.controls !== 'false',
        autoplay: Boolean(props.autoplay && props.autoplay !== 'false'),
        loop: Boolean(props.loop && props.loop !== 'false'),
        muted: Boolean(props.muted && props.muted !== 'false'),
        style: {
          width: '100%',
          height: '100%',
          objectFit: props.objectFit || 'contain',
          background: '#000',
          ...(typeof attrs.style === 'object' ? attrs.style : {}),
        },
      })
  },
})

type PickerViewContext = {
  value: { value: number[] }
  itemHeight: number
  registerColumn: () => number
  setColumnIndex: (column: number, index: number) => void
}

const PICKER_VIEW_KEY = Symbol('uni-picker-view')

function parseIndicatorHeight(indicatorStyle: string): number {
  const match = String(indicatorStyle || '').match(/height:\s*([\d.]+)\s*(rpx|px)?/i)
  if (!match) return 36
  const num = Number(match[1])
  if (Number.isNaN(num)) return 36
  return match[2] === 'rpx' ? num / 2 : num
}

function flattenVNodes(nodes: unknown[]): any[] {
  const out: any[] = []
  for (const node of nodes || []) {
    if (node == null || typeof node === 'boolean') continue
    if (Array.isArray(node)) {
      out.push(...flattenVNodes(node))
      continue
    }
    if (typeof node !== 'object') continue
    const vnode = node as any
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      out.push(...flattenVNodes(vnode.children))
      continue
    }
    // skip pure comment / text-only wrappers without type component/element
    if (vnode.type === Comment || vnode.type === Text) continue
    out.push(vnode)
  }
  return out
}

function vnodeLabel(node: any): string {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (typeof node !== 'object') return ''
  const children = node.children
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(vnodeLabel).join('')
  if (children && typeof children === 'object' && typeof children.default === 'function') {
    return flattenVNodes(children.default()).map(vnodeLabel).join('')
  }
  return ''
}

/** uni-app picker-view → Web 滚轮（文档站预览） */
export const UniPickerView = defineComponent({
  name: 'PickerView',
  props: {
    value: { type: Array as PropType<number[]>, default: () => [] },
    indicatorStyle: { type: String, default: '' },
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    const indexes = ref<number[]>([...(props.value || [])])
    let columnCount = 0
    const itemHeight = parseIndicatorHeight(props.indicatorStyle)

    watch(
      () => props.value,
      (val) => {
        indexes.value = [...(val || [])]
      },
      { deep: true },
    )

    const ctx: PickerViewContext = {
      value: indexes,
      itemHeight,
      registerColumn() {
        const col = columnCount
        columnCount += 1
        if (indexes.value[col] == null) {
          indexes.value = [...indexes.value, 0]
        }
        return col
      },
      setColumnIndex(column, index) {
        if (indexes.value[column] === index) return
        const next = [...indexes.value]
        while (next.length <= column) next.push(0)
        next[column] = Math.max(0, index)
        indexes.value = next
        emit('change', { detail: { value: next } })
      },
    }

    provide(PICKER_VIEW_KEY, ctx)

    return () =>
      h(
        'div',
        {
          ...attrs,
          class: ['uni-picker-view-stub', attrs.class],
          style: {
            position: 'relative',
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'minmax(0, 1fr)',
            alignItems: 'stretch',
            width: '100%',
            height: '220px',
            maxHeight: '220px',
            overflow: 'hidden',
            background: '#fafbfc',
            borderRadius: '8px',
            ...(typeof attrs.style === 'object' && attrs.style ? attrs.style : {}),
          },
        },
        [
          h('div', {
            class: 'uni-picker-view-stub__indicator',
            style: {
              position: 'absolute',
              left: '8px',
              right: '8px',
              top: '50%',
              height: `${itemHeight}px`,
              marginTop: `${-itemHeight / 2}px`,
              pointerEvents: 'none',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '6px',
              background: 'rgba(60, 156, 255, 0.06)',
              zIndex: 1,
            },
          }),
          slots.default?.(),
        ],
      )
  },
})

export const UniPickerViewColumn = defineComponent({
  name: 'PickerViewColumn',
  setup(_, { slots }) {
    const parent = inject<PickerViewContext | null>(PICKER_VIEW_KEY, null)
    const columnIndex = parent?.registerColumn() ?? 0
    const itemHeight = parent?.itemHeight ?? 36

    return () => {
      const items = flattenVNodes(slots.default?.() ?? [])
      const selected = parent?.value.value[columnIndex] ?? 0

      // 用原生 select 保证文档站布局稳定（避免 Fragment/传送门导致横排挤在一起）
      return h(
        'select',
        {
          class: 'uni-picker-view-column-stub',
          size: Math.max(3, Math.min(7, Math.floor(220 / itemHeight))),
          value: String(selected),
          style: {
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            minWidth: 0,
            margin: 0,
            padding: `${itemHeight}px 0`,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: '#303133',
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: `${itemHeight}px`,
            textAlign: 'center',
            appearance: 'none',
            WebkitAppearance: 'none',
            overflow: 'auto',
            cursor: 'pointer',
          },
          onChange: (event: Event) => {
            const index = Number((event.target as HTMLSelectElement).value)
            parent?.setColumnIndex(columnIndex, index)
          },
        },
        items.map((item, index) =>
          h(
            'option',
            {
              key: index,
              value: String(index),
              selected: index === selected,
              style: {
                height: `${itemHeight}px`,
                lineHeight: `${itemHeight}px`,
                textAlign: 'center',
              },
            },
            vnodeLabel(item) || String(index).padStart(2, '0'),
          ),
        ),
      )
    }
  },
})

export function installUniStubs(app: { component: (name: string, comp: unknown) => void }) {
  app.component('view', UniView)
  app.component('View', UniView)
  app.component('text', UniText)
  app.component('Text', UniText)
  app.component('image', UniImage)
  app.component('Image', UniImage)
  app.component('scroll-view', UniScrollView)
  app.component('ScrollView', UniScrollView)
  app.component('input', UniInput)
  app.component('Input', UniInput)
  app.component('textarea', UniTextarea)
  app.component('Textarea', UniTextarea)
  app.component('slider', UniSlider)
  app.component('Slider', UniSlider)
  app.component('video', UniVideo)
  app.component('Video', UniVideo)
  app.component('picker-view', UniPickerView)
  app.component('PickerView', UniPickerView)
  app.component('picker-view-column', UniPickerViewColumn)
  app.component('PickerViewColumn', UniPickerViewColumn)
}

export function ensureUniGlobal() {
  if (typeof globalThis === 'undefined') return
  const g = globalThis as any
  if (g.uni) return
  g.uni = {
    showToast: (opts: { title?: string; message?: string } = {}) => {
      if (typeof window !== 'undefined') {
        console.info('[uni.showToast]', opts.title || opts.message || opts)
      }
    },
    hideToast: () => undefined,
    hideKeyboard: () => undefined,
    navigateBack: () => undefined,
    navigateTo: () => undefined,
    upx2px: (n: number) => n / 2,
    getSystemInfoSync: () => ({
      windowWidth: 375,
      windowHeight: 667,
      screenWidth: 375,
      screenHeight: 667,
      platform: 'devtools',
    }),
    createSelectorQuery: () => {
      const api: any = {
        _cb: null as null | ((rects: unknown[]) => void),
        in() {
          return api
        },
        select() {
          return api
        },
        selectAll() {
          return api
        },
        boundingClientRect(cb?: (rect: unknown) => void) {
          if (cb) api._cb = () => cb({ width: 0, height: 0, left: 0, top: 0 })
          return api
        },
        exec(cb?: (rects: unknown[]) => void) {
          const result = [{ width: 0, height: 0, left: 0, top: 0 }]
          api._cb?.(result)
          cb?.(result)
        },
      }
      return api
    },
    createVideoContext: () => ({
      play() {},
      pause() {},
      stop() {},
      seek() {},
      requestFullScreen() {},
      exitFullScreen() {},
    }),
    previewImage: () => undefined,
  }
}
