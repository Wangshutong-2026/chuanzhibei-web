<template>
  <div class="header-space"></div>
  <header class="warm-header">
    <!-- 原有背景遮罩 -->
    <div class="header-mask"></div>

    <!-- 🌟 只保留中间的小猫头 -->
    <img src="/cat-center.png" class="header-cat cat-center" alt="中猫" />
    <!-- 内容层（必须在猫猫和遮罩之上） -->
    <div class="header-inner">
      <!-- 左侧 Logo -->
      <RouterLink class="logo" to="/">
        <img class="logo-icon" src="/logo.png" alt="logo" />
        <span class="logo-text">伴宠有方</span>
      </RouterLink>
      <!-- 中间导航 👉全部替换为 RouterLink，自动识别路由高亮active -->
      <nav class="nav-links">
        <RouterLink class="nav-item" to="/">首页</RouterLink>
        <RouterLink class="nav-item" to="/pets">宠物档案</RouterLink>
        <RouterLink class="nav-item" to="/calendar">免疫日历</RouterLink>
        <RouterLink class="nav-item" to="/feed">每日喂食</RouterLink>
        <RouterLink class="nav-item" to="/bill">日常账本</RouterLink>
        <RouterLink class="nav-item" to="/news">养护百科</RouterLink>
      </nav>
      <!-- 右侧按钮 -->
      <div class="header-actions">
        <!-- 未登录：显示登录/注册入口 -->
        <a v-if="!isLoggedIn" href="/login" class="btn-text">登录 / 注册</a>
        <!-- 已登录：显示当前账号名 + 退出菜单 -->
        <div v-else class="user-wrap" @click="menuOpen = !menuOpen">
          <div class="user-avatar">{{ avatarText }}</div>
          <span class="user-name">{{ currentUser }}</span>
          <span class="caret">▾</span>
          <div v-if="menuOpen" class="user-menu" @click.stop>
            <div class="user-menu-item logout" @click="logout">退出登录</div>
          </div>
        </div>

        <button class="btn-solid" @click="$router.push('/pets')">创建档案</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const isLoggedIn = ref(false)
const currentUser = ref('')
const menuOpen = ref(false)
const avatarText = ref('')

// 从本地读取登录状态与当前账号
function refreshUser() {
  const token = localStorage.getItem('petToken')
  const name = localStorage.getItem('petCurrentUser') || ''
  isLoggedIn.value = !!token
  currentUser.value = name
  avatarText.value = name ? name.slice(0, 1).toUpperCase() : ''
  menuOpen.value = false
}

// 退出登录：清空登录态并回到登录页
function logout() {
  localStorage.removeItem('petToken')
  localStorage.removeItem('petCurrentUser')
  refreshUser()
  window.location.href = '/login'
}

onMounted(() => {
  refreshUser()
  window.addEventListener('storage', refreshUser)
})
onBeforeUnmount(() => {
  window.removeEventListener('storage', refreshUser)
})
</script>

<style scoped>
.header-space {
  height: 72px;
}
.warm-header {
  position: fixed; top: 0; left: 0; width: 100%; height: 72px;
  background-image: url('/header-bg.png');
  background-size: 1200px auto;
  background-position: right -20px;
  background-repeat: no-repeat;
  background-color: #FDFAF5;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}
/* 原有遮罩层 */
.header-mask {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(250,246,238, 1) 0%, rgba(250,246,238, 0.9) 25%, rgba(250,246,238, 0) 50%);
  z-index: 1;
  pointer-events: none;
}
/* 猫猫头专属样式 */
.header-cat {
  position: absolute;
  z-index: 2;
  object-fit: contain;
  pointer-events: none;
}
.cat-center {
  height: 50px;
  right: 25%;
  top: 11px;
}
/* 原有内容层 */
.header-inner {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto; height: 100%;
  display: flex; justify-content: space-between; align-items: center; padding: 0 32px;
}
/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
}
.logo-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(252, 96, 118, 0.3);
  object-fit: cover; /* 图片不变形，裁切适配 */
}

.logo-text { font-size: 22px; font-weight: 900; color: #1A2B4C; letter-spacing: 0.5px; }

/* ========= RouterLink导航样式 ========= */
.nav-links {
  display: flex;
  gap: 8px;
}
.nav-item {
  font-size: 16px;
  font-weight: 600;
  color: #5E6B82;
  text-decoration: none;
  transition: all 0.3s;
  padding: 8px 18px;
  border-radius: 20px;
}
/* ✅RouterLink自动添加的active类，路由匹配自动生效 */
.nav-item.router-link-active {
  color: #D9531E;
  background: #FFE8CC;
  font-weight: 800;
}
.nav-item:hover {
  color: #D9531E;
  background: #FFE8CC;
}

/* 右侧操作 */
.header-actions { display: flex; align-items: center; gap: 20px; position: relative; }
.btn-text {
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #5E6B82;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
}
.btn-text:hover { color: #FF8C42; }

/* ===== 已登录用户区 ===== */
.user-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  padding: 6px 10px;
  border-radius: 24px;
  transition: 0.3s;
}
.user-wrap:hover { background: #FFE8CC; }
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9A44 0%, #FC6076 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(252, 96, 118, 0.3);
}
.user-name {
  font-size: 15px;
  font-weight: 700;
  color: #1A2B4C;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.caret { font-size: 12px; color: #8892A0; }
.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #FFFDF9;
  border: 1px dashed #D4A373;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  min-width: 120px;
  padding: 6px;
  z-index: 1100;
}
.user-menu-item {
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #5E6B82;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
.user-menu-item.logout:hover { color: #E34D59; background: #FFF0F1; }

/* 按钮 */
.btn-solid {
  background: #1A2B4C; color: #FFF; border: none; padding: 12px 28px;
  border-radius: 30px; font-size: 15px; font-weight: 600; cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(26,43,76,0.15);
}
.btn-solid:hover {
  background: #0F1A2E;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 140, 66, 0.3);
}
</style>
