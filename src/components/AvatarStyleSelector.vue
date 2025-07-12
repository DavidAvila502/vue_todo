<template>
  <div
    @click="setNewProfileData"
    class="avatar-style-selector-main-container"
    :class="{ selected: isSelected }"
    :style="{ backgroundColor: props.color }"
  >
    <img class="avatar-style-image" v-if="localImage" :src="localImage" :alt="index.toString()" />
  </div>
</template>

<script setup lang="ts">
import type { ProfileData } from '@/types/types'
import { computed } from 'vue'

const props = defineProps<{
  localImage?: string
  color: string
  index: number
  profileData: ProfileData
}>()
const emit = defineEmits<{ (e: 'update-profile', data: ProfileData): void }>()

const setNewProfileData = () => {
  const hasImage = props.localImage ? true : false

  const property = hasImage ? 'localImage' : 'solidColor'
  const value = property == 'localImage' ? props.localImage : props.color

  emit('update-profile', { ...props.profileData, [property]: value })
}

const isSelected = computed(() => {
  const hasImage = props.localImage ? true : false
  const property = hasImage ? 'localImage' : 'solidColor'
  const value = property == 'localImage' ? props.localImage : props.color

  return props.profileData[property] === value
})
</script>

<style scoped>
.avatar-style-selector-main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 120px;
  height: 120px;
  cursor: pointer;
  border: 3px solid black;
}

.avatar-style-image {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.selected {
  border: 3px solid #39e58c;
}
</style>
