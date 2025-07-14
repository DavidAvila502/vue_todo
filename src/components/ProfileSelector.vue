<script setup lang="ts">
const props = defineProps<{ profileImage: string; profileName: string }>()
</script>

<template>
  <div class="profile-selector-main-container">
    <img class="profile-selector-image" :src="props.profileImage" :alt="profileName + '.png'" />

    <p class="profile-name">{{ props.profileName }}</p>
  </div>
</template>

<style scoped>
.profile-selector-main-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  max-width: 200px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.profile-selector-image {
  border-radius: 100%;
  width: 120px;
  height: 120px;
}

.profile-name {
  text-align: center;
  color: white;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  text-overflow: ellipsis;
}

.profile-selector-main-container:hover .profile-name {
  color: #39e58c;
}
</style>
