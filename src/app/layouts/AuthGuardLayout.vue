<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCurrentProfileStore } from '@/stores/currentProfile'
import { watchEffect, computed } from 'vue'

const router = useRouter()
const { currentProfile } = useCurrentProfileStore()

const isAuthenticated = computed(() => (currentProfile ? true : false))

watchEffect(() => {
  if (!currentProfile) {
    router.replace('/')
  }
})
</script>

<template>
  <RouterView v-if="isAuthenticated" />
</template>
