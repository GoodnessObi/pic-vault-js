import axios from 'axios'

const API_BASE_URL = 'https://api.unsplash.com'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export interface UnsplashPhoto {
  id: string
  alt_description: string
  urls: {
    small: string
    regular: string
    full: string
  }
  user: {
    name: string
  }
  location?: {
    name?: string
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
