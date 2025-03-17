<script setup lang="ts">
import type { UnsplashPhoto } from '@/services/api'

defineProps<{ photos: UnsplashPhoto[] }>()
</script>

<template>
  <div class="page">
    <div v-for="photo in photos" :key="photo.id" class="grid-item">
      <img :src="photo.urls.small" :alt="photo.alt_description" />
      <div class="overlay">
        <div class="photo-info">
          <p>{{ photo.user.name }}</p>
          <p>{{ photo.location?.name || 'Unknown location' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  position: absolute;
  border: 1px solid red;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  top: 250px;
  min-height: 50vh;
  -moz-column-count: 1;
  -webkit-column-count: 1;
  column-count: 1;
  column-gap: 20px;
  page-break-inside: avoid;
  break-inside: avoid-column;

  @media (min-width: 495px) {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }

  @media (min-width: 795px) {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }

  .grid-item {
    width: 100%;
    position: relative;
    overflow: hidden;
    min-height: fit-content;
    margin-bottom: 20px;
    break-inside: avoid-column;
    border-radius: 8px;
    cursor: pointer;

    img {
      width: 100%;
      height: auto;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 16px;
      display: flex;
      flex-direction: column;

      .photo-info {
        margin-top: auto;
        color: white;
      }
    }

    &:hover {
      .overlay {
        background-color: rgba(255, 255, 255, 0.5);

        .photo-info {
          color: black;
        }
      }
    }
  }
}
</style>
