import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/testpage/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/testpage',
      component: index,
    },
  ],
})

export default router
