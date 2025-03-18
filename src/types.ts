import type { InjectionKey, Ref } from 'vue'

export interface SearchState {
  isLoading: Ref<boolean>
  isSuccess: Ref<boolean>
}

export const SearchStateKey: InjectionKey<SearchState> = Symbol('SearchState')
