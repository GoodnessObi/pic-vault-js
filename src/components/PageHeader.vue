<script setup lang="ts">
import { ref } from 'vue'
import IconSearch from './icons/IconSearch.vue'

const emit = defineEmits(['update:search'])

const searchInput = ref('')

let timeout: ReturnType<typeof setTimeout>

const handleSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('update:search', searchInput.value.trim())
  }, 5000)
}
</script>

<template>
  <div class="hero">
    <div class="hero_search">
      <span>
        <IconSearch />
      </span>
      <input
        v-model="searchInput"
        placeholder="Search for photo..."
        @input="handleSearch"
        @keyup.enter="emit('update:search', searchInput.trim())"
      />
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
      width: 100%;
    }
  }
}
</style>
