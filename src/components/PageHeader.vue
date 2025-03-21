<script setup lang="ts">
import { inject, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSearch from './icons/IconSearch.vue'
import { SearchStateKey, type SearchState } from '@/types'
import IconArrowLeft from './icons/IconArrowLeft.vue'

const emit = defineEmits(['update:search'])
const searchState = inject<SearchState>(SearchStateKey)

const route = useRoute()
const router = useRouter()

const searchInput = ref(typeof route.query.search === 'string' ? route.query.search : '')

const searchQuery = computed(() => (route.query.search ? String(route.query.search) : ''))

const updateSearchQuery = (query: string) => {
  if (query !== route.query.search) {
    emit('update:search', query)
    router.push({ query: query ? { search: query } : {} })
  }
}

const clearSearch = () => {
  searchInput.value = ''
  updateSearchQuery('')
}

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
      <div class="hero_searchState" v-if="!!searchQuery && searchState?.isLoading.value">
        <p>
          Searching for <span>"{{ searchQuery }}"</span>
        </p>
      </div>

      <div
        class="hero_searchState"
        v-else-if="!!searchQuery && !searchState?.isLoading.value && searchState?.isSuccess.value"
      >
        <button @click="clearSearch">
          <IconArrowLeft />
        </button>
        <p>
          Search Results for<span>"{{ searchQuery }}"</span>
        </p>
      </div>

      <div class="hero_search" v-else>
        <span>
          <IconSearch />
        </span>
        <input
          v-model="searchInput"
          placeholder="Search for photo..."
          type="search"
          :disabled="searchState?.isLoading.value"
          @keyup.enter="updateSearchQuery(searchInput.trim())"
        />
      </div>
      <p v-if="searchState?.isError.value" class="error-message">
        There was an error fetching your images. Please try again.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: $navbar-height;
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
    align-items: stretch;
    background-color: white;
    border-radius: 8px;
    min-height: 60px;
    height: 100%;
    overflow: hidden;
    color: #2d3849;

    span {
      padding: 12px;
      padding-left: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;

      svg {
        width: 16px;
      }
    }

    input {
      padding: 10px;
      border: none;
      outline: none;
      color: inherit;
      flex: 1;
      height: 100%;
      min-width: 0;
      font-size: 1rem;
      font-weight: 500;

      &::placeholder {
        color: inherit;
        font-weight: 500;
      }
    }
  }

  &_searchState {
    width: 100%;
    align-self: flex-start;
    color: $color-text;
    font-size: 1.5rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-alt-text;

    @include mq($screen-mobile) {
      font-size: 2rem;
    }

    @include mq($screen-tablet) {
      font-size: 2.5rem;
    }

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;

      svg {
        width: 1.25rem;
        transform: scaleX(0.9); // Default scale
        transition: transform 0.2s ease-in-out; // Smooth transition
      }

      &:hover {
        svg {
          transform: scaleX(1); // Scale up on hover
        }
      }
    }

    span {
      margin-left: 8px;
      color: $color-sub-text;
    }
  }

  .error-message {
    color: $color-error;
    font-size: 1rem;
    text-align: center;
    font-weight: 600;
  }
}
</style>
