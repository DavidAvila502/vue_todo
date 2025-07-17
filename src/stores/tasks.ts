import type { Task } from '@/types/types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const allTaskStored = localStorage.getItem('all-tasks')

  let allTasksParsedData: Record<number, Task[]> | null = null

  try {
    allTasksParsedData = allTaskStored ? JSON.parse(allTaskStored) : null
  } catch (e) {
    console.warn(`Error: ${(e as Error).message}`)
  }

  const allTasks = ref<Record<number, Task[]>>(allTasksParsedData ?? {})

  function createTask(newTask: Task, profileId: number) {
    if (!allTasks.value[profileId]) {
      allTasks.value[profileId] = []
    }
    allTasks.value[profileId].push(newTask)
  }

  function deleteTask(taskId: number, profileId: number) {
    const tasks = allTasks.value[profileId]
    if (!tasks) return
    allTasks.value[profileId] = tasks.filter((t) => t.id !== taskId)
  }

  function completeTask(taskId: number, profileId: number) {
    const tasks = allTasks.value[profileId]
    if (!tasks) return
    const task = tasks.find((t) => t.id === taskId)
    if (task) task.isCompleted = true
  }

  function unCompleteTask(taskId: number, profileId: number) {
    const tasks = allTasks.value[profileId]
    if (!tasks) return
    const task = tasks.find((t) => t.id == taskId)
    if (task) task.isCompleted = false
  }

  watch(
    allTasks.value,
    (newTasksData) => {
      if (!newTasksData) {
        localStorage.removeItem('all-tasks')
        return
      }
      localStorage.setItem('all-tasks', JSON.stringify(newTasksData))
    },
    { deep: true },
  )

  return { allTasks, createTask, deleteTask, completeTask, unCompleteTask }
})
