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

    const listSize = allTasks.value[profileId].length
    const lastTask: Task | undefined = allTasks.value[profileId][listSize - 1]
    const lastID: number | undefined = lastTask ? lastTask.id : undefined

    if (!lastID) {
      newTask.id = 1
      allTasks.value[profileId].push(newTask)
      return
    }

    newTask.id = lastID + 1
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

  function updateTaskDescription(taskDescription: string, taskId: number, profileId: number) {
    const tasks = allTasks.value[profileId]
    if (!tasks) return

    const task = allTasks.value[profileId].find((currentT) => currentT.id == taskId)
    if (!task) return

    task.description = taskDescription
  }

  function getTasksFromProfile(profileId: number): Task[] {
    const tasks = allTasks.value[profileId]
    if (!tasks) return []
    return tasks
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

  return {
    allTasks,
    createTask,
    deleteTask,
    completeTask,
    unCompleteTask,
    updateTaskDescription,
    getTasksFromProfile,
  }
})
