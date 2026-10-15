import { register } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

/**
 * HBuilderX / 部分工具链不会走 scripts/run-unh.mjs，
 * 这里用绝对 file:// 注册，避免 Windows 上 `C:\...` 被当成 ESM protocol。
 */
const dir = dirname(fileURLToPath(import.meta.url))
const hookUrl = pathToFileURL(join(dir, 'win-esm-resolve-hook.mjs')).href

try {
  register(hookUrl, import.meta.url)
} catch {
  // 重复注册或当前 Node 不支持 register 时忽略
}
