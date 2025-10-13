const hexToRgb = (hex: string) => {
  const v = parseInt(hex.replace('#', ''), 16)
  return {r: v >> 16, g: (v >> 8) & 0xff, b: v & 0xff}
}

const rgbToHex = (r: number, g: number, b: number) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`


const generateShades = (hex: string, count = 5): string[] => {
  const shades: string[] = []
  const rgb = hexToRgb(hex)
  for (let i = 0; i < count; i++) {
    const ratio = i / (2 * count)
    const mix = (a: number, b: number) => Math.round(a + (b - a) * ratio)
    const r = mix(rgb.r, 255)
    const g = mix(rgb.g, 255)
    const b = mix(rgb.b, 255)
    shades.push(rgbToHex(r, g, b))
  }
  return shades
}

export {generateShades}