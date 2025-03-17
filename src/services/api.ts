import axios from 'axios'

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
  user: {
    name: string
    location: string
  }
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
})

export const fetchPhotos = async (query = 'nature', perPage = 20): Promise<UnsplashPhoto[]> => {
  const response = await apiClient.get<{ results: UnsplashPhoto[] }>('/search/photos', {
    params: { query, per_page: perPage },
  })
  return response.data.results
}
