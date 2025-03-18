<script setup lang="ts">
import { onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import { useSearchImages } from '@/composables/useSearchImages'
import { SearchStateKey } from './types'

const route = useRoute()
const router = useRouter()

const DEFAULT_QUERY = 'african' // Define default in one place

const getSearchQuery = () => {
  const query = route.query.search
  return typeof query === 'string' && query.trim() ? query : DEFAULT_QUERY
}

const searchQuery = ref(getSearchQuery())

const { pictures, loading, error, searchImages } = useSearchImages()

const isLoading = loading
const isSuccess = ref(false)

// Watch for picture updates to set success state
watch(pictures, () => {
  isSuccess.value = pictures.value.length > 0
})

// Provide only isLoading and isSuccess
provide(SearchStateKey, { isLoading, isSuccess })

onMounted(() => {
  searchImages(searchQuery.value)
})

// Update search when input changes
watch(
  searchQuery,
  (newQuery) => {
    const query = newQuery.trim() || DEFAULT_QUERY // Enforce default
    searchImages(query)

    router.replace({ query: query !== DEFAULT_QUERY ? { search: query } : {} })
  },
  { immediate: true },
)

// Sync search query with URL when history changes
watch(
  () => route.query.search,
  () => {
    searchQuery.value = getSearchQuery()
  },
)
</script>

<template>
  <main>
    <PageHeader @update:search="searchQuery = $event" :isLoading="loading" />

    <RouterView v-slot="{ Component }">
      <!-- <Transition name="page" mode="out-in"> -->
      <component :is="Component" :photos="pictures" :isLoading="loading" />
      <!-- </Transition> -->
    </RouterView>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
}
</style>
