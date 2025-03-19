<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import IconRightCaret from '@/components/icons/IconRightCaret.vue'
import type { UnsplashPhoto } from '@/types'

const props = defineProps<{
  photos: UnsplashPhoto[]
  initialIndex: number
}>()

const emit = defineEmits(['close-modal'])

const currentIndex = ref(props.initialIndex)
const isLoaded = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)

// Show placeholder background until image loads
// const sliderStyle = computed(() => ({
//   backgroundColor: props.photos[currentIndex.value]?.color || '#ccc',
// }))

const nextImage = () => {
  isLoaded.value = false
  currentIndex.value = (currentIndex.value + 1) % props.photos.length
}

const prevImage = () => {
  isLoaded.value = false
  currentIndex.value = (currentIndex.value - 1 + props.photos.length) % props.photos.length
}

const closeModal = () => {
  emit('close-modal')
}

// Swipe handling
const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX.value = event.changedTouches[0].clientX
  const diff = touchStartX.value - touchEndX.value
  if (diff > 50)
    nextImage() // Swipe left
  else if (diff < -50) prevImage() // Swipe right
}

// Attach event listeners only when modal is open
watch(
  () => props.photos.length,
  (newVal) => {
    if (newVal > 0) {
      document.addEventListener('touchstart', handleTouchStart)
      document.addEventListener('touchend', handleTouchEnd)
    } else {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  },
)

onUnmounted(() => {
  document.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <div v-if="photos.length" class="slider">
    <button @click="prevImage" class="slider_nav left">
      <IconRightCaret />
    </button>

    <div class="slider_content">
      <div class="slider_card">
        <div
          class="slider_placeholder"
          :style="{
            backgroundColor: photos[currentIndex].color,
            height: '65vh',
            width: '400px',
          }"
          v-if="!isLoaded"
        ></div>
        <img
          v-show="isLoaded"
          :src="photos[currentIndex].optimizedUrl"
          :alt="photos[currentIndex].alt_description"
          class="slider_image"
          @load="isLoaded = true"
        />

        <div class="slider_caption">
          <p>{{ photos[currentIndex].user.name }}</p>
          <p>{{ photos[currentIndex].user.location ?? 'Unknown Location' }}</p>
        </div>
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &_content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
  }

  &_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    max-width: 80%;
    max-height: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: transparent;
    transition: transform 0.4s ease-in-out;
  }

  &_image {
    width: 100%;
    max-height: 65vh;
    object-fit: contain;
    display: block;
  }

  &_caption {
    width: 100%;
    padding: 1rem;
    text-align: center;
    background: white;
    flex-shrink: 0;
    font-size: 14px;
    color: black;

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
