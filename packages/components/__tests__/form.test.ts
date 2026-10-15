import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'
import { isEmptyValue, runFormRules } from '../src/composables/useForm'
import RbForm from '../src/form/rb-form.vue'
import RbFormItem from '../src/form-item/rb-form-item.vue'
import RbInput from '../src/input/rb-input.vue'
import RbSwitch from '../src/switch/rb-switch.vue'

describe('useForm helpers', () => {
  it('isEmptyValue 识别空值', () => {
    expect(isEmptyValue('')).toBe(true)
    expect(isEmptyValue('  ')).toBe(true)
    expect(isEmptyValue([])).toBe(true)
    expect(isEmptyValue(undefined)).toBe(true)
    expect(isEmptyValue(0)).toBe(false)
    expect(isEmptyValue(false)).toBe(false)
    expect(isEmptyValue('ok')).toBe(false)
  })

  it('runFormRules 支持 required 与自定义 validator', async () => {
    const required = await runFormRules('', [{ required: true, message: '必填' }])
    expect(required).toEqual({ valid: false, message: '必填' })

    const custom = await runFormRules('ab', [
      {
        validator: (v) => (String(v).length >= 3 ? true : '至少 3 位'),
      },
    ])
    expect(custom).toEqual({ valid: false, message: '至少 3 位' })

    const ok = await runFormRules('abc', [
      { required: true },
      { validator: (v) => String(v).length >= 3 },
    ])
    expect(ok.valid).toBe(true)
  })
})

describe('RbForm 校验链路', () => {
  it('必填失败后填写可通过', async () => {
    const model = reactive({ name: '' })
    const wrapper = mount(RbForm, {
      props: {
        model,
        rules: { name: [{ required: true, message: '请输入姓名' }] },
      },
      slots: {
        default: {
          components: { RbFormItem, RbInput },
          template: `
            <rb-form-item prop="name" label="姓名">
              <rb-input v-model="model.name" />
            </rb-form-item>
          `,
          setup() {
            return { model }
          },
        },
      },
      global: {
        components: { RbFormItem, RbInput },
      },
    })

    await nextTick()
    const form = wrapper.vm as unknown as {
      validate: () => Promise<boolean>
      resetValidation: () => void
    }

    expect(await form.validate()).toBe(false)
    expect(wrapper.text()).toContain('请输入姓名')

    model.name = 'robot'
    await nextTick()
    expect(await form.validate()).toBe(true)

    form.resetValidation()
    expect(wrapper.find('.rb-form-item__message').exists()).toBe(false)
  })

  it('switch 布尔值可参与必填校验', async () => {
    const model = reactive({ agree: false })
    const wrapper = mount(RbForm, {
      props: {
        model,
        rules: {
          agree: [
            {
              validator: (v) => (v === true ? true : '请同意协议'),
            },
          ],
        },
      },
      slots: {
        default: {
          components: { RbFormItem, RbSwitch },
          template: `
            <rb-form-item prop="agree" label="协议">
              <rb-switch v-model="model.agree" />
            </rb-form-item>
          `,
          setup() {
            return { model }
          },
        },
      },
      global: {
        components: { RbFormItem, RbSwitch },
      },
    })

    await nextTick()
    const form = wrapper.vm as unknown as { validate: () => Promise<boolean> }
    expect(await form.validate()).toBe(false)

    model.agree = true
    await nextTick()
    expect(await form.validate()).toBe(true)
  })
})
