import type { Task } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const allTasks = ref<Record<number, Task[]>>({})

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

  return { allTasks, createTask, deleteTask, completeTask }
})
