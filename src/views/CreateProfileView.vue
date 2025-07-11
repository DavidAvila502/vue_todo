<script setup lang="ts">
import AvatarImage from '@/components/AvatarImage.vue'
import crowImage from '@/assets/images/crow.png'
import pinkSnake from '@/assets/images/pink-snake.png'
import redGirl from '@/assets/images/red-girl.png'
import starGirl from '@/assets/images/star-girl.png'
import whale from '@/assets/images/whale.png'

const localImagesList = [crowImage, pinkSnake, redGirl, starGirl, whale]
</script>

<template>
  <div class="main-container">
    <p class="main-title">Create a profile</p>

    <p class="section-title">Choose a picture</p>
    <div class="picture-selector-container">
      <p class="section-title">Local:</p>

      <div class="picture-container">
        <AvatarImage v-for="(imageSrc, index) in localImagesList" :key="index" :src="imageSrc" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  max-width: 1536px;
  margin: 0 auto;
}

.main-title {
  text-align: center;
  color: #39e58c;
  font-size: 30px;
  font-family: 'Roboto Mono', monospace;
  margin-top: 20px;
}

.picture-selector-container {
  max-width: 1280px;
  width: 100%;
  min-height: 200px;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #2d323b;
  padding: 10px;
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

.picture-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 25px;
}
</style>
