import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MessagesView from '../views/MessagesView.vue'

const routes = [
  {
    path: '/',          // URL path เวลาเปิดเว็บ
    name: 'home',
    component: HomeView
  },
  {
    path: '/messages',  // URL path เวลาเปิดเว็บ /messages
    name: 'messages',
    component: MessagesView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
