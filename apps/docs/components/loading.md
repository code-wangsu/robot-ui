<script setup lang="ts">
import BasicDemo from '../examples/loading/basic.vue'
import PageDemo from '../examples/loading/page.vue'

const basicSource = `<template>
  <rb-loading text="加载中" />
</template>
`

const pageSource = `<template>
  <view
    style="
      position: relative;
      height: 160px;
      border: 1px dashed #dcdfe6;
      border-radius: 8px;
      overflow: hidden;
    "
  >
    <rb-loading
      fullscreen
      absolute
      text="加载中"
      bg-color="rgba(255,255,255,0.9)"
    />
  </view>
</template>
`
</script>

# Loading 加载

内联加载、旋转图标与页面遮罩统一为 `rb-loading`。底层图标仍可由 `rb-loading-icon` 单独使用（一般无需）。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
  <rb-loading text="加载中" />
</template>
```

  </template>
</DemoBlock>

## 页面 / 区域遮罩

`fullscreen` 开启遮罩；文档预览再加 `absolute`，避免盖住整站。

<DemoBlock title="区域遮罩" :raw-source="pageSource">
  <PageDemo />
  <template #code>

```vue
<template>
  <view
    style="
      position: relative;
      height: 160px;
      border: 1px dashed #dcdfe6;
      border-radius: 8px;
      overflow: hidden;
    "
  >
    <rb-loading
      fullscreen
      absolute
      text="加载中"
      bg-color="rgba(255,255,255,0.9)"
    />
  </view>
</template>
```

  </template>
</DemoBlock>

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| loading | 是否显示 | `boolean` | `true` |
| text | 文案 | `string` | `''` |
| vertical | 图标与文案是否纵向排列 | `boolean` | `true` |
| size | 图标尺寸 | `string \| number` | `40` |
| color | 图标颜色 | `string` | `''` |
| mode | 图标样式 | `'circle' \| 'spinner'` | `'circle'` |
| fullscreen | 是否遮罩层 | `boolean` | `false` |
| absolute | 遮罩相对父级定位（需配合 fullscreen） | `boolean` | `false` |
| bgColor | 遮罩背景色 | `string` | `'rgba(255,255,255,0.9)'` |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 迁移说明

| 旧组件 | 新写法 |
|--------|--------|
| `rb-loading-icon` | `<rb-loading :size="40" />`（无文案）或继续用底层图标 |
| `rb-loading-page` | `<rb-loading fullscreen text="加载中" />` |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Loading** 测试按钮即可验证。
