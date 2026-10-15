import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from 'rollup-plugin-vue'
import resolvePlugin from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const external = [
  'vue',
  'lodash-es',
  /lodash-es\/.*/,
  '@robot-ui/utils',
  '@robot-ui/components',
]

const banner = `/*! robot-ui v${pkg.version} | MIT */`

/**
 * Rollup 打包策略：
 * 1. ESM/CJS/UMD：插件入口 + 工具方法（便于 npm 安装与按需引用）
 * 2. Vue 源码与 scss 通过 copy-assets 拷贝进包，供 uni-app easycom / 条件编译使用
 */
export default [
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        banner,
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        exports: 'named',
        banner,
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      resolvePlugin({ extensions: ['.mjs', '.js', '.json', '.ts', '.vue'] }),
      commonjs(),
      vue({
        preprocessStyles: true,
        style: {
          postcssPlugins: [],
        },
      }),
      postcss({
        extract: 'robot-ui.css',
        minimize: true,
        use: ['sass'],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: false,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    external: ['vue', 'lodash-es', /lodash-es\/.*/, '@robot-ui/utils', '@robot-ui/components'],
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'RobotUI',
      globals: {
        vue: 'Vue',
        'lodash-es': '_',
        '@robot-ui/utils': 'RobotUIUtils',
        '@robot-ui/components': 'RobotUIComponents',
      },
      banner,
      exports: 'named',
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      resolvePlugin({ browser: true, extensions: ['.mjs', '.js', '.json', '.ts', '.vue'] }),
      commonjs(),
      vue({ preprocessStyles: true }),
      postcss({ extract: false, inject: false, use: ['sass'] }),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]
