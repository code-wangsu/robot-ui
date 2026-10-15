import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import RbDatetimePicker from '../src/datetime-picker/rb-datetime-picker.vue'
import RbDatePicker from '../src/date-picker/rb-date-picker.vue'
import RbCard from '../src/card/rb-card.vue'
import RbPicker from '../src/picker/rb-picker.vue'
import RbCalendar from '../src/calendar/rb-calendar.vue'

describe('RbDatetimePicker time 弹窗', () => {
  it('mode=time 渲染示意图结构并可确认', async () => {
    const show = ref(true)
    const value = ref('01:00')
    const wrapper = mount(RbDatetimePicker, {
      props: {
        show: show.value,
        modelValue: value.value,
        mode: 'time',
        title: '选择时间',
        'onUpdate:show': (v: boolean) => {
          show.value = v
        },
        'onUpdate:modelValue': (v: string) => {
          value.value = v
        },
      },
      global: {
        stubs: {
          'scroll-view': { template: '<div class="scroll-view-stub"><slot /></div>' },
          'picker-view': true,
          'picker-view-column': true,
        },
      },
    })

    expect(wrapper.find('.rb-datetime-picker--dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('选择时间')
    expect(wrapper.text()).toContain('小时')
    expect(wrapper.text()).toContain('分钟')
    expect(wrapper.find('.rb-datetime-picker__summary-text').text()).toBe('01:00')

    const chips = wrapper.findAll('.rb-datetime-picker__chip')
    // 小时 02
    await chips[2]!.trigger('click')
    // 分钟列第 0 项仍是 00；找分钟 15 = hours(24)+15
    await chips[24 + 15]!.trigger('click')
    expect(wrapper.find('.rb-datetime-picker__summary-text').text()).toBe('02:15')

    await wrapper.find('.rb-datetime-picker__btn--confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]).toEqual(['02:15'])
    expect(value.value).toBe('02:15')
  })

  it('取消关闭弹窗', async () => {
    const show = ref(true)
    const wrapper = mount(RbDatetimePicker, {
      props: {
        show: true,
        mode: 'time',
        modelValue: '08:30',
        'onUpdate:show': (v: boolean) => {
          show.value = v
        },
      },
      global: {
        stubs: {
          'scroll-view': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.find('.rb-datetime-picker__btn--cancel').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(show.value).toBe(false)
  })
})

describe('RbPicker 下拉', () => {
  it('确认回传选中值', async () => {
    const wrapper = mount(RbPicker, {
      props: {
        show: true,
        title: '选择岗位',
        columns: [
          [
            { label: '拣货', value: '拣货' },
            { label: '上料', value: '上料' },
          ],
        ],
      },
      global: {
        stubs: {
          'picker-view': {
            template: '<div class="picker-view-stub"><slot /></div>',
          },
          'picker-view-column': {
            template: '<div><slot /></div>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('选择岗位')
    await wrapper.find('.rb-picker__confirm').trigger('click')
    expect(wrapper.emitted('confirm')?.[0]).toEqual([['拣货']])
  })
})

describe('RbCalendar', () => {
  it('选择日期并确认', async () => {
    const wrapper = mount(RbCalendar, {
      props: {
        modelValue: '',
        showConfirm: true,
      },
    })

    expect(wrapper.find('.rb-calendar').exists()).toBe(true)
    const day = wrapper.find('.rb-calendar-body__day')
    if (day.exists()) {
      await day.trigger('click')
      await nextTick()
    }
    await wrapper.find('.rb-calendar__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })
})

describe('RbCard', () => {
  it('渲染成功主题头与正文', () => {
    const wrapper = mount(RbCard, {
      props: {
        title: '直接审核记录',
        extra: '2026-05-18 09:20:00',
        type: 'success',
      },
      slots: {
        default: '<view>审核人: 厂长</view>',
      },
    })

    expect(wrapper.find('.rb-card__header--success').exists()).toBe(true)
    expect(wrapper.text()).toContain('直接审核记录')
    expect(wrapper.text()).toContain('2026-05-18 09:20:00')
    expect(wrapper.text()).toContain('审核人: 厂长')
  })
})

describe('RbDatePicker', () => {
  it('type=datetime 打开合一面板', async () => {
    const value = ref('')
    const wrapper = mount(RbDatePicker, {
      props: {
        modelValue: value.value,
        type: 'datetime',
        'onUpdate:modelValue': (v: string) => {
          value.value = v
        },
      },
      global: {
        stubs: {
          RbPopup: {
            props: ['show'],
            template: '<div v-if="show" class="popup-stub"><slot /></div>',
          },
          RbDatetimePanel: {
            template:
              '<div class="panel-stub"><view class="confirm" @click="$emit(\'confirm\', \'2026-07-22 17:43\')">确认</view></div>',
          },
          RbDatetimePicker: true,
          RbCalendar: true,
        },
      },
    })

    await wrapper.find('.rb-date-picker').trigger('click')
    await nextTick()
    expect(wrapper.find('.popup-stub').exists()).toBe(true)
    expect(wrapper.find('.panel-stub').exists()).toBe(true)
    await wrapper.find('.confirm').trigger('click')
    expect(value.value).toBe('2026-07-22 17:43')
  })

  it('type=time 打开时间弹窗', async () => {
    const wrapper = mount(RbDatePicker, {
      props: { type: 'time', modelValue: '' },
      global: {
        stubs: {
          RbPopup: true,
          RbDatetimePanel: true,
          RbDatetimePicker: {
            props: ['show', 'modelValue', 'mode'],
            emits: ['update:show', 'confirm'],
            template:
              '<div v-if="show" class="time-stub" @click="$emit(\'confirm\', \'09:30\')">time</div>',
          },
        },
      },
    })

    await wrapper.find('.rb-date-picker').trigger('click')
    await nextTick()
    expect(wrapper.find('.time-stub').exists()).toBe(true)
  })
})
