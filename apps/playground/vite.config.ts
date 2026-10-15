import './scripts/register-win-esm.mjs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Uni from '@uni-helper/plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'

/** Windows 下避免依赖 import.meta.url 相对定位异常 */
const playgroundDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(playgroundDir, '../..')

export default defineConfig({
  resolve: {
    alias: {
      '@robot-ui/components': resolve(root, 'packages/components/src'),
      '@robot-ui/utils': resolve(root, 'packages/utils/src'),
      '@robot-ui/styles': resolve(root, 'packages/styles'),
      'robot-ui': resolve(root, 'packages/robot-ui/src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
      },
    },
  },
  server: {
    port: 5174,
    host: true,
  },
  plugins: [
    UniHelperManifest(),
    UniHelperPages({
      dts: 'src/uni-pages.d.ts',
    }),
    UniHelperLayouts(),
    UniHelperComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
    UniPolyfill(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true,
    }),
    UnoCSS(),
  ],
})
