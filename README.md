# robot-ui monorepo

面向 **uni-app 安卓端** 的 Vue3 组件库。尺寸统一使用 **rpx**。

## 包结构

| 包名 | 说明 |
|------|------|
| `@robot-ui/utils` | 工具方法（`addUnit` 默认 rpx、`rpxToPx`、虚拟列表计算等） |
| `@robot-ui/styles` | 主题变量与组件样式（Sass） |
| `@robot-ui/components` | Vue3 组件源码 |
| `robot-ui` | npm 发布主包（Rollup 打包 + 源码拷贝） |
| `@robot-ui/docs` | VitePress 静态文档站 |

## 命令

```bash
pnpm install
pnpm build          # 构建所有 packages
pnpm test           # 单元测试
pnpm dev:docs       # 文档开发
pnpm build:docs     # 生成静态站点
```

## 发布

```bash
pnpm --filter robot-ui build
cd packages/robot-ui && npm publish --access public
```
