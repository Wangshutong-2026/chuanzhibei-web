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
      <div class="logo" @click="$router.push('/')">
        <div class="logo-icon"></div>
        <span class="logo-text">伴宠有方</span>
      </div>
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
        <button class="btn-text" @click="$router.push('/login')">登录 / 注册</button>
        <button class="btn-solid" @click="$router.push('/pets')">创建档案</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
.logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.logo-icon {
  width: 26px; height: 26px;
  background: linear-gradient(135deg, #FF9A44 0%, #FC6076 100%);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(252, 96, 118, 0.3);
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
.header-actions { display: flex; align-items: center; gap: 20px; }
.btn-text {
  background: none; border: none; font-size: 15px; font-weight: 600;
  color: #5E6B82; cursor: pointer; transition: 0.3s;
}
.btn-text:hover { color: #FF8C42; }
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
