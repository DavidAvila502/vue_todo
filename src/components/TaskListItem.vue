<script setup lang="ts">
import type { Task } from '@/types/types'
import TrashIcon from './icons/TrashIcon.vue'
import EditIcon from './icons/EditIcon.vue'
import { ref, watch } from 'vue'
import CheckIcon from './icons/CheckIcon.vue'

const props = defineProps<{ task: Task; profileColor?: string }>()
const emit = defineEmits<{
  (e: 'on-delete', taskId: number): void
  (e: 'on-update-description', newDescription: string, taskId: number): void
  (e: 'on-toggle-check', taskId: number, checkState: boolean): void
}>()

const taskDescription = ref<string>(props.task.description)

watch(
  () => props.task.description,
  (newDescriptionValue) => (taskDescription.value = newDescriptionValue),
)

const isEditing = ref<boolean>(false)

const onDelete = () => {
  if (!props.task.id) return
  emit('on-delete', props.task.id)
}

const onUpdateDescription = () => {
  if (!props.task.id) return
  emit('on-update-description', taskDescription.value, props.task.id)

  isEditing.value = false
}

const customColor = props.profileColor ? props.profileColor : '#39e58c'

const onToggleComplete = () => {
  if (!props.task.id) return

  emit('on-toggle-check', props.task.id, !props.task.isCompleted)
}
</script>

<template>
  <div class="task-item-container" :style="{ '--custom-color': customColor }">
    <div @click="onToggleComplete" class="task-item-checker" v-if="!props.task.isCompleted"></div>
    <div
      @click="onToggleComplete"
      class="task-item-checker task-item-check"
      v-if="props.task.isCompleted"
    >
      <CheckIcon />
    </div>

    <input
      class="task-item-description"
      v-model="taskDescription"
      :readonly="!isEditing"
      type="text"
      :style="{ '--custom-color': customColor }"
      :class="{ 'description-editing': isEditing }"
      @click="!isEditing && onToggleComplete()"
    />

    <div class="task-item-buttons-container">
      <div class="task-item-button" @click="onDelete" v-if="!isEditing">
        <TrashIcon />
        <p>Delete</p>
      </div>

      <div class="task-item-button" @click="isEditing = true" v-if="!isEditing">
        <EditIcon />
        <p>Edit</p>
      </div>

      <div class="task-item-button" @click="onUpdateDescription" v-if="isEditing">
        <EditIcon />
        <p>Save</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0e1217;
  min-height: 60px;
  border-left: 5px solid var(--custom-color);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.task-item-checker {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  border: 1px solid white;
  background-color: #1c1f26;
  margin-left: 20px;
  color: white;
}

.task-item-check {
  background-color: #4dc85a;
}

.task-item-description {
  color: white;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  background-color: #0e1217;
  outline: none;
  border: none;
  font-size: 15px;
  flex: 1;
  cursor: pointer;
}

.description-editing {
  color: var(--custom-color);
  cursor: auto;
}

.task-item-buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: row;
  margin-right: 10px;
}

.task-item-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 2px;
  color: white;
  font-family: 'Roboto Mono', monospace;
  cursor: pointer;
  font-size: 14px;
}
</style>
