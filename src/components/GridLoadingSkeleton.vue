<template>
  <!-- <div > -->
  <transition-group name="fade" tag="div" class="boxes-con">
    <div v-for="index in 6" :key="index" class="boxes">
      <div class="box-info">
        <span></span>
        <span></span>
      </div>
    </div>
  </transition-group>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
.boxes-con {
  position: absolute;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  top: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  row-gap: 1.5rem;
  grid-auto-flow: row dense;
  padding: 10px;
  grid-template-rows: masonry;
}

.boxes {
  width: 100%;
  height: 100px;
  padding: 10px;
  display: flex;
  grid-row: auto / span 1;
  background: #f6f6f6;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

.boxes:nth-child(odd) {
  grid-row: auto / span 4;
  height: 400px;
}

.boxes:nth-child(even) {
  grid-row: auto / span 5;
  height: 500px;
}

.box-info {
  width: 100%;
  margin-top: auto;

  span {
    display: block;
    background-color: #e7e7e7;
    width: 30%;
    height: 8px;
    border-radius: 4px;

    &:first-of-type {
      width: 50%;
      margin-bottom: 10px;
    }
  }
}

/* Fade-in animation */
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

/* Vue Transition */
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
