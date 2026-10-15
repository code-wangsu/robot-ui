# 快速开始

## 安装

```bash
pnpm add robot-ui
```

## 全量注册

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

## easycom

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

## 图标

```bash
pnpm add @robot-ui/icons
```

```vue
<script setup>
import { Shuaxin, Rili } from '@robot-ui/icons'
</script>

<template>
  <rb-icon name="shuaxin" :size="40" color="#3c9cff" />
  <Shuaxin :size="40" />
</template>
```

更新 `packages/assets` 中的 iconfont 后执行 `pnpm icons:gen`。

## 主题色

默认 **科技蓝**。内置国网绿、商务灰、商业橙等 11 套主题，支持 Sass / CSS 变量与 `setTheme()` 运行时切换，详见 [主题与单位](/guide/theme)。

## 使用示例

```vue
<template>
  <rb-button type="primary" text="提交" @click="onSubmit" />
</template>
```
