import type { ProfileData } from '@/types/types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProfilesStore = defineStore('profiles', () => {
  //localStorage values
  const stored = localStorage.getItem('profiles')

  const profiles = ref<ProfileData[]>(stored ? JSON.parse(stored) : [])

  function addProfile(newProfile: ProfileData) {
    const nexId =
      (profiles.value.length > 0 ? profiles.value[profiles.value.length - 1].id! : 0) + 1

    profiles.value.push({ ...newProfile, id: nexId })
  }

  function removeProfile(id: number) {
    const updatedProfileList: ProfileData[] = profiles.value.filter((profile) => profile.id != id)

    profiles.value = updatedProfileList
  }

  // save in local storage
  watch(
    profiles,
    (newValue) => {
      localStorage.setItem('profiles', JSON.stringify(newValue))
    },
    { deep: true },
  )

  return { profiles, addProfile, removeProfile }
})
