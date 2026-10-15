import { inject, provide, type InjectionKey, type Ref } from 'vue'

export interface RadioGroupContext {
  modelValue: Ref<unknown>
  disabled: Ref<boolean>
  select: (value: unknown) => void
  isSelected: (value: unknown) => boolean
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol('rb-radio-group')

export function provideRadioGroup(context: RadioGroupContext) {
  provide(RADIO_GROUP_KEY, context)
}

export function useRadioGroupInject() {
  return inject(RADIO_GROUP_KEY, null)
}
