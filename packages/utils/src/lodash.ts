import type { DebouncedFunc } from 'lodash-es'
import { debounce as lodashDebounce, throttle as lodashThrottle } from 'lodash-es'

export const debounce: typeof lodashDebounce = lodashDebounce
export const throttle: typeof lodashThrottle = lodashThrottle

export type { DebouncedFunc }
