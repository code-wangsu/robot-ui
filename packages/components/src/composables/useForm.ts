import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'

export interface FormRule {
  required?: boolean
  message?: string
  /** 自定义校验，返回 true 通过；返回 string 作为错误文案 */
  validator?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export interface FormItemExpose {
  prop: string
  validate: () => Promise<boolean>
  resetValidation: () => void
}

export interface FormContext {
  model: Ref<Record<string, unknown>>
  rules: Ref<Record<string, FormRule[]>>
  labelWidth: Ref<string | number>
  labelPosition: Ref<'left' | 'top'>
  registerItem: (item: FormItemExpose) => void
  unregisterItem: (prop: string) => void
}

export const FORM_INJECT_KEY: InjectionKey<FormContext> = Symbol('rb-form')

/** 判断表单值是否为空（含空数组 / 纯空白字符串） */
export function isEmptyValue(value: unknown): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'boolean') return false
  if (typeof value === 'number') return Number.isNaN(value)
  return false
}

export async function runFormRules(
  value: unknown,
  rules: FormRule[],
): Promise<{ valid: boolean; message: string }> {
  for (const rule of rules) {
    if (rule.required && isEmptyValue(value)) {
      return { valid: false, message: rule.message ?? '请填写此项' }
    }
    if (rule.validator) {
      const result = await rule.validator(value)
      if (result !== true) {
        return {
          valid: false,
          message: typeof result === 'string' ? result : (rule.message ?? '校验失败'),
        }
      }
    }
  }
  return { valid: true, message: '' }
}

export function provideForm(context: FormContext) {
  provide(FORM_INJECT_KEY, context)
}

export function useFormInject() {
  return inject(FORM_INJECT_KEY, null)
}

export function useFormItemState() {
  const message = ref('')
  const showError = ref(false)
  return { message, showError }
}
