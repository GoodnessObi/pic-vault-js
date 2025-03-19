<template>
  <transition-group name="fade" tag="div" class="boxes">
    <div v-for="index in 6" :key="index" class="boxes-card">
      <div class="boxes-info">
        <span></span>
        <span></span>
      </div>
    </div>
  </transition-group>
</template>

<style lang="scss" scoped>
.boxes {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 3rem;
  row-gap: 2rem;
  grid-auto-flow: row dense;
  grid-template-rows: masonry;

  @include mq($screen-mobile) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mq($screen-tablet) {
    grid-template-columns: repeat(3, 1fr);
  }

  &-card {
    width: 100%;
    height: 100px;
    padding: 24px 16px;
    display: flex;
    grid-row: auto / span 1;
    background: linear-gradient(100deg, #f6f6f6, #ccd1d6, #f6f6f6);
    background-size: 300% 100%;
    border-radius: 8px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    animation:
      colorFlow 2s infinite linear,
      fadeIn 0.5s ease-in-out forwards;

    &:nth-child(1n) {
      grid-row: auto / span 7;
      height: 350px;
    }

    &:nth-child(2n) {
      grid-row: auto / span 9;
      height: 450px;
    }

    &:nth-child(3n) {
      grid-row: auto / span 8;
      height: 400px;
    }
  }

  &-info {
    width: 100%;
    margin-top: auto;

    span {
      display: block;
      background-color: #e7e7e7;
      width: 30%;
      height: 16px;
      border-radius: 4px;

      &:first-of-type {
        width: 50%;
        margin-bottom: 10px;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes colorFlow {
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
