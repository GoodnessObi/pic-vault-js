import type { UnsplashPhoto } from '@/types'

export const getOptimizedImageUrl = (photo: UnsplashPhoto, speedMbps: number): string => {
  const screenWidth = window.innerWidth

  if (speedMbps < 1) {
    return photo.urls.small
  } else if (speedMbps < 3 && screenWidth < 768) {
    return photo.urls.regular
  } else if (speedMbps < 5) {
    return photo.urls.regular
  } else {
    return photo.urls.full
  }
}
