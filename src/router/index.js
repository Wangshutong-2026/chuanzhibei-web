import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PetArchive from '../views/PetArchive.vue' 

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/news', 
    name: 'News', 
    component: () => import('../views/News.vue') // 你之前写好的新闻页
  },
  {
    path: '/pets',          // 浏览器地址栏显示的路径
    name: 'Pets',    // 路由名字
    component: PetArchive  // 对应上面引入的组件
  }

  // ⚠️ 下面这些等你建好对应的空文件了，再把它们解除注释：
  // { path: '/pet-list', name: 'PetList', component: () => import('../views/pet-list.vue') },
  // { path: '/bill', name: 'Bill', component: () => import('../views/bill.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router