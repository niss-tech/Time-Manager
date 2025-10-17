import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/Profile', component: Profile },
  { path: '/Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
