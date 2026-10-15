<script setup lang="ts">
import BasicDemo from '../examples/tabbar-item/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
<\/script>

<template>
<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
</rb-tabbar>
<\/template>
`
</script>

# TabbarItem 导航项

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
</script>

<template>
<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
</rb-tabbar>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | name | `string | number` | '' |
| text | text | `string` | '' |
| icon | icon | `string` | '' |
| badge | badge | `string | number` | '' |
| dot | dot | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **TabbarItem** 测试按钮即可验证。
