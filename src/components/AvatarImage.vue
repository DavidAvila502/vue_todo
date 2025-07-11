<script setup lang="ts">
const props = defineProps<{ localImage?: string; solidColor: string; remoteImage?: string }>()
</script>

<template>
  <img :src="props.localImage" alt="crow.png" />
</template>

<style scoped>
img {
  border-radius: 100%;
  height: 150px;
  width: 150px;
  cursor: pointer;
  border: 1px solid white;
}
</style>
