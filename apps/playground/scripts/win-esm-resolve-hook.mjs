import { pathToFileURL } from 'node:url'

/**
 * Node 20.6+ / 22+ on Windows rejects bare absolute paths in dynamic import().
 * uni-app / Vite / HBuilderX 可能传入 `C:\\...` 或 `C:/...`；改写为 file:// URL。
 * @see https://github.com/dcloudio/uni-app/issues/5991
 */
function toFileUrlIfNeeded(specifier) {
  if (typeof specifier !== 'string') return null
  // C:\foo or C:/foo
  if (/^[a-zA-Z]:[\\/]/.test(specifier)) {
    return pathToFileURL(specifier).href
  }
  // \\?\C:\foo
  if (/^\\\\\?\\[a-zA-Z]:[\\/]/.test(specifier)) {
    return pathToFileURL(specifier).href
  }
  return null
}

export async function resolve(specifier, context, nextResolve) {
  const rewritten = toFileUrlIfNeeded(specifier)
  if (rewritten) {
    return nextResolve(rewritten, context)
  }
  return nextResolve(specifier, context)
}
