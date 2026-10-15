/** 全局 uni-app 运行时声明（精简版，便于组件库类型检查） */
declare const uni: UniNamespace.Uni

declare namespace UniNamespace {
  interface Uni {
    createSelectorQuery(): SelectorQuery
    createIntersectionObserver(
      component: unknown,
      options?: { thresholds?: number[]; initialRatio?: number; observeAll?: boolean },
    ): IntersectionObserver
    upx2px(upx: number): number
    pageScrollTo(options: { scrollTop: number; duration?: number }): void
    chooseImage(options: {
      count?: number
      success?: (res: { tempFilePaths: string[] }) => void
      fail?: (err: unknown) => void
    }): void
    previewImage(options: { urls: string[]; current?: string | number }): void
    hideKeyboard(): void
    getSystemInfoSync(): {
      windowWidth?: number
      windowHeight?: number
      screenWidth?: number
      screenHeight?: number
    }
  }

  interface IntersectionObserver {
    relativeTo(selector: string, margins?: Record<string, number>): IntersectionObserver
    relativeToViewport(margins?: Record<string, number>): IntersectionObserver
    observe(selector: string, callback: (res: IntersectionObserverResult) => void): void
    disconnect(): void
  }

  interface IntersectionObserverResult {
    intersectionRatio: number
    intersectionRect: NodeInfo
    boundingClientRect: NodeInfo
    relativeRect: NodeInfo
    time: number
    id?: string
  }

  interface SelectorQuery {
    in(component: unknown): SelectorQuery
    select(selector: string): NodesRef
    selectAll(selector: string): NodesRef
    exec(callback?: (res: unknown[]) => void): void
  }

  interface NodesRef {
    boundingClientRect(
      callback?: (rect: NodeInfo | null) => void,
    ): SelectorQuery
    fields(
      fields: Record<string, boolean>,
      callback?: (res: NodeInfo | null) => void,
    ): SelectorQuery
    scrollOffset(callback?: (res: { scrollTop: number; scrollLeft: number }) => void): SelectorQuery
  }

  interface NodeInfo {
    id?: string
    width?: number
    height?: number
    top?: number
    left?: number
    right?: number
    bottom?: number
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.css' {
  const src: string
  export default src
}
