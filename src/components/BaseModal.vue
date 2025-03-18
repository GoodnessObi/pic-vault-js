<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="modal-overlay" @click.self="handleClose">
        <Transition name="modal-inner">
          <div v-if="modalActive" class="modal-content">
            <slot />
            <button class="modal-close" @click="handleClose">Close</button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const emit = defineEmits(['close-modal'])
const props = defineProps({
  modalActive: { type: Boolean, default: false },
  closeOnClickOutside: { type: Boolean, default: true },
  onCloseFn: { type: Function, default: null },
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

<style lang="scss" scoped>
$primary-color: #1e90ff;

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
  padding: 0 2rem;
  // cursor: pointer;
}

.modal-content {
  padding: 1rem;
  background: transparent;
  border-radius: 8px;
  max-width: 768px;
  width: 100%;
  text-align: center;
}

.modal-close {
  color: #fff;
  margin-top: 1rem;
  background: $primary-color;
  padding: 0.5rem 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

/* Transition Animations */
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
