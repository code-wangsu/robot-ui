import { inject, provide, type InjectionKey, type Ref } from 'vue'

export interface CheckboxGroupContext {
  modelValue: Ref<unknown[]>
  disabled: Ref<boolean>
  toggle: (value: unknown) => void
  isChecked: (value: unknown) => boolean
}

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupContext> = Symbol('rb-checkbox-group')

export function provideCheckboxGroup(context: CheckboxGroupContext) {
  provide(CHECKBOX_GROUP_KEY, context)
}

export function useCheckboxGroupInject() {
  return inject(CHECKBOX_GROUP_KEY, null)
}
