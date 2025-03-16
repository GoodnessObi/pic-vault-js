<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import { ref, onMounted } from 'vue'
import { fetchPhotos, type UnsplashPhoto } from './services/api'

const searchQuery = ref('nature')
const photos = ref<UnsplashPhoto[]>([])
const selectedPhoto = ref<UnsplashPhoto | null>(null)

// Fetch images from Unsplash
const fetchImages = async () => {
  try {
    photos.value = await fetchPhotos(searchQuery.value)
  } catch (error) {
    console.error('Error fetching images:', error)
  }
}

onMounted(fetchImages)

console.log(photos)
</script>

<template>
  <main>
    <PageHeader />

    <RouterView class="" v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :photos="photos" />
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
}
</style>
