import { decodeBlurHash } from 'fast-blurhash'

export const blurHashToDataURL = (
  blurHash: string,
  width: number = 32,
  height?: number,
): string => {
  if (!blurHash) return ''

  const pixels = decodeBlurHash(blurHash, width, height || width)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height || width
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const imageData = ctx.createImageData(width, height || width)
  imageData.data.set(pixels)
  ctx.putImageData(imageData, 0, 0)

  // Convert canvas to base64 data URL
  return canvas.toDataURL()
}
