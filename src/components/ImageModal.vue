<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import IconRightCaret from '@/components/icons/IconRightCaret.vue'
import type { UnsplashPhoto } from '@/types'
import { blurHashToDataURL } from '@/utils/blurHash'

const props = defineProps<{
  photos: UnsplashPhoto[]
  initialIndex: number
}>()

const emit = defineEmits(['close-modal'])

const currentIndex = ref(props.initialIndex)
const isLoaded = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)
const direction = ref<'next' | 'prev'>('next')

const placeholderImage = computed(() => {
  const photo = props.photos[currentIndex.value]
  if (!photo?.blur_hash) return ''

  const aspectRatio = photo.width / photo.height
  const width = 32
  const height = Math.round(width / aspectRatio)

  return blurHashToDataURL(photo.blur_hash, width, height)
})

const placeholderAspectRatio = computed(() => {
  const photo = props.photos[currentIndex.value]
  if (!photo) return '1 / 1'

  return `${photo.width} / ${photo.height}`
})

const nextImage = () => {
  if (props.photos.length === 0) return
  isLoaded.value = false
  direction.value = 'next'
  currentIndex.value = (currentIndex.value + 1) % props.photos.length
}

const prevImage = () => {
  if (props.photos.length === 0) return
  isLoaded.value = false
  direction.value = 'prev'
  currentIndex.value = (currentIndex.value - 1 + props.photos.length) % props.photos.length
}
const closeModal = () => {
  emit('close-modal')
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  const diffX = touchStartX.value - touchEndX.value
  const threshold = 50

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      nextImage()
    } else {
      prevImage()
    }
  }
}

const handleClickOutsideImage = () => {
  closeModal()
}

onMounted(() => {
  const sliderContent = document.querySelector('.slider_content') as HTMLElement | null
  if (sliderContent) {
    sliderContent.addEventListener('touchstart', handleTouchStart, { passive: true })
    sliderContent.addEventListener('touchmove', handleTouchMove, { passive: true })
    sliderContent.addEventListener('touchend', handleTouchEnd)
  }
})

onUnmounted(() => {
  const sliderContent = document.querySelector('.slider_content') as HTMLElement | null
  if (sliderContent) {
    sliderContent.removeEventListener('touchstart', handleTouchStart)
    sliderContent.removeEventListener('touchmove', handleTouchMove)
    sliderContent.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<template>
  <div v-if="photos.length" class="slider" @click="handleClickOutsideImage">
    <button @click.stop="prevImage" class="slider_nav left">
      <IconRightCaret />
    </button>

    <div class="slider_content">
      <transition :name="direction === 'next' ? 'slide-next' : 'slide-prev'" mode="out-in">
        <div
          :key="currentIndex"
          class="slider_card"
          :style="{ width: !isLoaded ? '80%' : 'auto' }"
          @click.stop
        >
          <div
            class="slider_placeholder"
            :style="{
              backgroundImage: `url(${placeholderImage})`,
              '--aspect-ratio': placeholderAspectRatio,
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
      </transition>
    </div>

    <button @click.stop="nextImage" class="slider_nav right">
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
    transition: transform 0.3s ease-in-out;
  }

  &_placeholder {
    position: relative;
    width: 100%;
    padding-top: calc(100% / (var(--aspect-ratio)));
    aspect-ratio: var(--aspect-ratio);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &_image {
    width: 100%;
    max-height: 65vh;
    object-fit: contain;
    display: block;
  }

  &_caption {
    width: 100%;
    padding: 24px;
    background: white;
    flex-shrink: 0;
    font-size: 1rem;
    color: $color-text;
    text-align: left;
    font-weight: 600;

    p {
      &:last-of-type {
        font-size: 12px;
        color: $color-alt-text;
        font-weight: 400;
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
      left: 0;
      transform: rotate(180deg);

      @include mq($screen-tablet) {
        left: 20px;
      }
    }

    &.right {
      right: 0;

      @include mq($screen-tablet) {
        right: 20px;
      }
    }

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      color: black;
    }
  }

  .slide-next-enter-active,
  .slide-next-leave-active,
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .slide-next-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-next-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-next-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-next-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-prev-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-prev-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-prev-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-prev-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
