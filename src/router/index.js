import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PetArchive from '../views/PetArchive.vue'
import PetBillPage from '../views/PetBillPage.vue'
import VaccineCalendar from '../components/VaccineCalendar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { keepAlive: true }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },
  {
    path: '/pets',
    name: 'Pets',
    component: PetArchive
  },
 {
    path: '/bill',
    name: 'Bill',
    component: PetBillPage,
    meta: { keepAlive: true }
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
    meta: { keepAlive: true }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置路由守卫 ——虚拟账号登录权限控制
router.beforeEach((to, from, next) => {
  // 白名单：不需要登录就能访问的路由
  const whiteList = ['/', '/login']
  const token = localStorage.getItem('petToken')

  if (whiteList.includes(to.path)) {
    // 访问白名单页面
    if (to.path === '/login' && token) {
      // 已经登录还去登录页 → 跳转到首页
      next('/')
    } else {
      next()
    }
  } else {
    // 非白名单页面，校验登录凭证
    if (token) {
      next()
    } else {
      // 无token，重定向登录页
      next('/login')
    }
  }
})

export default router
