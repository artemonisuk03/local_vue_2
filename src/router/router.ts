import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import NewsPage from '@/pages/NewsPage.vue'
import EventsPage from '@/pages/EventsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         component: DashboardPage, meta: { layout: 'default' } },
    { path: '/news',     component: NewsPage,       meta: { layout: 'default' } },
    { path: '/events',   component: EventsPage,     meta: { layout: 'default' } },
    { path: '/tasks',    component: TasksPage,      meta: { layout: 'default' } },
    { path: '/login',    component: LoginPage,      meta: { layout: 'auth'    } },
    { path: '/register', component: RegisterPage,   meta: { layout: 'auth'    } },
  ],
})

export default router
