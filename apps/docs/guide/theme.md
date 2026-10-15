# 主题与单位

## rpx 约定

本库所有尺寸相关 props（`height`、`width`、`size`、`itemHeight` 等）**数字默认单位为 rpx**，适配 uni-app 安卓端。

```vue
<!-- 400 => 400rpx -->
<rb-table :height="800" :columns="columns" :data="list" />

<!-- 虚拟列表行高 96rpx -->
<rb-virtual-list :list="list" :item-height="96" :height="1200">
  <template #default="{ item }">
    <view>{{ item.title }}</view>
  </template>
</rb-virtual-list>
```

虚拟列表内部会通过 `uni.upx2px` 将 rpx 转为 px，以对齐 `scroll-view` 的 `scrollTop`（px）。

## 主题色（对齐 Element Plus）

robot-ui 同时支持：

1. **Sass 变量**（编译期覆盖）
2. **CSS 变量**（运行时切换，与 Element Plus 一致）
3. **内置主题色板**（`data-rb-theme`）

默认主题为 **科技蓝**（`tech-blue` / `#3c9cff`）。

### 在线切换

点击下方色板即可切换全站组件主色（文档站已接入 `setTheme`）：

<ThemePicker />

### 内置主题一览

| Key | 名称 | 主色 |
|-----|------|------|
| `tech-blue` | 科技蓝（默认） | `#3c9cff` |
| `guowang-green` | 国网绿 | `#00a057` |
| `business-gray` | 商务灰 | `#5b6b7c` |
| `business-orange` | 商业橙 | `#ff6a00` |
| `fresh-green` | 清新绿 | `#2ecc71` |
| `cool-purple` | 炫酷紫 | `#7c4dff` |
| `alert-red` | 醒目红 | `#e53935` |
| `mourning-white` | 默哀白 | `#8c8c8c` |
| `leaf-cyan` | 树叶青 | `#1abc9c` |
| `girl-pink` | 少女粉 | `#ff6b9d` |
| `sky-blue` | 蓝天浅蓝 | `#64b5f6` |

### 运行时切换（推荐）

```ts
import { setTheme, setPrimaryColor, initTheme, getThemePresets } from 'robot-ui'

// App 启动时恢复本地主题
initTheme()

// 切换内置主题
setTheme('guowang-green')

// 仅自定义主色（自动生成 dark / light / disabled）
setPrimaryColor('#00a057')

// 读取色板
console.log(getThemePresets())
```

切换后会在 `html` / `body` 上写入 `data-rb-theme="guowang-green"`，样式通过 CSS 变量即时生效。

### 用 CSS 变量覆盖（对齐 EP）

```css
:root {
  --rb-color-primary: #00a057;
  --rb-color-primary-dark: #008a4a;
  --rb-color-primary-light: #e8f8f0;
  --rb-color-primary-disabled: #80d0ab;
}
```

常用变量：

| CSS 变量 | 说明 |
|----------|------|
| `--rb-color-primary` | 主色 |
| `--rb-color-primary-dark` | 主色加深 |
| `--rb-color-primary-light` | 主色浅底 |
| `--rb-color-primary-disabled` | 主色禁用 |
| `--rb-color-success` / `warning` / `error` / `info` | 语义色 |
| `--rb-text-color-primary` | 主文本 |
| `--rb-border-color` | 边框 |
| `--rb-bg-color` | 背景 |

### Sass 变量覆盖（编译期）

在 `uni.scss`（或入口 scss）中**先覆盖再导入**：

```scss
// 覆盖默认主色（编译期）
$rb-primary: #00a057;

@import 'robot-ui/styles/theme.scss';
@import 'robot-ui/styles/index.scss';
```

或覆盖整套内置色板 map：

```scss
$rb-default-theme: 'guowang-green';
$rb-theme-presets: (
  'guowang-green': (
    label: '国网绿',
    primary: #00a057,
  ),
  // ...可追加业务主题
);

@import 'robot-ui/styles/index.scss';
```

色板与衍生色定义见：

- `packages/styles/themes/palettes.scss`
- `packages/styles/themes/presets.scss`
- `packages/styles/theme.scss`
