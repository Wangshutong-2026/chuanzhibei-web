import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PetArchive from '../views/PetArchive.vue'
import PetBillPage from '../views/PetBillPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { keepAlive: true } },
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/pets', name: 'Pets', component: PetArchive },
  { path: '/bill', name: 'Bill', component: PetBillPage, meta: { keepAlive: true } },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/feed', name: 'Feed', component: () => import('../views/Feed.vue') },
  { path: '/calendar', name: 'Calendar', component: () => import('../views/Calendar.vue'), meta: { keepAlive: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
