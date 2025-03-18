import { ref } from 'vue'
import { testNetworkSpeed } from '@/services/network'
import { getOptimizedImageUrl } from '@/utils/imageOptimizer'

const API_BASE_URL = 'https://api.unsplash.com'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export interface UnsplashPhoto {
  id: string
  alt_description: string
  width: number
  height: number
  color: string
  blur_hash: string
  urls: {
    raw: string
    thumb: string
    small: string
    regular: string
    full: string
    small_s3: string
  }
  optimizedUrl: string
  user: {
    name: string
    location: string
  }
}

export function useSearchImages() {
  const pictures = ref<UnsplashPhoto[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const networkSpeed = ref<number>(4)

  const searchImages = async (query = 'african', perPage = 8) => {
    loading.value = true
    error.value = null

    try {
      networkSpeed.value = await testNetworkSpeed()

      const response = await fetch(
        `${API_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()

      pictures.value = data.results.map((photo: UnsplashPhoto) => ({
        ...photo,
        optimizedUrl: getOptimizedImageUrl(photo, networkSpeed.value),
      }))
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    pictures,
    loading,
    error,
    searchImages,
  }
}
