<script setup lang="ts">
// import { ref } from "vue";

// defineProps<{ msg: string }>();

// const count = ref(0);
</script>

<template>
  <div class="hero">
    <div class="hero_search">
      <input placeholder="Search for photo..." />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 300px;
  background-color: #dce3cb;
  display: grid;
  place-items: center;

  &_search {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      width: 50%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      outline: none;
    }
  }
}
</style>
