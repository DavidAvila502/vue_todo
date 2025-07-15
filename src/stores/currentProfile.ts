import type { ProfileData } from '@/types/types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCurrentProfileStore = defineStore('current-profile', () => {
  const stored = localStorage.getItem('current-profile')

  let parsedProfile: ProfileData | null = null
  try {
    parsedProfile = stored ? JSON.parse(stored) : null
  } catch (e) {
    console.warn('Invalid profile data in localStorage', e)
  }

  const currentProfile = ref<ProfileData | null>(parsedProfile)

  function loginWithProfile(profile: ProfileData) {
    currentProfile.value = profile
  }

  function logout() {
    currentProfile.value = null
  }

  watch(
    currentProfile,
    (newProfileData) => {
      if (!newProfileData) {
        localStorage.removeItem('current-profile')
        return
      }
      localStorage.setItem('current-profile', JSON.stringify(newProfileData))
    },
    { deep: true },
  )

  return { currentProfile, loginWithProfile, logout }
})
