import type { UnsplashPhoto } from '@/services/api'

export const getOptimizedImageUrl = (photo: UnsplashPhoto, speedMbps: number): string => {
  if (speedMbps < 0.5) return photo.urls.thumb
  if (speedMbps < 2) return photo.urls.thumb
  if (speedMbps < 5) return photo.urls.regular
  return photo.urls.full
}
