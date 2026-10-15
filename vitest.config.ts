import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@robot-ui/utils': resolve(__dirname, 'packages/utils/src'),
      '@robot-ui/components': resolve(__dirname, 'packages/components/src'),
      '@robot-ui/styles': resolve(__dirname, 'packages/styles'),
      'robot-ui': resolve(__dirname, 'packages/robot-ui/src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/**/__tests__/**/*.{test,spec}.ts'],
    css: true,
  },
})
