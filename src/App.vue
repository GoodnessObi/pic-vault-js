<script setup lang="ts">
import { onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import { useSearchImages } from '@/composables/useSearchImages'
import { SearchStateKey } from './types'

const route = useRoute()
const router = useRouter()

const DEFAULT_QUERY = 'african'

const getSearchQuery = () => {
  const query = route.query.search

  return typeof query === 'string' && query.trim() ? query : DEFAULT_QUERY
}

const searchQuery = ref(getSearchQuery())

const { pictures, loading, error, searchImages } = useSearchImages()

const isLoading = loading
const isSuccess = ref(false)

watch(pictures, () => {
  isSuccess.value = pictures.value.length > 0
})

provide(SearchStateKey, { isLoading, isSuccess })

onMounted(() => {
  console.log(searchQuery.value)
  searchImages(searchQuery.value)
})

watch(
  searchQuery,
  (newQuery) => {
    const query = newQuery.trim() || DEFAULT_QUERY
    searchImages(query)

    if (query !== route.query.search) {
      router.replace({ query: query !== DEFAULT_QUERY ? { search: query } : {} })
    }
  },
  { immediate: true },
)

watch(
  () => route.query.search,
  (newQuery) => {
    const query = typeof newQuery === 'string' && newQuery.trim() ? newQuery : DEFAULT_QUERY
    if (query !== searchQuery.value) {
      searchQuery.value = query
    }
  },
)
</script>

<template>
  <main>
    <PageHeader @update:search="searchQuery = $event" :isLoading="loading" />

    <RouterView v-slot="{ Component }">
      <component :is="Component" :photos="pictures" :isLoading="loading" />
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
  min-height: 100vh;
}
</style>
