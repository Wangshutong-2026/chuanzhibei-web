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

      <!-- 中间导航 -->
      <nav class="nav-links">
        <a class="active" @click="$router.push('/')">首页</a>
        <a @click="$router.push('/pets')">宠物档案</a>
        <a @click="$router.push('/calendar')">免疫日历</a>
        <a @click="$router.push('/diet')">每日喂食</a>
        <a @click="$router.push('/bill')">日常账本</a>
        <a @click="$router.push('/knowledge')">养护百科</a>
      </nav>

      <!-- 右侧按钮 -->
      <div class="header-actions">
        <button class="btn-text">登录 / 注册</button>
        <button class="btn-solid" @click="$router.push('/pets')">创建档案</button>
      </div>
    </div>
  </header>
</template>

<script setup>
// 逻辑不变
</script>

<style scoped>
.header-space {
  height: 72px; /* 和你.warm-header的高度保持一致！不合适就改成75/85/90微调 */
}

.warm-header {
  position: fixed; top: 0; left: 0; width: 100%; height: 72px;
  /* 保留背景图（如果你觉得多余，可以把下面这行删掉） */
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

/* 🌟 猫猫头专属样式 */
.header-cat {
  position: absolute;
  z-index: 2; 
  object-fit: contain;
  pointer-events: none; 
}

.cat-center {
  height: 50px;
  right: 25%; /* 如果位置有偏差，微调这个百分比 */
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

/* 导航 */
.nav-links { display: flex; gap: 8px; } 
.nav-links a {
  font-size: 16px; font-weight: 600; color: #5E6B82; cursor: pointer; 
  transition: all 0.3s;
  padding: 8px 18px;
  border-radius: 20px;
}
.nav-links a:hover, 
.nav-links a.active {
  color: #D9531E; /* 浓郁的焦糖橘红 */
  background: #FFE8CC; /* 加深一档的奶橘底 */
  font-weight: 800;
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