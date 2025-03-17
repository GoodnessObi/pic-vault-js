<script setup lang="ts">
import { ref, computed } from 'vue'
import GridLoadingSkeleton from '@/components/GridLoadingSkeleton.vue'
import type { UnsplashPhoto } from '@/composables/useSearchImages'

const props = defineProps<{ photos: UnsplashPhoto[]; isLoading: boolean }>()

const photos = computed(() => props.photos)
const isLoading = computed(() => props.isLoading)

// Track which images have finished loading
const loadedImages = ref<{ [key: string]: boolean }>({})

const markImageAsLoaded = (id: string) => {
  loadedImages.value[id] = true
}
</script>

<template>
  <GridLoadingSkeleton v-if="isLoading" />

  <div v-else class="grid">
    <div
      v-for="photo in photos"
      :key="photo.id"
      class="grid_card"
      :style="{
        backgroundColor: photo.color,
        minHeight: loadedImages[photo.id] ? 'fit-content' : '200px',
      }"
    >
      <img
        :src="photo.optimizedUrl"
        :alt="photo.alt_description"
        :class="{ hidden: !loadedImages[photo.id] }"
        @load="markImageAsLoaded(photo.id)"
      />
      <div class="grid_card-overlay">
        <div class="grid_card-info">
          <p>{{ photo.user.name }}</p>
          <p>{{ photo.user.location || 'Unknown location' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  position: absolute;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  top: 250px;
  min-height: 50vh;
  column-count: 1;
  column-gap: 20px;
  page-break-inside: avoid;
  break-inside: avoid-column;

  @media (min-width: 495px) {
    column-count: 2;
  }

  @media (min-width: 795px) {
    column-count: 3;
  }

  &_card {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    break-inside: avoid-column;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    /* Use the base color as a placeholder */
    background-color: #ddd;

    img {
      display: block;
      width: 100%;
      height: auto;
      transition: opacity 0.3s ease-in-out;
    }

    /* Hide images until they are loaded */
    img.hidden {
      opacity: 0;
    }

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 16px;
      display: flex;
      flex-direction: column;
      transition: background 0.3s ease-in-out;
    }

    &-info {
      margin-top: auto;
      color: white;
    }

    &:hover {
      .grid_card-overlay {
        background-color: rgba(255, 255, 255, 0.5);
      }

      .grid_card-info {
        color: black;
      }
    }
  }
}
</style>
