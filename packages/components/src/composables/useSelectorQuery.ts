import { getCurrentInstance } from 'vue'

/**
 * 在 Composition API 中创建绑定当前组件实例的 SelectorQuery。
 * 参考 uni-app 官方文档 nodes-info。
 */
export function useSelectorQuery() {
  const instance = getCurrentInstance()

  function createQuery() {
    const query = uni.createSelectorQuery()
    if (instance?.proxy) {
      return query.in(instance.proxy)
    }
    return query
  }

  function getRect(selector: string): Promise<UniNamespace.NodeInfo | null> {
    return new Promise((resolve) => {
      createQuery()
        .select(selector)
        .boundingClientRect((rect) => {
          resolve(rect)
        })
        .exec()
    })
  }

  return {
    createQuery,
    getRect,
  }
}
