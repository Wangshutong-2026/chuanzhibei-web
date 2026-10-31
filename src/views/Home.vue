<template>
  <div class="home-page">
    <Header />
    
    <div class="main-container">
      <!-- 1. Hero 区 -->
      <section class="hero-section">
        
        <!-- ?? 新增：棕色虚线边框层 (因为是在背景之上的独立层，所以会有手账感) -->
        <div class="dashed-border"></div>

        <!-- 满屏背景图 -->
        <div class="bg-image-wrapper">
          <img src="/bg.png" alt="温馨背景" class="full-bg" />
          <div class="bg-overlay"></div>
        </div>

        <!-- 左侧文字 -->
        <div class="hero-text">
          <h1>世界很大，<br>它的世界只有你。</h1>
          <p>从嗷嗷待哺到步履蹒跚，用数据定格它的成长轨迹，做它最合格的铲屎官。</p>
          <button class="cta-btn" @click="$router.push('/pets')">立即创建档案 →</button>
        </div>
        
        <!-- 右侧：贴纸集群 (保持不变) -->
        <div class="hero-visual">
          <div class="sticker main-sticker"><img src="/tiezhi1.png" alt="主宠物" /></div>
          <div class="sticker small-sticker s1"><img src="/tiezhi2.png" alt="小宠物1" /></div>
          <div class="sticker small-sticker s2"><img src="/tiezhi3.png" alt="小宠物2" /></div>
          <div class="sticker small-sticker s3"><img src="/tiezhi4.png" alt="小宠物3" /></div>
          <div class="paw-float p1"><svg viewBox="0 0 24 24" fill="#FFB6C1"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg></div>
          <div class="paw-float p2"><svg viewBox="0 0 24 24" fill="#B4E197"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg></div>
          <div class="paw-float p3"><svg viewBox="0 0 24 24" fill="#A6D0FF"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg></div>
          <div class="paw-float p4"><svg viewBox="0 0 24 24" fill="#FFE4A0"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg></div>
        </div>

        <!-- ?? 新增：左下角破形的图 (你可以把 src 换成你的宠物/手绘图，现在先用个占位图) -->
        <img class="bottom-left-sticker" src="/tiezhi5.png" alt="破形装饰" />
      </section>
      <!-- 2. 服务分类区 -->
      <section class="services-section">
        <h2 class="section-title">贴心养护服务</h2>
        <div class="services-container">
          <div class="service-card" @click="$router.push('/health')">
            <div class="icon-box" style="background: #FFF9EB; color: #E89B3E;"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg></div>
            <h3>健康初筛</h3><p>症状自查与建议</p>
          </div>
          <div class="service-card" @click="$router.push('/vitals')">
            <div class="icon-box" style="background: #FFF2EE; color: #D25C68;"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg></div>
            <h3>体重追踪</h3><p>记录成长曲线</p>
          </div>
          <div class="service-card" @click="$router.push('/diet')">
            <div class="icon-box" style="background: #EBF4FA; color: #3B7EBF;"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg></div>
            <h3>喂食测算</h3><p>科学喂养克数</p>
          </div>
          <div class="service-card" @click="$router.push('/calendar')">
            <div class="icon-box" style="background: #F1F8E9; color: #5C9A3E;"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
            <h3>免疫日历</h3><p>疫苗与驱虫提醒</p>
          </div>
          <div class="service-card" @click="$router.push('/stock')">
            <div class="icon-box" style="background: #F4F0FA; color: #7B5CA6;"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
            <h3>存粮效期</h3><p>不怕过期粮</p>
          </div>
        </div>
      </section>

      <!-- 3. 语录区 -->
      <section class="quote-section">
        <div class="quote-image"><img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop" alt="Dog" /></div>
        <div class="quote-text">
          <h2>狗狗会说话，<br>只要你用心去听。</h2>
          <p>我们的 AI 助手不仅记录体重和疫苗，更能通过它的饮食、运动数据，提前预警健康风险。就像一位 24 小时在线的贴心管家。</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');

.home-page { 
  min-height: 100vh; 
  background-color: #FDFAF5; 
  font-family: -apple-system, sans-serif; 
  padding-top: 80px; /* ?? 从 72px 改成 80px，给背景图留点呼吸空间 */
  overflow-x: hidden; 
}

.main-container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px; 
  position: relative;
}

/* ================= 1. Hero 区 ================= */
.hero-section { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  height: 520px; 
  position: relative;
  border-radius: 30px;
  overflow: visible;
  margin-top: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
}

.bg-image-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; border-radius: 30px; overflow: hidden; }
.full-bg { width: 100%; height: 100%; object-fit: cover; object-position: right center; }
.bg-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0) 80%);
}
/* 🌟 新增：棕色虚线框 */
.dashed-border {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border-radius: 35px; /* 更圆润的边角 */
  pointer-events: none; 
  z-index: 20; 
  
  /* 粗度20，虚线长60，间距40，极其圆润的马克笔风 */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='35' ry='35' stroke='%23C08552' stroke-width='20' stroke-dasharray='60 40' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  background-size: 100% 100%;
}

/* 🌟 新增：左下角破形的图 */
.bottom-left-sticker {
  position: absolute;
  bottom: -20px; /* 让它向下突破虚线边框 */
  left: -20px;   /* 让它向左突破边框 */
  width: 160px;  /* 大小可以自己微调 */
  height: auto;
  z-index: 30;   /* 层级最高，保证能盖住虚线 */
  
  /* 模拟手账贴纸的白边和阴影 */
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.15)) drop-shadow(0 0 1px white) drop-shadow(0 0 2px white) drop-shadow(0 0 3px white);
  
  animation: floatSmall 5s ease-in-out infinite; /* 让它继续漂浮 */
}

.hero-text h1 { 
  /* ?? 应用可爱字体，如果网卡了就用系统自带的微软雅黑兜底 */
  font-family: 'ZCOOL KuaiLe', "YouYuan", "Microsoft YaHei", sans-serif; 
  
  font-size: 54px; 
  font-weight: 900; 
  color: #1A2B4C; 
  line-height: 1.3; 
  margin-bottom: 20px; 
  letter-spacing: 2px; 
}

.hero-text { 
  flex: 1; 
  max-width: 540px; 
  position: relative; 
  z-index: 10; 
  padding-left: 90px; /* ?? 改这里，往右挪，避开左下角的贴纸 */
  padding-bottom: 40px; 
}

.hero-text p { 
  /* 用系统自带的圆润无衬线字体即可，阅读体验最好 */
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; 
  
  font-size: 18px; /* 字号稍微放大一点点 */
  font-weight: 500; /* 字体不要太粗，显得轻柔 */
  color: #5E6B82; /* 颜色用浅灰蓝，和深色主标题拉开层次 */
  line-height: 1.8; /* 行高拉大！这是让文字有“呼吸感”的核心秘诀 */
  margin-bottom: 40px; 
  max-width: 420px; 
  letter-spacing: 0.5px; /* 稍微加一点字间距，显得更舒展 */
}

.cta-btn { background: #1A2B4C; color: #FFF; border: none; padding: 16px 36px; border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-left:20px;position: relative; z-index: 30; }
.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(26, 43, 76, 0.2); }

/* ================= ?? 右侧贴纸区 ================= */
.hero-visual { 
  flex: 1.1; 
  position: relative; 
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  /* ?? 核心修改：整个贴纸集群向下平移 20px */
  transform: translateY(20px); 
}

.sticker {
  position: absolute;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
}
.sticker img { width: 100%; height: 100%; object-fit: contain; }

/* 主贴纸放大到 480px */
.main-sticker {
  width: 480px;
  height: 480px;
  z-index: 5;
  animation: wobbleMain 6s ease-in-out infinite;
}

/* 小贴纸 */
.small-sticker { z-index: 6; }
.s1 { width: 160px; height: 160px; top: 10%; left: 5%; animation: floatSmall 5s ease-in-out infinite alternate; }
.s2 { width: 100px; height: 100px; top: 15%; right: 10%; animation: floatSmall 7s ease-in-out infinite alternate-reverse; }
.s3 { width: 130px; height: 130px; bottom: 10%; right: 5%; animation: wobbleSmall 4s ease-in-out infinite; }

/* 爪子 */
.paw-float { position: absolute; z-index: 7; opacity: 0.9; }
.p1 { width: 50px; height: 50px; top: 15%; left: 35%; animation: floatPaw 4s ease-in-out infinite alternate; }
.p2 { width: 40px; height: 40px; bottom: 25%; left: 25%; animation: floatPaw 5s ease-in-out infinite alternate-reverse; }
.p3 { width: 55px; height: 55px; top: 5%; right: 25%; animation: floatPaw 6s ease-in-out infinite alternate; }
.p4 { width: 45px; height: 45px; bottom: 20%; right: 20%; animation: floatPaw 4s ease-in-out infinite alternate-reverse; }

/* 动画 */
@keyframes wobbleMain {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}
@keyframes floatSmall {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-20px); }
}
@keyframes wobbleSmall {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(-10deg); }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes floatPaw {
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.6;}
  100% { transform: translateY(-25px) rotate(20deg); opacity: 1;}
}

/* ================= 2. 服务分类区 ================= */
.services-section { padding: 40px 0 80px; text-align: center; position: relative; z-index: 10; }
.section-title { font-size: 32px; color: #1A2B4C; font-weight: 900; margin-bottom: 40px; text-align: left; }
.services-container { background: #FFFFFF; border-radius: 30px; padding: 40px; display: flex; justify-content: space-between; gap: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1px solid #F2EBE1; }
.service-card { flex: 1; padding: 20px 10px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
.service-card:hover { background: #FDFAF5; transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.03); }
.icon-box { width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 16px; display: flex; justify-content: center; align-items: center; }
.service-card h3 { font-size: 18px; color: #1A2B4C; margin-bottom: 8px; font-weight: bold; }
.service-card p { font-size: 13px; color: #8892A0; margin: 0; line-height: 1.4; }

/* ================= 3. 语录区 ================= */
.quote-section { display: flex; align-items: center; justify-content: center; gap: 60px; padding: 80px 0; border-top: 1px solid #F2EBE1; }
.quote-image { width: 280px; height: 280px; }
.quote-image img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
.quote-text { max-width: 400px; }
.quote-text h2 { font-size: 36px; color: #1A2B4C; line-height: 1.3; margin-bottom: 20px; font-weight: 900; }
.quote-text p { font-size: 16px; color: #5E6B82; line-height: 1.8; }
</style>