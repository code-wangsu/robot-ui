# @robot-ui/icons

Element Plus 风格的 robot-ui 图标库（基于 `packages/assets` iconfont）。

## 用法

```ts
import { Shuaxin, Rili, iconList } from '@robot-ui/icons'
import '@robot-ui/assets/iconfont.css'
```

```vue
<template>
  <Shuaxin :size="40" color="#3c9cff" />
  <!-- 或 -->
  <rb-icon name="shuaxin" :size="40" />
</template>
```

## 重新生成

更新 `packages/assets/iconfont.*` 后：

```bash
pnpm icons:gen
```
