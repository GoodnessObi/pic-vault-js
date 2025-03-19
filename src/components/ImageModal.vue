<script setup lang="ts">
import { ref } from 'vue'
import IconRightCaret from '@/components/icons/IconRightCaret.vue'
import type { UnsplashPhoto } from '@/types'

const props = defineProps<{
  photos: UnsplashPhoto[]
  initialIndex: number
}>()

const emit = defineEmits(['close-modal'])

const currentIndex = ref(props.initialIndex)

const nextImage = () => {
  if (currentIndex.value < props.photos.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.photos.length - 1
  }
}

const closeModal = () => {
  emit('close-modal')
}
</script>

<template>
  <div class="slider">
    <button @click="prevImage" class="slider_nav left">
      <IconRightCaret />
    </button>
    <div class="slider_content">
      <img
        :src="photos[currentIndex].urls.small"
        :alt="photos[currentIndex].alt_description"
        class="slider_image"
      />
      <div class="slider_caption">
        <p>
          {{ photos[currentIndex].user.name }}
        </p>
        <p>{{ photos[currentIndex].user.location }}</p>
      </div>
    </div>

    <button @click="nextImage" class="slider_nav right">
      <IconRightCaret />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-height: 100%;

  &_content {
    border-radius: 6px;
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.2),
      0 8px 24px rgba(0, 0, 0, 0.3);
    max-width: fit-content;
    width: 100%;
    height: 100%;
    overflow: clip;
  }

  &_image {
    display: block;
  }

  &_caption {
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

  &_nav {
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

    &.left {
      left: -20px;
      transform: rotate(180deg);

      @include mq($screen-mobile) {
        left: 0;
      }

      @include mq($screen-tablet) {
        left: 20px;
      }
    }

    &.right {
      right: -20px;

      @include mq($screen-mobile) {
        right: 0;
      }

      @include mq($screen-tablet) {
        right: 20px;
      }
    }

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      color: black;
    }
  }
}
</style>
