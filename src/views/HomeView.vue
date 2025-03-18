<script setup lang="ts">
import { ref, computed } from 'vue'
import GridLoadingSkeleton from '@/components/GridLoadingSkeleton.vue'
import BaseModal from '@/components/BaseModal.vue'
import type { UnsplashPhoto } from '@/composables/useSearchImages'
import IconRightCaret from '@/components/icons/IconRightCaret.vue'

const props = defineProps<{ photos: UnsplashPhoto[]; isLoading: boolean }>()

const photos = computed(() => props.photos)
const isLoading = computed(() => props.isLoading)

// Track which images have finished loading
const loadedImages = ref<{ [key: string]: boolean }>({})
const markImageAsLoaded = (id: string) => {
  loadedImages.value[id] = true
}

// Modal state
const modalActive = ref(false)
const currentIndex = ref(0)

// Open modal with selected image
const openModal = (index: number) => {
  currentIndex.value = index
  modalActive.value = true
}

// Close modal
const closeModal = () => {
  modalActive.value = false
}

// Navigate images
const nextImage = () => {
  if (currentIndex.value < photos.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // Loop back to the first image
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = photos.value.length - 1 // Loop back to the last image
  }
}
</script>

<template>
  <GridLoadingSkeleton v-if="isLoading" />

  <div v-else class="grid">
    <div
      v-for="(photo, index) in photos"
      :key="photo.id"
      class="grid_card"
      :style="{
        backgroundColor: photo.color,
        minHeight: loadedImages[photo.id] ? 'fit-content' : '200px',
      }"
      @click="openModal(index)"
    >
      <img
        :src="photo.urls.thumb"
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

  <!-- Modal with Image Slider -->
  <BaseModal :modalActive="modalActive" @close-modal="closeModal">
    <div class="modal-content">
      <button @click="prevImage" class="nav-button left">
        <IconRightCaret />
      </button>
      <div class="modal-img-container">
        <img
          :src="photos[currentIndex].urls.small"
          :alt="photos[currentIndex].alt_description"
          class="modal-image"
        />
        <div class="caption">
          <p>
            {{ photos[currentIndex].user.name }}
          </p>
          <p>{{ photos[currentIndex].user.location }}</p>
        </div>
      </div>

      <button @click="nextImage" class="nav-button right">
        <IconRightCaret />
      </button>
    </div>
  </BaseModal>
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
      // background-color: transparent;
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

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.modal-img-container {
  border-radius: 4px;
  width: fit-content;
  overflow: clip;

  .caption {
    background-color: #fff;
    color: black;
    display: block;
    text-align: left;
    padding: 1rem;

    p {
      font-size: 14px;

      &:last-of-type {
        font-size: 8px;
        color: #95a4b5;
      }
    }
  }
}

.modal-image {
  // max-height: 80vh;
  display: block;
}

.nav-button {
  position: absolute;
  background: white;
  color: #7c8ea2;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button.left {
  left: 20px;
  transform: rotate(180deg);
}

.nav-button.right {
  right: 20px;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.8);
  color: black;
}
</style>
