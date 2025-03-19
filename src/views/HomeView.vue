<script setup lang="ts">
import { ref, computed } from 'vue'
import GridLoadingSkeleton from '@/components/GridLoadingSkeleton.vue'
import BaseModal from '@/components/BaseModal.vue'
import type { UnsplashPhoto } from '@/types'
import ImageGrid from '@/components/ImageGrid.vue'
import ImageModal from '@/components/ImageModal.vue'

const props = defineProps<{ photos: UnsplashPhoto[]; isLoading: boolean }>()

const photos = computed(() => props.photos)
const isLoading = computed(() => props.isLoading)

const modalActive = ref(false)
const currentIndex = ref(0)

const openModal = (index: number) => {
  currentIndex.value = index
  modalActive.value = true
}

const closeModal = () => {
  modalActive.value = false
}
</script>

<template>
  <div class="container">
    <GridLoadingSkeleton v-if="isLoading" />
    <ImageGrid v-else :photos="photos" :openModal="openModal" />
  </div>

  <BaseModal :modalActive="modalActive" @close-modal="closeModal">
    <ImageModal :photos="photos" :initialIndex="currentIndex" @close-modal="closeModal" />
  </BaseModal>
</template>

<style lang="scss" scoped>
.container {
  top: calc($navbar-height - 40px);
  position: absolute;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 50vh;
  padding-bottom: 5rem;
}
</style>
