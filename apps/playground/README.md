# robot-ui Playground

基于 uni-app（Vue3 + Vite）的组件联调项目，workspace 直连 `@robot-ui/components` 源码。

## 启动（推荐 CLI）

在 monorepo **根目录**：

```bash
pnpm install
pnpm dev:playground
```

或进入本目录：

```bash
pnpm install   # 需先在仓库根目录执行过 pnpm install
pnpm dev
```

CLI 会自动注入 Windows ESM 兼容钩子（`scripts/run-unh.mjs`）。

## 和传统 HBuilderX 工程的区别（重要）

你对比的左侧工程是 **Vue CLI / 旧版 HBuilderX 创建** 结构；本 playground 是 **Vite + uni-helper** 结构，文件位置不同，不是缺文件：

| 左侧（旧） | 本项目（Vite） |
|-----------|----------------|
| 根目录 `App.vue` / `main.js` | `src/App.vue` / `src/main.ts` |
| 根目录 `pages.json` / `manifest.json` | `src/pages.json` / `src/manifest.json`（由 `pages.config.ts` / `manifest.config.ts` 生成） |
| `vue.config.js` | `vite.config.ts` |
| 根目录 `pages/` | `src/pages/` |
| 无或较少 `.hbuilderx` | 已有 `.hbuilderx/launch.json`（多端运行配置） |

HBuilderX **支持** 打开本 Vite 工程，请直接打开 `apps/playground` 目录。

## HBuilderX 已补配置

- `.hbuilderx/launch.json`：Android / iOS / Harmony / H5 / 各小程序运行项
- `.hbuilderx/setting.json`：编辑器基础设置
- `src/manifest.json`：应用名、权限、相机/相册/视频模块（上传预览需要）
- `src/androidPrivacy.json`：Android 隐私弹窗模板
- `src/pages.json`：页面路由（HBuilderX 可直接识别）

## 演示页

| 页面 | 内容 |
|------|------|
| `/` | 目录 |
| `/pages/demo/catalog` | 全部组件测试入口 |
| `/pages/demo/basic` | Button / Tag / Color / Layout |
| `/pages/demo/form` | Form / DatePicker / Upload |
| `/pages/demo/media` | Image / Video / Upload |
| `/pages/demo/feedback` | Toast / Popup / Modal / ActionSheet |
| `/pages/demo/table` | Table / Pagination |
| `/pages/demo/keyboard` | SoftKeyboard |

## 接入方式

- `main.ts`：`registerComponents(app)` + 引入 `@robot-ui/styles/index.scss`
- `pages.config.ts`：easycom `^rb-(.*)` → `@robot-ui/components/$1/rb-$1.vue`
- `vite.config.ts`：alias 指向 `packages/*`，并注册 Windows ESM hook
