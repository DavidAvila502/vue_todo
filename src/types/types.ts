export interface ProfileData {
  id?: number
  localImage: string | null
  solidColor: string | null
  remoteImage: string | null
  profileName: string | null
}

export interface Task {
  id?: number
  profileId: number
  isCompleted: boolean
  description: string
}
