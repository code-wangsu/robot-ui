import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const playgroundRoot = path.resolve(scriptsDir, '..')
const registerUrl = pathToFileURL(path.join(scriptsDir, 'register-win-esm.mjs')).href
const unhCli = path.join(playgroundRoot, 'node_modules/@uni-helper/unh/dist/cli.mjs')

const importFlag = `--import ${registerUrl}`
const prev = process.env.NODE_OPTIONS?.trim()
const env = {
  ...process.env,
  NODE_OPTIONS: prev ? `${prev} ${importFlag}` : importFlag,
}

const child = spawn(process.execPath, [unhCli, ...process.argv.slice(2)], {
  cwd: playgroundRoot,
  env,
  stdio: 'inherit',
  shell: false,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
