<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
</script>

<template>
  <main>
    <PageHeader />

    <RouterView class="" v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
}
</style>
