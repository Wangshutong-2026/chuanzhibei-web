<template>
  <header class="top-nav">
    <div class="nav-left">
      <span class="brand-mark"></span>
      <span class="logo">伴宠有方</span>

      <nav class="nav-menu">
        <a class="menu-item">首页</a >
        <a class="menu-item">宠物档案</a >
        <a class="menu-item">免疫日历</a >
        <a class="menu-item">每日喂食</a >
        <a class="menu-item active">
          <span class="menu-bg"></span>
          <span class="menu-text">日常账本</span>
        </a >
        <a class="menu-item">养护百科</a >
      </nav>
    </div>

    <div class="nav-right">
      <span class="login-link">登录/注册</span>
      <button class="create-btn">创建档案</button>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.top-nav {
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: #ffffff;
  box-sizing: border-box;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 18px;
  height: 18px;
  background: #ff6b35;
  border-radius: 4px;
  flex-shrink: 0;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #ff6b35;
  letter-spacing: 0.5px;
  margin-right: 24px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 6px;
}

.menu-item {
  position: relative;
  padding: 9px 14px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  border-radius: 999px;
  transition: 0.25s ease;
}

.menu-item:hover {
  color: #ff6b35;
  transform: translateY(-1px);
}

.menu-item.active {
  color: #ff6b35;
  font-weight: 600;
}

.menu-item.active .menu-bg {
  position: absolute;
  inset: 0;
  background: #fff4e1;
  border-radius: 999px;
  z-index: 0;
}

.menu-item.active .menu-text {
  position: relative;
  z-index: 1;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
}

.login-link {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: 0.25s ease;
}

.login-link:hover {
  color: #ff6b35;
}

.create-btn {
  border: none;
  background: #222840;
  color: #fff;
  font-size: 14px;
  padding: 9px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.25s ease;
}

.create-btn:hover {
  background: #333a5c;
  transform: translateY(-1px);
}
</style>