<script setup lang="ts">
import { useCurrentProfileStore } from '@/stores/currentProfile'
import { useTasksStore } from '@/stores/tasks'
import type { Task } from '@/types/types'
import { computed, ref } from 'vue'

const { currentProfile } = useCurrentProfileStore()
const { getTasksFromProfile, createTask } = useTasksStore()

const profileColor: string = currentProfile?.solidColor ? currentProfile.solidColor : '#39e58c'

const createTaskData = ref<Task>({
  description: '',
  isCompleted: false,
  profileId: currentProfile?.id ? currentProfile.id : 0,
})

const filterParams = ref<{ all: boolean; pending: boolean; completed: boolean }>({
  all: true,
  pending: false,
  completed: false,
})

const profileAllTasks = computed(() => {
  return currentProfile?.id ? getTasksFromProfile(currentProfile.id) : []
})

const filterData = computed(() => {
  if (filterParams.value.all) return profileAllTasks.value

  if (filterParams.value.completed)
    return profileAllTasks.value.filter((task) => task.isCompleted == true)

  if (filterParams.value.pending)
    return profileAllTasks.value.filter((task) => task.isCompleted == false)

  return []
})

const onCreateTask = () => {
  if (!currentProfile?.id) return

  console.log(createTaskData.value)
  createTask({ ...createTaskData.value }, currentProfile.id)
  createTaskData.value.description = ''
}
</script>

<template>
  <div class="task-view-main-container">
    <div class="tasks-container">
      <div class="tasks-container-header" :style="{ background: profileColor }">
        <p class="tasks-container-header-title">My Tasks</p>
      </div>

      <form @submit.prevent="onCreateTask" class="tasks-add-field-container">
        <input
          v-model="createTaskData.description"
          class="tasks-add-field"
          :style="{ '--profile-color': profileColor }"
          type="text"
          placeholder="Enter a task"
        />
        <button type="submit" class="tasks-add-button" :style="{ '--profile-color': profileColor }">
          +Add
        </button>
      </form>

      <div class="divider"></div>

      <div class="tasks-filters-container">
        <button
          class="task-filter-button"
          :class="{ 'task-filter-button-active': filterParams.all }"
          :style="{ '--profile-color': profileColor }"
          @click="() => (filterParams = { all: true, completed: false, pending: false })"
        >
          All
        </button>
        <button
          class="task-filter-button"
          :class="{ 'task-filter-button-active': filterParams.pending }"
          :style="{ '--profile-color': profileColor }"
          @click="() => (filterParams = { all: false, completed: false, pending: true })"
        >
          Pending
        </button>
        <button
          class="task-filter-button"
          :class="{ 'task-filter-button-active': filterParams.completed }"
          :style="{ '--profile-color': profileColor }"
          @click="() => (filterParams = { all: false, completed: true, pending: false })"
        >
          Completed
        </button>
      </div>

      <div class="tasks-list-container">
        <div v-for="(currentTask, index) in filterData" :key="index">
          {{ currentTask }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-view-main-container {
  min-height: 100vh;
  max-width: 1536px;
  margin: 0 auto;
  padding: 10px;
}

.tasks-container {
  max-width: 1280px;
  width: 100%;
  min-height: 300px;
  background: #1c1f26;
  margin: 0 auto;
  border-radius: 20px;
}

.tasks-container-header {
  padding: 8px;
  width: 100%;
  background-color: blue;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tasks-container-header-title {
  font-family: 'Roboto Mono', monospace;
  font-size: 25px;
  color: white;
}

.tasks-add-field-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px 10px 30px 10px;
  gap: 20px;
}

.tasks-add-field {
  width: 60%;
  font-size: 20px;
  padding: 7px;
  border: 2px solid transparent;
}
.tasks-add-field:focus {
  outline: none;
  border: 2px solid var(--profile-color);
}

.tasks-add-button {
  font-size: 20px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: var(--profile-color);
  cursor: pointer;
}

.tasks-filters-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.task-filter-button {
  background-color: #1a1f26;
  color: white;
  padding: 5px 10px 5px 10px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.task-filter-button-active {
  background-color: var(--profile-color);
}

.divider {
  height: 1px;
  background-color: gray;
  width: 100%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
}

.tasks-list-container {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
