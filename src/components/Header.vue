<template>
  <div class="header-space"></div>
  <header class="warm-header">
    <div class="header-mask"></div>
    <img src="/cat-center.png" class="header-cat cat-center" alt="中猫" />
    <div class="header-inner">
      <!-- logo改用RouterLink，移除@click="$router.push" -->
      <RouterLink class="logo" to="/">
        <img class="logo-icon" src="/logo.png" alt="logo" />
        <span class="logo-text">伴宠有方</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink class="nav-item" to="/">首页</RouterLink>
        <RouterLink class="nav-item" to="/pets">宠物档案</RouterLink>
        <RouterLink class="nav-item" to="/calendar">免疫日历</RouterLink>
        <RouterLink class="nav-item" to="/feed">每日喂食</RouterLink>
        <RouterLink class="nav-item" to="/bill">日常账本</RouterLink>
        <RouterLink class="nav-item" to="/news">养护百科</RouterLink>
      </nav>

      <div class="header-actions">
        <!-- 登录注册，原生a标签保证一定能打开登录页 -->
        <a href="/login" class="btn-text">登录 / 注册</a>
        <!-- 创建档案改成RouterLink -->
        <RouterLink class="btn-solid" to="/pets">创建档案</RouterLink>
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
.header-mask {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(250,246,238, 1) 0%, rgba(250,246,238, 0.9) 25%, rgba(250,246,238, 0) 50%);
  z-index: 1;
  pointer-events: none;
}
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
.header-inner {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto; height: 100%;
  display: flex; justify-content: space-between; align-items: center; padding: 0 32px;
}

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
.nav-item.router-link-active {
  color: #D9531E;
  background: #FFE8CC;
  font-weight: 800;
}
.nav-item:hover {
  color: #D9531E;
  background: #FFE8CC;
}

.header-actions { display: flex; align-items: center; gap: 20px; }

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

.btn-solid {
  background: #1A2B4C;
  color: #FFF;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(26,43,76,0.15);
  text-decoration: none;
}
.btn-solid:hover {
  background: #0F1A2E;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 140, 66, 0.3);
}
</style>
