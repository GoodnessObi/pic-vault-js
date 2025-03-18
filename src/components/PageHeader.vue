<script setup lang="ts">
import { inject, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSearch from './icons/IconSearch.vue'
import { SearchStateKey, type SearchState } from '@/types'

const emit = defineEmits(['update:search'])
const searchState = inject<SearchState>(SearchStateKey)

const route = useRoute()
const router = useRouter()

const searchInput = ref(typeof route.query.search === 'string' ? route.query.search : '')

const searchQuery = computed(() => (route.query.search ? String(route.query.search) : ''))

let timeout: ReturnType<typeof setTimeout>

const handleSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    updateSearchQuery(searchInput.value.trim())
  }, 5000)
}

const updateSearchQuery = (query: string) => {
  emit('update:search', query)
  router.push({ query: query ? { search: query } : {} })
}

// Sync the input when URL changes
watch(
  () => route.query.search,
  (newQuery) => {
    searchInput.value = typeof newQuery === 'string' ? newQuery : ''
  },
)
</script>

<template>
  <div class="hero">
    <div class="hero_container">
      <div class="hero_search">
        <span>
          <IconSearch />
        </span>
        <input
          v-model="searchInput"
          placeholder="Search for photo..."
          :disabled="searchState?.isLoading.value"
          @input="handleSearch"
          @keyup.enter="updateSearchQuery(searchInput.trim())"
        />
      </div>
      <p class="hero_searchState" v-if="!!searchQuery && searchState?.isLoading.value">
        Searching for <span>"{{ searchQuery }}"</span>
      </p>

      <p
        class="hero_searchState"
        v-else-if="!!searchQuery && !searchState?.isLoading.value && searchState?.isSuccess.value"
      >
        Search Results for <span>"{{ searchQuery }}"</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 300px;
  background-color: #dce3eb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &_container {
    width: 80%;
  }

  &_search {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 8px;

    span {
      padding: 12px;
      padding-right: 0;
    }

    input {
      padding: 10px;
      border: none;
      outline: none;
      color: #2d3849;
      width: 100%;
    }
  }

  &_searchState {
    width: 100%;
    align-self: flex-start;
    color: #2f3153;
    font-size: 2rem;
    font-weight: 600;

    span {
      color: #6f7487;
    }
  }
}
</style>
