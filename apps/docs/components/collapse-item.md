<script setup lang="ts">
import BasicDemo from '../examples/collapse-item/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
<\/script>

<template>
<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="标题" value="右侧" label="说明">折叠内容</rb-collapse-item>
</rb-collapse>
<\/template>
`
</script>

# CollapseItem 折叠项

折叠面板的子项，需配合 `rb-collapse` 使用。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
</script>

<template>
<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="标题" value="右侧" label="说明">折叠内容</rb-collapse-item>
</rb-collapse>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 唯一标识，对应父级 v-model | `string \| number` | `''` |
| title | 标题 | `string` | `''` |
| value | 标题右侧内容 | `string` | `''` |
| label | 标题下方说明 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| isLink | 是否显示右侧箭头 | `boolean` | `true` |
| clickable | 点击标题是否切换展开 | `boolean` | `true` |
| lazyRender | 首次展开前不渲染内容 | `boolean` | `false` |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击标题时触发 | `(name)` |
| change | 展开状态将要变化时触发 | `(expanded: boolean)` |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 面板内容 |
| title | 自定义标题 |
| label | 自定义副标题 |
| value | 自定义右侧内容 |
| icon | 标题左侧图标 |

## 在 Playground 中试用

打开 `apps/playground`，进入 **数据展示** 页即可验证。
