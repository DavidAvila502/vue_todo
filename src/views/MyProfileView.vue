<script setup lang="ts">
import { useCurrentProfileStore } from '@/stores/currentProfile'
import { useRouter } from 'vue-router'

const { currentProfile, logout } = useCurrentProfileStore()
const baseColor = currentProfile?.solidColor ? currentProfile.solidColor : '#39e58c'
const router = useRouter()

const onLogout = () => {
  logout()
  router.replace('/')
}
</script>

<template>
  <div class="my-profile-main-container">
    <div class="profile-container">
      <p class="profile-name">{{ currentProfile?.profileName }}</p>

      <div class="avatar" :style="{ backgroundColor: baseColor }">
        <img
          class="avatar-image"
          v-if="currentProfile?.localImage"
          :src="currentProfile?.localImage"
          alt="profileImage.png"
        />
      </div>

      <button @click="onLogout" class="logout-button" type="button">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.my-profile-main-container {
  min-height: 100vh;
}

.profile-container {
  max-width: 1536px;
  width: 100%;
  min-height: 400px;
  border: 1px solid #2d323b;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
}
.profile-name {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 30px;
  color: white;
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 1px solid #2d323b;
  background-color: #39e58c;
}
.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.logout-button {
  background-color: #d10f33;
  color: white;
  font-weight: bold;
  padding: 8px;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
}
</style>
