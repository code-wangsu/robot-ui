import type { InjectionKey, Ref } from 'vue'

export const ROW_GUTTER_KEY: InjectionKey<Ref<string | number>> = Symbol('rb-row-gutter')
