import { isEmpty as lodashIsEmpty, isNil } from 'lodash-es'

export function isDef<T>(value: T): value is NonNullable<T> {
  return !isNil(value)
}

export function isEmptyValue(value: unknown): boolean {
  if (isNil(value)) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim() === ''
  }
  return lodashIsEmpty(value)
}

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof (value as Promise<T>).then === 'function'
  )
}
