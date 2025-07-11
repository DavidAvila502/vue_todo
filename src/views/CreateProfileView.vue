<template>
  <div class="create-profile-main-container">
    <p class="main-title">Create a profile</p>

    <p class="section-title">Choose a style</p>
    <div class="picture-selector-container">
      <p class="section-title">Local image:</p>

      <div class="picture-container">
        <AvatarStyleSelector
          v-for="(data, index) in avatarSelectorData"
          :key="index"
          :local-image="data.image"
          :color="data.color"
          :index="index"
          :profile-data="profileData"
          @update-profile="onUpdateProfile"
        />
      </div>

      <p class="section-title">Pick a color:</p>
      <div class="picture-container">
        <AvatarStyleSelector
          v-for="(data, index) in avatarSelectorData"
          :index="index"
          :color="data.color"
          :key="index"
          :local-image="undefined"
          :profile-data="profileData"
          @update-profile="onUpdateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import crowImage from '@/assets/images/crow.png'
import pinkSnake from '@/assets/images/pink-snake.png'
import redGirl from '@/assets/images/red-girl.png'
import starGirl from '@/assets/images/star-girl.png'
import whale from '@/assets/images/whale.png'
import AvatarStyleSelector from '@/components/AvatarStyleSelector.vue'
import type { ProfileData } from '@/types/types'
import { ref } from 'vue'

const avatarSelectorData: { image: string; color: string }[] = [
  { image: crowImage, color: '#003547' },
  { image: pinkSnake, color: '#005E54' },
  { image: redGirl, color: '#C2BB00' },
  { image: starGirl, color: '#E1523D' },
  { image: whale, color: '#ED8B16' },
]

const profileData = ref<ProfileData>({
  localImage: avatarSelectorData[0].image,
  solidColor: avatarSelectorData[0].color,
  remoteImage: '',
  profileName: '',
})

const onUpdateProfile = (newProfileData: ProfileData) => {
  profileData.value = newProfileData
}
</script>

<style scoped>
.create-profile-main-container {
  min-height: 100vh;
  max-width: 1536px;
  margin: 0 auto;
}

.main-title {
  text-align: center;
  color: #39e58c;
  font-size: 30px;
  font-family: 'Roboto Mono', monospace;
  margin-top: 20px;
}

.picture-selector-container {
  max-width: 1280px;
  width: 100%;
  min-height: 200px;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #2d323b;
  padding: 10px;
}

.section-title {
  margin-top: 20px;
  color: white;
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Roboto Mono', monospace;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.picture-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 25px;
}
</style>
