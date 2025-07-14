<script setup lang="ts">
import ProfileSelector from '@/components/ProfileSelector.vue'
import { useProfilesStore } from '@/stores/profiles'

const { profiles } = useProfilesStore()
</script>

<template>
  <div class="home-main-container">
    <p class="main-title">Profiles</p>

    <seciton class="section-profile-selector">
      <p class="section-title">Select a profile</p>

      <div class="profile-selector-container">
        <profile-selector
          v-for="(profileData, index) in profiles"
          :key="index"
          :profile-image="profileData.localImage!"
          :profile-name="profileData.profileName!"
        />
      </div>
    </seciton>
  </div>
</template>

<style scoped>
.home-main-container {
  min-height: 100vh;
  max-width: 1536px;
  margin: 0 auto;
  padding: 10px;
  /* background-color: aliceblue; */
}

.main-title {
  text-align: center;
  color: #39e58c;
  font-size: 30px;
  font-family: 'Roboto Mono', monospace;
  margin-top: 20px;
}
.section-profile-selector {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.section-title {
  color: white;
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Roboto Mono', monospace;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.profile-selector-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
</style>
