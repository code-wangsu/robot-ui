# 介绍

robot-ui 是面向 **uni-app 安卓端** 的 Vue3 组件库，API 与文档结构参考 [Element Plus](https://element-plus.org/zh-CN/)。

## 设计原则

- **易用**：标签名 `rb-*`，easycom 自动引入
- **一致**：主题色、尺寸、圆角统一走 `packages/styles`
- **可验证**：静态文档说明用法，Playground 提供真实交互

## 文档怎么读（对齐 Element Plus）

每个组件页通常包含：

1. **基础用法**：可复制的 `<rb-xxx />` 示例
2. **Attributes**：属性表（参数 / 说明 / 类型 / 默认值）
3. **Events**：事件表
4. **Playground 入口**：到对应分类页点击测试按钮

## 本地验证

```bash
# 静态文档
pnpm dev:docs

# 交互 Playground
pnpm dev:playground
```

重新生成全部组件文档：

```bash
node apps/docs/scripts/generate-component-docs.mjs
```
