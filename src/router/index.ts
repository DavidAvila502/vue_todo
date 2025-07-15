import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicLayout from '@/app/layouts/PublicLayout.vue'
import CreateProfileView from '@/views/CreateProfileView.vue'
import AuthGuardLayout from '@/app/layouts/AuthGuardLayout.vue'
import PrivateLayout from '@/app/layouts/PrivateLayout.vue'
import TasksView from '@/views/TasksView.vue'
import MyProfileView from '@/views/MyProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: '/create-profile', name: 'create-profile', component: CreateProfileView },
      ],
    },

    {
      path: '/app',
      component: AuthGuardLayout,
      children: [
        {
          path: '',
          component: PrivateLayout,
          children: [
            { path: '', name: 'tasks', component: TasksView },
            { path: '/my-profile', name: 'my-profile', component: MyProfileView },
          ],
        },
      ],
    },
  ],
})

export default router
