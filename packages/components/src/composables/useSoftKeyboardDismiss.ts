import { nextTick } from 'vue'

/**
 * 软键盘空白处关闭：维护当前打开的自定义键盘实例，并兼容系统键盘收起。
 * 从 management/composables/useSoftKeyboardDismiss 迁入，行为保持一致。
 */

let activeDismiss: (() => void) | null = null

/** 注册软键盘关闭回调（打开键盘时调用） */
export function registerSoftKeyboardDismiss(dismiss: () => void) {
  if (activeDismiss && activeDismiss !== dismiss) {
    activeDismiss()
  }
  activeDismiss = dismiss
}

/** 注销软键盘关闭回调（关闭或卸载时调用） */
export function unregisterSoftKeyboardDismiss(dismiss: () => void) {
  if (activeDismiss === dismiss) {
    activeDismiss = null
  }
}

/** 点击页面空白区域时关闭当前软键盘 */
export function dismissActiveSoftKeyboard() {
  activeDismiss?.()
  if (typeof uni !== 'undefined') {
    uni.hideKeyboard?.()
  }
}

/** 提交前结束输入并等待 v-model 回写 */
export async function flushActiveFormInput() {
  dismissActiveSoftKeyboard()
  await nextTick()
}
