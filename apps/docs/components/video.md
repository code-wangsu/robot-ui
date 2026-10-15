<script setup lang="ts">
import BasicDemo from '../examples/video/basic.vue'

const basicSource = `<template>
  <rb-video
    src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
    :controls="true"
    :lazy="false"
    height="200"
  />
<\/template>
`
</script>

# Video 视频

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
  <rb-video
    src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
    :controls="true"
    :lazy="false"
    height="200"
  />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | src | `string` | '' |
| poster | poster | `string` | '' |
| title | title | `string` | '' |
| width | width | `string | number` | '100%' |
| height | height | `string | number` | 420 |
| controls | 是否显示默认播放控件 | `boolean` | true |
| autoplay | autoplay | `boolean` | false |
| loop | loop | `boolean` | false |
| muted | muted | `boolean` | false |
| initialTime | 指定视频初始播放位置，单位 s | `number` | 0 |
| objectFit | contain / fill / cover | `RbVideoObjectFit` | 'contain' |
| showCenterPlayBtn | showCenterPlayBtn | `boolean` | true |
| showFullscreenBtn | showFullscreenBtn | `boolean` | true |
| showPlayBtn | showPlayBtn | `boolean` | true |
| enableProgressGesture | enableProgressGesture | `boolean` | true |
| showMuteBtn | 是否显示静音按钮（部分端） | `boolean` | false |
| videoId | 自定义 video id，便于 createVideoContext | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| play | - |
| pause | - |
| ended | - |
| error | - |
| timeupdate | - |
| waiting | - |
| fullscreenchange | - |
| loadedmetadata | - |
| controlstoggle | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Video** 测试按钮即可验证。
