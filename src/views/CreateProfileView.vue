<script setup lang="ts">
import crowImage from '@/assets/images/crow.png'
import pinkSnake from '@/assets/images/pink-snake.png'
import redGirl from '@/assets/images/red-girl.png'
import starGirl from '@/assets/images/star-girl.png'
import whale from '@/assets/images/whale.png'
import AvatarStyleSelector from '@/components/AvatarStyleSelector.vue'
import type { ProfileData } from '@/types/types'
import { computed, ref } from 'vue'
import { useProfilesStore } from '@/stores/profiles'

const { profiles, addProfile } = useProfilesStore()

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

const profileDataErrors = ref({
  profileName: computed(() => verifyProfileName(profileData.value.profileName)),
})

const verifyProfileName = (profileName: string | null) => {
  if (profileName) {
    return profileName.length <= 1 ? 'El nombre debe tener al menos dos caracteres.' : null
  }

  return null
}

const onUpdateProfile = (newProfileData: ProfileData) => {
  profileData.value = newProfileData
}

const submitted = ref<boolean>(false)

const handleSubmit = () => {
  const isNameTaken: boolean = profiles.some((p) => p.profileName == profileData.value.profileName)

  if (isNameTaken) {
    alert('El nombre de perfil ya fue tomado.')
    return
  }

  addProfile(profileData.value)
  submitted.value = true
}
</script>

<template>
  <div class="create-profile-main-container">
    <p class="main-title">Create a profile</p>

    <p class="section-title">Choose a style</p>
    <div class="profile-style-container">
      <!-- select a local image -->
      <p class="section-title">Local image:</p>

      <div class="style-selectors-container">
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
      <!-- pick a solid color -->
      <p class="section-title">Pick a color:</p>
      <div class="style-selectors-container">
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
      <!-- Enter a name -->
      <form @submit.prevent="handleSubmit" class="profile-form">
        <label for="profile-name" class="section-title">Enter a profile name:</label>
        <input
          id="profile-name"
          class="profile-name-input"
          type="text"
          placeholder="Profile name"
          v-model="profileData.profileName"
        />
        <div class="form-alert-container">
          <p class="form-errors" v-if="profileDataErrors.profileName">
            {{ profileDataErrors.profileName }}
          </p>
        </div>

        <button class="profile-form-button" type="submit">Accept</button>
        <div class="form-alert-container">
          <p v-if="submitted" class="profile-created-text">¡Profile created!</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.create-profile-main-container {
  min-height: 100vh;
  max-width: 1536px;
  margin: 0 auto;
  padding: 10px;
}

.main-title {
  text-align: center;
  color: #39e58c;
  font-size: 30px;
  font-family: 'Roboto Mono', monospace;
  margin-top: 20px;
}

.profile-style-container {
  max-width: 1280px;
  width: 100%;
  min-height: 200px;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #2d323b;
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

.style-selectors-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 25px;
  justify-content: center;
}

.profile-form {
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 20px;
}

.profile-name-input {
  font-size: 22px;
  font-family: 'Roboto Mono', monospace;
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 8px;
}

.profile-name-input:focus {
  outline: none;
  border: 1px solid #39e58c;
}
.profile-form-button {
  width: 200px;
  margin: 0 auto;
  background-color: transparent;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
  border: 1px solid #2d323b;
}

.profile-created-text {
  color: #39e58c;
  font-size: 20px;
  text-align: center;
}

.form-errors {
  font-family: 'Roboto Mono', monospace;
  color: red;
}

.form-alert-container {
  min-height: 22px;
}

@media (width < 1024px) {
  .profile-form {
    width: 90%;
  }
}
</style>
