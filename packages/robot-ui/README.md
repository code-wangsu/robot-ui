# robot-ui

面向 **uni-app 安卓端** 的 Vue3 组件库。架构参考 [uView2.0](https://github.com/umicro/uView2.0)，并增强 **Table / 下拉刷新加载 / 虚拟滚动**。

## 特性

- 技术栈：`TypeScript` + `Vue3` + `uni-app` + `Rollup` + `lodash-es` + `Sass`
- Monorepo：`@robot-ui/utils` / `@robot-ui/styles` / `@robot-ui/components` / `robot-ui`
- 尺寸单位统一 **rpx**（适配 App 端）
- 支持 easycom 与 `app.use(RobotUI)` 全量注册
- Vitest 单元测试 + VitePress 静态文档站

## 安装

```bash
pnpm add robot-ui
```

### 1. 全量注册

```ts
import { createSSRApp } from 'vue'
import RobotUI from 'robot-ui'
import 'robot-ui/styles/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(RobotUI)
  return { app }
}
```

### 2. easycom（推荐 uni-app）

在 `pages.json`：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^rb-(.*)": "robot-ui/components/$1/rb-$1.vue"
    }
  }
}
```

并在 `uni.scss` 引入主题：

```scss
@import 'robot-ui/styles/theme.scss';
@import 'robot-ui/styles/index.scss';
```

## 主题色

默认科技蓝，内置国网绿 / 商务灰 / 商业橙等 11 套主题：

```ts
import { setTheme, initTheme } from 'robot-ui'

initTheme()
setTheme('guowang-green')
```

详见文档「主题与单位」。

## 增强组件

| 组件 | 说明 |
|------|------|
| `rb-table` | 表格（排序 / 斑马纹 / 插槽） |
| `rb-pull-refresh` | 下拉刷新 + 触底加载 |
| `rb-loadmore` | 加载更多状态条 |
| `rb-virtual-list` | 固定行高虚拟列表（`itemHeight` 为 rpx） |

## 本地开发

```bash
pnpm install
pnpm build
pnpm test
pnpm dev:docs
```

## 发布 npm

```bash
pnpm --filter robot-ui build
pnpm --filter robot-ui publish --access public
```
