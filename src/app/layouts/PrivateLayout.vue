<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import { RouterView } from 'vue-router'

const privateLayoutRoutesData = [
  { labelRoute: 'Tasks', route: '/app' },
  { labelRoute: 'My profile', route: '/my-profile' },
]
</script>

<template>
  <header>
    <MainNavbar :routes-data="privateLayoutRoutesData" />
  </header>

  <main>
    <RouterView />
  </main>

  <footer></footer>
</template>

<style scoped>
header {
  position: fixed;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #2d323b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
  padding-left: 20px;
  background: #0e1217;
}

main {
  padding-top: 60px;
  background: #0e1217;
}
</style>
