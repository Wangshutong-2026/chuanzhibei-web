<template>
  <header class="cyber-header">
    <div class="logo-area" @click="goHome">
      <div class="logo-icon"></div>
      <div class="logo-text-group">
        <span class="logo-text">透明仓</span>
        <span class="en-text">AI SUPPLY CHAIN AUDIT</span>
      </div>
    </div>

    <nav class="nav-menu">
      <a class="nav-item active" href=" ">首页</a >
      <a class="nav-item" href="#" title="上传图片，AI自动计算成本与真伪">审计工作台</a >
      <a class="nav-item" href="#" title="查看品牌与代工厂的网状关系图谱">供应链图谱</a >
      <a class="nav-item" href="#" title="最新农产品价格与黑猫投诉数据">情报库</a >
      <a class="nav-item" href="#">关于我们</a >
    </nav>

    <div class="action-area">
      <span class="help-icon" title="上传包装配料表，输入日常售价，即可启动反推">?</span>
      <button class="btn-demo">进入工作台</button>
      <button class="btn-start">体验引擎</button>
    </div>
  </header>
</template>

<script setup>
const goHome = () => console.log('回到首页')
</script>

<style scoped>
.cyber-header {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.85); 
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 1000;
}
.logo-area { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.logo-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, #0052D9 0%, #00D2FF 100%);
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 82, 217, 0.3);
}
.logo-text-group { display: flex; flex-direction: column; text-align: left; }
.logo-text { color: #1D2129; font-size: 18px; font-weight: 800; letter-spacing: 1px; line-height: 1.1; }
.en-text { font-size: 10px; color: #86909C; font-weight: 600; margin-top: 2px; }

.nav-menu { display: flex; gap: 36px; }
.nav-item {
  color: #4E5969; text-decoration: none; font-size: 15px; font-weight: 500;
  transition: all 0.3s ease; position: relative; padding: 8px 0; cursor: pointer;
}
.nav-item:hover, .nav-item.active { color: #0052D9; }
.nav-item.active::after {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 24px; height: 3px; background-color: #0052D9; border-radius: 2px;
}

.action-area { display: flex; align-items: center; gap: 16px; }
.help-icon {
  display: inline-flex; justify-content: center; align-items: center;
  width: 24px; height: 24px; border-radius: 50%;
  background: #F2F3F5; color: #4E5969; font-weight: bold; font-size: 14px;
  cursor: help; transition: all 0.3s;
}
.help-icon:hover { background: #0052D9; color: #fff; }

.btn-demo {
  background: #F2F3F5; color: #1D2129; border: none;
  padding: 9px 20px; border-radius: 6px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.3s;
}
.btn-demo:hover { background: #E5E6EB; }

.btn-start {
  background: #0052D9; color: #FFFFFF; border: none;
  padding: 9px 20px; border-radius: 6px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 82, 217, 0.2);
}
.btn-start:hover { background: #0043B2; transform: translateY(-1px); }
</style>