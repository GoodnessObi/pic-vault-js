<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import { useSearchImages } from '@/composables/useSearchImages'

const searchQuery = ref('nature')

const { pictures, loading, error, searchImages } = useSearchImages()

onMounted(() => {
  searchImages(searchQuery.value)
})

watch(
  searchQuery,
  (newQuery) => {
    const query = newQuery.trim() === '' ? 'nature' : newQuery
    searchImages(query)
  },
  { immediate: true },
)
</script>

<template>
  <main>
    <PageHeader @update:search="searchQuery = $event" />

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :photos="pictures" :isLoading="loading" />
      </Transition>
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
