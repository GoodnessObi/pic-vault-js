<script setup lang="ts">
import IconSearch from './icons/IconSearch.vue'
// import { ref } from "vue";

// defineProps<{ msg: string }>();

// const count = ref(0);
</script>

<template>
  <div class="hero">
    <div class="hero_search">
      <span>
        <IconSearch />
      </span>
      <input placeholder="Search for photo..." />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 300px;
  background-color: #dce3eb;
  display: grid;
  place-items: center;

  &_search {
    width: 80%;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 8px;

    span {
      padding: 12px;
      padding-right: 0;
    }

    input {
      padding: 10px;
      border: none;
      outline: none;
      color: #2d3849;
    }
  }
}
</style>
