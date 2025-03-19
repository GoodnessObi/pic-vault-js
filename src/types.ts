import type { InjectionKey, Ref } from 'vue'

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

export interface SearchState {
  isLoading: Ref<boolean>
  isSuccess: Ref<boolean>
  isError: Ref<boolean>
}

export const SearchStateKey: InjectionKey<SearchState> = Symbol('SearchState')
