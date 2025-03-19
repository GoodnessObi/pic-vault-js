<script lang="ts" setup>
import { watch } from 'vue'
import IconClose from './icons/IconClose.vue'

const emit = defineEmits(['close-modal'])
const props = defineProps({
  modalActive: { type: Boolean, default: false },
  closeOnClickOutside: { type: Boolean, default: true },
  onCloseFn: { type: Function, default: null },
  showCloseIcon: { type: Boolean, default: false },
})

const handleClose = () => {
  if (props.onCloseFn) {
    props.onCloseFn()
  }
  emit('close-modal')
}

// Prevent body scrolling when modal is open
watch(
  () => props.modalActive,
  (isActive) => {
    document.body.style.overflow = isActive ? 'hidden' : ''
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="modal-overlay" @click.self="handleClose">
        <Transition name="modal-inner">
          <div v-if="modalActive" class="modal-content">
            <slot />
            <button class="modal-close" @click="handleClose" v-if="showCloseIcon">
              <IconClose />
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 2rem;
  // cursor: pointer;
}

.modal-content {
  position: relative;
  padding: 1rem;
  background: transparent;
  border-radius: 8px;
  max-width: 768px;
  width: 90%;
  height: 80vh;
  max-height: 798px;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #7c8ea2;
  background: #ffffff;
  border: none;
  // padding: 8px 16px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
