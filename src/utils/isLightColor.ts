export const isLightColor = (color: string): boolean => {
  if (!color.startsWith('#')) {
    console.error('Invalid hex color format: must start with #')
    return true
  }

  const hex = color.replace(/^#/, '')
  let r: number, g: number, b: number

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else {
    console.error('Invalid hex color format: must be #RGB or #RRGGBB')
    return true
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  return hsp > 127.5
}
