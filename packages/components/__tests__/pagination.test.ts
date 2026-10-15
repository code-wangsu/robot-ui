import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import RbPagination from '../src/pagination/rb-pagination.vue'

beforeEach(() => {
  ;(globalThis as any).uni = {
    showActionSheet: vi.fn(),
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RbPagination', () => {
  it('渲染总数与页码，点击切换 current-page', async () => {
    const page = ref(1)
    const wrapper = mount(RbPagination, {
      props: {
        total: 100,
        pageSize: 10,
        currentPage: page.value,
        layout: 'total, prev, pager, next',
        'onUpdate:currentPage': (v: number) => {
          page.value = v
          wrapper.setProps({ currentPage: v })
        },
      },
    })

    expect(wrapper.text()).toContain('共 100 条')
    expect(wrapper.find('.rb-pagination__number.is-active').text()).toBe('1')

    const numbers = wrapper.findAll('.rb-pagination__number')
    const page2 = numbers.find((n) => n.text() === '2')
    await page2!.trigger('click')
    await nextTick()
    expect(page.value).toBe(2)
  })

  it('上一页在首页禁用，下一页可点', async () => {
    const page = ref(1)
    const wrapper = mount(RbPagination, {
      props: {
        total: 30,
        pageSize: 10,
        currentPage: page.value,
        'onUpdate:currentPage': (v: number) => {
          page.value = v
          wrapper.setProps({ currentPage: v })
        },
      },
    })

    expect(wrapper.find('.rb-pagination__btn--prev').classes()).toContain('is-disabled')
    await wrapper.find('.rb-pagination__btn--next').trigger('click')
    expect(page.value).toBe(2)
  })

  it('hideOnSinglePage 仅一页时隐藏', () => {
    const wrapper = mount(RbPagination, {
      props: {
        total: 5,
        pageSize: 10,
        hideOnSinglePage: true,
      },
    })
    expect(wrapper.find('.rb-pagination').exists()).toBe(false)
  })

  it('background / small 修饰类生效', () => {
    const wrapper = mount(RbPagination, {
      props: {
        total: 50,
        background: true,
        size: 'small',
      },
    })
    expect(wrapper.classes().join(' ')).toContain('rb-pagination--background')
    expect(wrapper.classes().join(' ')).toContain('rb-pagination--small')
  })
})
