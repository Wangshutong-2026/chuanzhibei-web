import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue' 

import Workspace from '../views/Workspace.vue' 

import News from '../views/News.vue' 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: Workspace
  },
  {
    path: '/news',
    name: 'News',
    component: News
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router