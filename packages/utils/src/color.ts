const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  if (!HEX_COLOR_RE.test(hex)) {
    throw new Error(`[robot-ui] invalid hex color: ${hex}`)
  }

  let value = hex.slice(1)
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const num = Number.parseInt(value, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    clampChannel(n).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function colorToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function clampChannel(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)))
}
