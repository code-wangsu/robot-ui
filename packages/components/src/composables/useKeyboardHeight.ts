import { getCurrentInstance, onMounted, type EmitFn } from 'vue'

/**
 * 软键盘挂载后测量高度。
 * 从 management/composables/useKeyboardHeight 迁入。
 */
export function useKeyboardHeight(
  emit: EmitFn<{ getHeight: [height: number] }>,
  selector = '.keyboardContextBox',
) {
  onMounted(() => {
    if (typeof uni === 'undefined' || typeof uni.createSelectorQuery !== 'function') return
    const instance = getCurrentInstance()
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select(selector)
      .boundingClientRect((data) => {
        if (data?.height != null) {
          emit('getHeight', data.height)
        }
      })
      .exec()
  })
}
