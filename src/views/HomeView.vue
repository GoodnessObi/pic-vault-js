<script setup lang="ts">
import type { UnsplashPhoto } from '@/services/api'

defineProps<{ photos: UnsplashPhoto[] }>()
</script>

<template>
  <div class="page">
    <div v-for="photo in photos" :key="photo.id" class="grid-item">
      <img :src="photo.urls.small" :alt="photo.alt_description" />
      <div class="overlay"></div>
      <div class="photo-info">
        <p>{{ photo.user.name }}</p>
        <p>{{ photo.location?.name || 'Unknown location' }}</p>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  .grid-item {
    width: 100%;

    img {
      width: 100%;
    }
  }
}
</style>
