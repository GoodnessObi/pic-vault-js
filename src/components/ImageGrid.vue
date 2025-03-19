<script setup lang="ts">
import type { UnsplashPhoto } from '@/types'
import { isLightColor } from '@/utils/isLightColor'
import { computed, ref } from 'vue'

const props = defineProps<{ photos: UnsplashPhoto[]; openModal: (index: number) => void }>()

const photos = computed(() => props.photos)

const loadedImages = ref<{ [key: string]: boolean }>({})
const markImageAsLoaded = (id: string) => {
  loadedImages.value[id] = true
}
</script>
<template>
  <div class="grid">
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
      <div
        class="grid_card-overlay"
        :class="{ 'grid_card-overlay--light': isLightColor(photo.color) }"
      >
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
  width: 100%;
  height: 100%;
  column-count: 1;
  column-gap: 3rem;
  page-break-inside: avoid;
  break-inside: avoid-column;

  @include mq($screen-mobile) {
    column-count: 2;
  }

  @include mq($screen-tablet) {
    column-count: 3;
  }

  &_card {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
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

    img.hidden {
      opacity: 0;
    }

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // background-color: rgba(0, 0, 0, 0.2);
      padding: 16px;
      display: flex;
      flex-direction: column;
      transition: background 0.3s ease-in-out;

      &--light {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    &-info {
      margin-top: auto;
      color: white;
      font-size: 1rem;

      p:last-of-type {
        font-size: 12px;
      }
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
