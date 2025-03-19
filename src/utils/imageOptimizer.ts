import type { UnsplashPhoto } from '@/services/api'

export const getOptimizedImageUrl = (photo: UnsplashPhoto, speedMbps: number): string => {
  if (speedMbps < 0.5) return photo.urls.small
  if (speedMbps < 2) return photo.urls.regular
  if (speedMbps < 5) return photo.urls.full
  return photo.urls.full
}
