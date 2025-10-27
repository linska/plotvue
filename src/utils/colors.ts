export type RGB = { r: number; g: number; b: number }

const hexToRgb = (hex: string):RGB => {
  const cleanHex = hex.replace('#', '')
  const v = parseInt(cleanHex, 16)

  return {r: v >> 16, g: (v >> 8) & 0xff, b: v & 0xff}
}

const rgbToHex = (r: number, g: number, b: number) => {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)))

  const cr = clamp(r)
  const cg = clamp(g)
  const cb = clamp(b)

  return `#${((1 << 24) + (cr << 16) + (cg << 8) + cb).toString(16).slice(1)}`
}

const generateShades = (hex: string, count = 5): string[] => {
  if (count <= 0) return []

  const shades: string[] = new Array(count)
  const rgb = hexToRgb(hex)
  const doubleCount = 2 * count

  for (let i = 0; i < count; i++) {
    const ratio = i / doubleCount
    const r = rgb.r + (255 - rgb.r) * ratio
    const g = rgb.g + (255 - rgb.g) * ratio
    const b = rgb.b + (255 - rgb.b) * ratio
    shades[i] = rgbToHex(r, g, b)
  }

  return shades
}

export {generateShades, hexToRgb, rgbToHex}