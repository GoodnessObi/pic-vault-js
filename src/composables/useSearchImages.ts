import { ref } from 'vue'
import { getNetworkSpeed } from '@/services/network'
import { getOptimizedImageUrl } from '@/utils/imageOptimizer'
import type { UnsplashPhoto } from '@/types'

const API_BASE_URL = 'https://api.unsplash.com'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export function useSearchImages() {
  const pictures = ref<UnsplashPhoto[]>([])
  const loading = ref(false)
  const isError = ref(false)

  const searchImages = async (query = 'african', perPage = 8) => {
    loading.value = true
    isError.value = false

    try {
      const networkSpeed = await getNetworkSpeed()

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
        optimizedUrl: getOptimizedImageUrl(photo, networkSpeed),
      }))
    } catch (err) {
      console.error(err)
      isError.value = true
    } finally {
      loading.value = false
    }
  }

  return {
    pictures,
    loading,
    isError,
    searchImages,
  }
}
