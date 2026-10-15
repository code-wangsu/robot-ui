import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RbColor from '../src/color/rb-color.vue'
import RbLayout from '../src/layout/rb-layout.vue'
import RbLink from '../src/link/rb-link.vue'
import RbText from '../src/text/rb-text.vue'
import RbScroll from '../src/scroll/rb-scroll.vue'
import RbRow from '../src/row/rb-row.vue'
import RbCol from '../src/col/rb-col.vue'

vi.mock('../src/toast/toast', () => ({
  showToast: vi.fn(),
}))

describe('RbColor', () => {
  it('渲染色块与色值', () => {
    const wrapper = mount(RbColor, {
      props: { color: '#3c9cff', label: 'Primary', copyable: false },
    })
    expect(wrapper.text()).toContain('Primary')
    expect(wrapper.text()).toContain('#3c9cff')
    const style = wrapper.find('.rb-color__swatch').attributes('style') || ''
    expect(style.includes('#3c9cff') || style.includes('rgb(60, 156, 255)')).toBe(true)
  })
})

describe('RbLayout', () => {
  it('渲染 header / main / footer 插槽', () => {
    const wrapper = mount(RbLayout, {
      props: { direction: 'vertical', height: '400rpx' },
      slots: {
        header: '<view class="h">header</view>',
        default: '<view class="m">main</view>',
        footer: '<view class="f">footer</view>',
      },
    })
    expect(wrapper.find('.rb-layout--vertical').exists()).toBe(true)
    expect(wrapper.text()).toContain('header')
    expect(wrapper.text()).toContain('main')
    expect(wrapper.text()).toContain('footer')
  })
})

describe('RbLink', () => {
  it('点击触发 click，禁用不触发', async () => {
    const wrapper = mount(RbLink, {
      props: { text: '文档', type: 'primary', underline: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()

    const disabled = mount(RbLink, {
      props: { text: '禁用', disabled: true },
    })
    await disabled.trigger('click')
    expect(disabled.emitted('click')).toBeFalsy()
  })
})

describe('RbText', () => {
  it('支持 truncated 与类型色', () => {
    const wrapper = mount(RbText, {
      props: {
        text: '很长的一段文案用来测试省略',
        type: 'primary',
        truncated: true,
      },
    })
    expect(wrapper.classes()).toContain('rb-text--primary')
    expect(wrapper.classes()).toContain('rb-text--truncated')
    expect(wrapper.text()).toContain('很长的一段文案')
  })
})

describe('RbScroll', () => {
  it('透传纵向滚动属性', () => {
    const wrapper = mount(RbScroll, {
      props: { scrollY: true, height: 320 },
      slots: { default: '<view>item</view>' },
      global: {
        stubs: {
          'scroll-view': {
            template: '<div class="scroll-stub"><slot /></div>',
            props: ['scrollY', 'scrollX', 'style'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('item')
    expect(wrapper.find('.scroll-stub').exists()).toBe(true)
  })
})

describe('RbRow / RbCol Layout 栅格', () => {
  it('按 span 计算宽度', () => {
    const wrapper = mount(RbRow, {
      props: { gutter: 16 },
      slots: {
        default: {
          components: { RbCol },
          template: `
            <rb-col :span="12"><view>A</view></rb-col>
            <rb-col :span="12"><view>B</view></rb-col>
          `,
        },
      },
      global: { components: { RbCol } },
    })
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')
    const col = wrapper.findComponent(RbCol)
    expect(col.classes().join(' ')).toContain('rb-col--span-12')
  })
})
