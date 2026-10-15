import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import RbLoadmore from '../src/loadmore/rb-loadmore.vue'
import RbButton from '../src/button/rb-button.vue'
import RbInput from '../src/input/rb-input.vue'
import RbToast from '../src/toast/rb-toast.vue'
import RbTooltip from '../src/tooltip/rb-tooltip.vue'
import RbBackTop from '../src/back-top/rb-back-top.vue'
import RbAvatarGroup from '../src/avatar-group/rb-avatar-group.vue'
import RbAppTag from '../src/app-tag/rb-app-tag.vue'
import RbTag from '../src/tag/rb-tag.vue'
import RbSystemKeyboardInput from '../src/system-keyboard-input/rb-system-keyboard-input.vue'
import RbMultiSelect from '../src/multi-select/rb-multi-select.vue'
import { hideToast, showToast } from '../src/toast/toast'

describe('rb-loadmore', () => {
  it('loadmore 状态下点击触发事件', async () => {
    const wrapper = mount(RbLoadmore, {
      props: { status: 'loadmore' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('loadmore')).toBeTruthy()
  })

  it('loading 状态不触发 loadmore', async () => {
    const wrapper = mount(RbLoadmore, {
      props: { status: 'loading' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('loadmore')).toBeFalsy()
  })
})

describe('rb-button', () => {
  it('disabled 时不触发 click', async () => {
    const wrapper = mount(RbButton, {
      props: { text: '确定', disabled: true },
      global: {
        stubs: {
          RbLoading: true,
        },
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})

describe('rb-input', () => {
  it('输入时同步 v-model', async () => {
    const wrapper = mount(RbInput, {
      props: { modelValue: '' },
    })
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('clearable 清空', async () => {
    const wrapper = mount(RbInput, {
      props: { modelValue: 'x', clearable: true },
    })
    await wrapper.find('.rb-input__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})

describe('rb-toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    hideToast()
  })

  afterEach(() => {
    hideToast()
    vi.useRealTimers()
  })

  it('声明式模式消费 duration 自动关闭', async () => {
    const wrapper = mount(RbToast, {
      props: { show: true, message: 'hi', duration: 1000 },
      global: { stubs: { RbTransition: false } },
    })
    expect(wrapper.text()).toContain('hi')
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
  })

  it('命令式 showToast 驱动全局 Toast', async () => {
    const wrapper = mount(RbToast, {
      props: { global: true },
      global: { stubs: { RbTransition: false } },
    })
    showToast({ message: 'saved', duration: 2000 })
    await nextTick()
    expect(wrapper.text()).toContain('saved')
    vi.advanceTimersByTime(2000)
    await nextTick()
    // 等待 slide-left 离场动画卸载
    vi.advanceTimersByTime(320)
    await nextTick()
    expect(wrapper.text()).not.toContain('saved')
  })
})

describe('rb-tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('click 触发显示，hideDelay 后可关闭', async () => {
    const wrapper = mount(RbTooltip, {
      props: { text: '提示', trigger: 'click', showDelay: 0, hideDelay: 0 },
      slots: { default: '<text>锚点</text>' },
    })
    expect(wrapper.find('.rb-tooltip__popper').exists()).toBe(false)
    await wrapper.trigger('click')
    expect(wrapper.find('.rb-tooltip__popper').exists()).toBe(true)
    expect(wrapper.text()).toContain('提示')
    await wrapper.trigger('click')
    expect(wrapper.find('.rb-tooltip__popper').exists()).toBe(false)
  })

  it('showDelay 延迟显示', async () => {
    const wrapper = mount(RbTooltip, {
      props: { text: '延迟', trigger: 'click', showDelay: 200, hideDelay: 0 },
      slots: { default: '锚点' },
    })
    await wrapper.trigger('click')
    expect(wrapper.find('.rb-tooltip__popper').exists()).toBe(false)
    vi.advanceTimersByTime(200)
    await nextTick()
    expect(wrapper.find('.rb-tooltip__popper').exists()).toBe(true)
  })
})

describe('rb-back-top', () => {
  it('scrollTop 超过阈值后显示', async () => {
    const wrapper = mount(RbBackTop, {
      props: { scrollTop: 0, top: '100px' },
    })
    expect(wrapper.find('.rb-back-top').exists()).toBe(false)
    await wrapper.setProps({ scrollTop: 120 })
    expect(wrapper.find('.rb-back-top').exists()).toBe(true)
  })
})

describe('rb-avatar-group', () => {
  it('urls 超出 max 显示剩余数', () => {
    const wrapper = mount(RbAvatarGroup, {
      props: {
        urls: ['a', 'b', 'c', 'd'],
        max: 2,
      },
    })
    expect(wrapper.findAll('.rb-avatar-group__item')).toHaveLength(2)
    expect(wrapper.find('.rb-avatar-group__more').text()).toBe('+2')
  })
})

describe('rb-tag', () => {
  it('支持 Element Plus effect/type', () => {
    const wrapper = mount(RbTag, {
      props: { text: '进行中', type: 'primary', effect: 'dark', size: 'small' },
    })
    expect(wrapper.classes()).toContain('rb-tag--primary')
    expect(wrapper.classes()).toContain('rb-tag--dark')
    expect(wrapper.classes()).toContain('rb-tag--small')
    expect(wrapper.text()).toContain('进行中')
  })

  it('closable 触发 close', async () => {
    const wrapper = mount(RbTag, {
      props: { text: '可关闭', type: 'info', effect: 'plain', closable: true },
    })
    await wrapper.find('.rb-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

describe('rb-app-tag', () => {
  it('旧 API 映射到 Tag', () => {
    const wrapper = mount(RbAppTag, {
      props: { text: '进行中', type: 'blue', variant: 'soft', size: 'sm' },
    })
    expect(wrapper.text()).toContain('进行中')
    expect(wrapper.find('.rb-tag--primary').exists()).toBe(true)
    expect(wrapper.find('.rb-tag--light').exists()).toBe(true)
  })
})

describe('rb-system-keyboard-input', () => {
  it('输入同步 v-model', async () => {
    const wrapper = mount(RbSystemKeyboardInput, {
      props: { modelValue: '' },
    })
    await wrapper.find('input').trigger('input', { detail: { value: 'abc' } })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['abc'])
  })
})

describe('rb-multi-select', () => {
  it('确认时回写选中值', async () => {
    const wrapper = mount(RbMultiSelect, {
      props: {
        show: true,
        options: ['A', 'B', 'C'],
        modelValue: [],
        maxCollapseCount: 2,
      },
      global: {
        stubs: {
          RbPopup: {
            template: '<div><slot /></div>',
            props: ['show'],
          },
          RbEmpty: true,
        },
      },
    })
    await wrapper.findAll('.rb-multi-select__option')[0]!.trigger('click')
    await wrapper.find('.rb-multi-select__btn--confirm').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['A']])
    expect(wrapper.emitted('confirm')?.[0]).toEqual([['A']])
  })
})
