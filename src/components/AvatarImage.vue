<script setup lang="ts">
const props = defineProps<{ src: string }>()
</script>

<template>
  <img :src="props.src" alt="crow.png" />
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
