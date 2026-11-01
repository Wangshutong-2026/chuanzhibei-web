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
            <!-- ================= 2. 贴心养护服务 (便利贴版) ================= -->
            <!-- ================= 2. 贴心养护服务 (便利贴版) ================= -->
      <section class="services-section">
        <!-- 鸟和守宫图片 -->
        <img src="/bird.png" class="corner-decor top-left" alt="小鸟" />
        <img src="/gecko.png" class="corner-decor bottom-right" alt="守宫" />

        <div class="section-header-wrap">
          <div class="tape-title-img">
            <img src="/jiaotiao1.png" alt="胶布1" />
            <!-- 👇 标题改回你原本的名字 -->
            <h2>贴心养护服务</h2>
          </div>
          <p class="section-subtitle">陪伴它的每一个重要时刻，我们都在</p>
        </div>
        
        <div class="services-container">
          <!-- 卡片 1 -->
          <div class="service-card" style="--bg-color: #FFE4EC;" @click="$router.push('/health')">
            <div class="sticker-icon" style="--icon-color: #FF7A9E;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <h3>健康初筛</h3>
            <p class="short-desc">症状自查与建议</p>
            <!-- 👇 新增：有用的功能标签 -->
            <div class="feature-tags">
              <span>症状分析</span>
              <span>就医预警</span>
            </div>
          </div>
          
          <!-- 卡片 2 -->
          <div class="service-card" style="--bg-color: #E0F6E9;" @click="$router.push('/vitals')">
            <div class="sticker-icon" style="--icon-color: #3DBE7B;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
            </div>
            <h3>体重追踪</h3>
            <p class="short-desc">记录成长曲线</p>
            <div class="feature-tags">
              <span>趋势图表</span>
              <span>胖瘦评估</span>
            </div>
          </div>

          <!-- 卡片 3 -->
          <div class="service-card" style="--bg-color: #E1F0FF;" @click="$router.push('/diet')">
            <div class="sticker-icon" style="--icon-color: #4B93FF;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            </div>
            <h3>喂食测算</h3>
            <p class="short-desc">科学喂养克数</p>
            <div class="feature-tags">
              <span>热量计算</span>
              <span>定制食谱</span>
            </div>
          </div>

          <!-- 卡片 4 -->
          <div class="service-card" style="--bg-color: #FFF3D6;" @click="$router.push('/calendar')">
            <div class="sticker-icon" style="--icon-color: #FFB020;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h3>免疫日历</h3>
            <p class="short-desc">疫苗与驱虫提醒</p>
            <div class="feature-tags">
              <span>智能提醒</span>
              <span>健康档案</span>
            </div>
          </div>

          <!-- 卡片 5 -->
          <div class="service-card" style="--bg-color: #F1EAFF;" @click="$router.push('/stock')">
            <div class="sticker-icon" style="--icon-color: #9365FF;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h3>存粮效期</h3>
            <p class="short-desc">不怕过期粮</p>
            <div class="feature-tags">
              <span>余粮预警</span>
              <span>保质期监控</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= 3. 全生命周期时间轴 (曲线版) ================= -->
      <section class="timeline-section">
        <div class="section-header-wrap">
          <div class="tape-title-img">
            <img src="/jiaotiao2.png" alt="胶布2" />
            <h2>全生命周期陪伴</h2>
          </div>
          <p class="section-subtitle">从嗷嗷待哺，到步履蹒跚，我们一直都在</p>
        </div>

        <div class="curve-timeline-wrapper">
          <!-- 贯穿的波浪形虚线背景 -->
          <svg class="curve-svg-line" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M 0 150 Q 250 50, 500 100 T 1000 50" fill="none" stroke="#E6D0B3" stroke-width="4" stroke-dasharray="10 10" stroke-linecap="round"/>
          </svg>

          <div class="timeline-items">
            
            <!-- 阶段 1：幼年期 -->
            <div class="timeline-item pos-1">
              <div class="dog-img-box">
                <img src="/dog1.png" alt="幼年" />
              </div>
              <!-- 爪子从小到大 -->
              <div class="paw-icon paw-s">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg>
              </div>
              <h3>幼年期</h3>
              <p class="age">0 - 6个月</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>建立基础免疫。</p>
                <p><strong>系统功能：</strong>自动生成疫苗接种时间表，提供少食多餐测算。</p>
              </div>
            </div>

            <!-- 阶段 2：青年期 -->
            <div class="timeline-item pos-2">
              <div class="dog-img-box">
                <img src="/dog2.png" alt="青年" />
              </div>
              <div class="paw-icon paw-m">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg>
              </div>
              <h3>青年期</h3>
              <p class="age">7个月 - 2岁</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>行为训练与体态塑造。</p>
                <p><strong>系统功能：</strong>记录换牙期异常，提供充足的运动量消耗计算。</p>
              </div>
            </div>

            <!-- 阶段 3：成年期 -->
            <div class="timeline-item pos-3">
              <div class="dog-img-box">
                <img src="/dog3.png" alt="成年" />
              </div>
              <div class="paw-icon paw-l">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg>
              </div>
              <h3>成年期</h3>
              <p class="age">3 - 6岁</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>维持体态与口腔健康。</p>
                <p><strong>系统功能：</strong>肥胖风险预警，联动日常账本记录每年的体检开销。</p>
              </div>
            </div>

            <!-- 阶段 4：老年期 -->
            <div class="timeline-item pos-4">
              <div class="dog-img-box">
                <img src="/dog4.png" alt="老年" />
              </div>
              <div class="paw-icon paw-xl">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="10" cy="5" r="3"/><circle cx="14" cy="5" r="3"/><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z"/></svg>
              </div>
              <h3>老年期</h3>
              <p class="age">7岁以上</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>慢病管理与关节养护。</p>
                <p><strong>系统功能：</strong>提醒高频体检，自动切换老年专属低脂高易消化喂食模型。</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ================= 4. 养宠知识情报站 (一大两小版) ================= -->
      <section class="news-section">
        <div class="section-header-wrap">
          <div class="tape-title-img">
            <img src="/jiaotiao3.png" alt="胶布3" />
            <h2>养宠知识情报站</h2>
          </div>
          <p class="section-subtitle">拒绝网络谣言，用专业兽医知识武装日常养护</p>
        </div>

        <div class="news-layout">
          <!-- 左侧 2/3 区域 -->
          <div class="news-left">
            
            <!-- 大卡片 -->
            <!-- 大卡片 -->
            <div class="news-card large-card" @click="window.open('https://www.sohu.com/a/948720991_99986638', '_blank')" style="cursor: pointer;">
              
              <img src="/cat.jpg" class="large-card-cover" alt="科普封面" />
              <div class="news-content">
                <div class="news-tag" style="background: #FFE4EC; color: #FF7A9E;">饮食避坑</div>
                <h3>不要再给猫咪喝牛奶了！不仅没用还致命</h3>
                <p>绝大多数成年猫咪都有乳糖不耐受，喝牛奶极易导致严重腹泻和脱水。如果想补充营养，请选择专用的宠物羊奶粉。我们的系统在饮食档案中，会特别记录宠物的肠胃敏感度与过敏源，一旦触发红线，立即向主人发出预警。</p>
                <span class="read-more">阅读完整指南 →</span>
              </div>
            </div>

            <!-- 两个小卡片 (异宠科普版) -->
            <div class="news-side-stack">

            <!-- 仓鼠卡片 -->
            <div class="news-card small-card" @click="window.open('https://www.sohu.com/a/946854029_99986638', '_blank')" style="cursor: pointer;">
                <div class="news-tag" style="background: #FFF3D6; color: #FFB020;">饲养避坑</div>
                <h3>仓鼠绝对不能合笼饲养！</h3>
                <p>仓鼠领地意识极强，合笼极易导致惨烈打架。系统在建立异宠档案时，会自动向新手主人推送“单笼独居”的预警提示。</p>
                <span class="read-more">阅读更多 →</span>
              </div>
              
              <!-- 守宫卡片 -->
              <div class="news-card small-card" @click="window.open('https://www.toutiao.com/article/7447413516157338123/', '_blank')" style="cursor: pointer;">
                <div class="news-tag" style="background: #E0F6E9; color: #3DBE7B;">环境温控</div>
                <h3>豹纹守宫缺钙怎么补？</h3>
                <p>爬宠极易缺乏维生素D3导致骨骼变形。专属异宠档案支持记录日常喂食的含钙量，并提醒您按时开启加热垫调节温湿度。</p>
                <span class="read-more">阅读更多 →</span>
              </div>
            </div>

          </div>

          <!-- 右侧 1/3 区域：萨摩耶镇场子 -->
          <div class="news-right-img">
            <img src="/samo.png" alt="萨摩耶" class="samo-sticker" />
          </div>
        </div>
      </section>

      <!-- ================= 5. 数据看板 ================= -->
      <section class="stats-section">
        <img src="/bird2.png" class="stats-bird" alt="小鸟贴纸" style="width: 100px !important; height: 100px !important; object-fit: contain;" />
        <div class="stats-container">
          <div class="stat-item">
            <h3>12,000+</h3>
            <p>份健康档案建立</p>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <h3>50,000+</h3>
            <p>次科学喂食计算</p>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            
            <h3>100%</h3>
            <p>权威国标数据支撑</p>
          </div>
        </div>
      </section>

      <!-- ================= 6. 底部行动号召 ================= -->
      <section class="cta-section">
        <div class="cta-card">
          <div class="tape-title-img" style="margin-bottom: 20px;">
            <img src="/jiaotiao4.png" alt="胶布4" />
            <h2>开启陪伴之旅</h2>
          </div>
          <h2>科学养宠，是对它最温柔的承诺。</h2>
          <p>现在，为你的小可爱建立第一份专属档案，记录每一次成长与健康。</p>
          <button class="cta-btn-large" @click="$router.push('/pets')">
            立即创建档案 <span class="arrow">➔</span>
          </button>
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

/* ================= 🌟 以下为 Body 下半部分专属 CSS，直接追加到底部即可 ================= */

/* ---------- 通用标题与胶带样式 ---------- */
.section-header-wrap { text-align: center; margin-bottom: 60px; position: relative; z-index: 10; }
.tape-title-img { position: relative; display: inline-block; margin-bottom: 12px; }
.tape-title-img img { width: 280px; height: auto; opacity: 0.9; display: block; }
.tape-title-img h2 { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0; font-size: 24px; color: #5C3A21; font-weight: 900; letter-spacing: 2px; }
.section-subtitle { font-size: 16px; color: #8892A0; margin-top: 10px; }

/* ---------- 2. 贴心养护服务 ---------- */
.services-section { padding: 100px 0; position: relative; overflow: visible; }
.corner-decor { position: absolute; width: 140px; height: 140px; object-fit: contain; z-index: 1; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); }
.top-left { top: -20px; left: -50px; animation: floatCorner 6s ease-in-out infinite; }
.bottom-right { bottom: -20px; right: -50px; animation: floatCorner 7s ease-in-out infinite alternate-reverse; }

@keyframes floatCorner {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.services-container { display: flex; justify-content: center; gap: 24px; position: relative; z-index: 10; }
.service-card {
  width: 180px; height: 220px; background-color: var(--bg-color);
  border-radius: 32px; border: 6px solid #FFFFFF; 
  box-shadow: 0 15px 30px rgba(0,0,0,0.06), inset 0 -4px 10px rgba(0,0,0,0.03);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.service-card:hover { transform: translateY(-12px) scale(1.05) rotate(-2deg); box-shadow: 0 25px 40px rgba(0,0,0,0.1), inset 0 -4px 10px rgba(0,0,0,0.03); }
.sticker-icon { width: 72px; height: 72px; background: #FFFFFF; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; color: var(--icon-color); box-shadow: 0 8px 16px rgba(0,0,0,0.05); }
.service-card h3 { font-size: 20px; color: #1A2B4C; margin-bottom: 8px; font-weight: 900; }
.service-card p { font-size: 14px; color: #5E6B82; margin: 0; font-weight: 500; }

/* ---------- 3. 全生命周期时间轴 ---------- */
.timeline-section { padding: 80px 0; position: relative; z-index: 10; }
.timeline-wrapper { position: relative; max-width: 900px; margin: 0 auto; }
.timeline-line { position: absolute; top: 40px; left: 50px; right: 50px; height: 4px; background: #F2EBE1; border-radius: 2px; z-index: 1; }
.timeline-items { display: flex; justify-content: space-between; position: relative; z-index: 2; }
.timeline-item { width: 30%; background: #fff; border-radius: 24px; padding: 30px 20px; border: 1px solid #F2EBE1; box-shadow: 0 10px 20px rgba(0,0,0,0.03); transition: 0.3s; }
.timeline-item:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.08); }
.time-img-wrap { width: 70px; height: 70px; border-radius: 20px; display: flex; justify-content: center; align-items: center; margin: 0 auto 15px; }
.timeline-item h3 { font-size: 18px; color: #1A2B4C; margin: 0 0 6px; font-weight: 900; text-align: center; }
.timeline-item .age { text-align: center; color: #FF7A9E; font-weight: bold; font-size: 14px; margin-bottom: 12px; }
.timeline-item .desc { font-size: 14px; color: #5E6B82; line-height: 1.6; margin: 0; }

/* ---------- 4. 知识情报站 ---------- */
.news-section { padding: 80px 0; position: relative; z-index: 10; }
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.news-card { background: #fff; padding: 30px; border-radius: 20px; border: 1px solid #F2EBE1; position: relative; box-shadow: 0 8px 20px rgba(0,0,0,0.02); transition: 0.3s; }
.news-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); }
.news-tag { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 900; margin-bottom: 15px; }
.news-card h3 { font-size: 18px; color: #1A2B4C; margin: 0 0 10px; font-weight: bold; }
.news-card p { font-size: 14px; color: #8892A0; margin: 0; line-height: 1.6; }

/* ---------- 5. 数据看板 ---------- */
.stats-section { padding: 60px 0; position: relative; z-index: 10; }
.stats-container { display: flex; justify-content: space-around; align-items: center; background: #FFFFFF; border-radius: 30px; padding: 40px; border: 1px dashed #E6D0B3; }
.stat-item { text-align: center; }
.stat-item h3 { font-size: 42px; font-weight: 900; color: #1A2B4C; margin: 0 0 10px; }
.stat-item p { font-size: 15px; color: #5E6B82; margin: 0; font-weight: bold; }
.stat-divider { width: 1px; height: 60px; background: #F2EBE1; }

/* ---------- 6. 底部 CTA ---------- */
.cta-section { padding: 80px 0 100px; position: relative; z-index: 10; }
.cta-card { 
  /* 你的背景图，记得换成你真实的图片名 */
  background-image: url('/bg.png'); 
  background-size: cover;
  background-position: center;
  
  border-radius: 40px; 
  padding: 60px 20px; 
  text-align: center; 
  position: relative; 
  overflow: hidden; 
  border: 2px dashed #E6D0B3; 
}

/* 👇 核心魔法：加一层白蒙蒙的遮罩，保证文字清晰 */
.cta-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* 使用和咱们网页一致的米白色，透明度 85%，既能透出背景图，又不影响看字 */
  background: rgba(253, 250, 245, 0.85); 
  z-index: 1;
}

/* 确保里面的文字、按钮在遮罩上方 */
.cta-card > * {
  position: relative;
  z-index: 2;
}
.cta-card h2 { font-size: 32px; color: #1A2B4C; font-weight: 900; margin: 0 0 15px; }
.cta-card p { font-size: 16px; color: #5E6B82; margin-bottom: 40px; }
.cta-btn-large { background: #1A2B4C; color: #fff; border: none; padding: 18px 45px; border-radius: 40px; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 25px rgba(26,43,76,0.2); }
.cta-btn-large:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(26,43,76,0.3); }
.arrow { margin-left: 10px; transition: 0.3s; display: inline-block; }
.cta-btn-large:hover .arrow { transform: translateX(5px); }

/* 🌟 1. 修复小鸟位置：从太高改为贴在边缘 */
.corner-decor { position: absolute; width: 140px; height: 140px; object-fit: contain; z-index: 1; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); }
.top-left { top: 80px; left: -50px; animation: floatCorner 6s ease-in-out infinite; } /* 👈 top改了 */
.bottom-right { bottom: 80px; right: -50px; animation: floatCorner 7s ease-in-out infinite alternate-reverse; } /* 👈 bottom改了，更居中 */

/* 🌟 2. 修复标题格式：字体加大加粗，完美压在胶条中间 */
.tape-title-img img { width: 280px; height: auto; opacity: 0.9; display: block; }
.tape-title-img h2 { 
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
  margin: 0; font-size: 22px; color: #5C3A21; font-weight: 900; letter-spacing: 2px; 
  white-space: nowrap; /* 防止文字换行 */
}

/* 🌟 3. 充实知识卡片：增加“阅读全文”的交互感 */
.read-more { display: inline-block; margin-top: 15px; font-size: 13px; color: #FF7A9E; font-weight: bold; cursor: pointer; transition: 0.3s; }
.news-card:hover .read-more { transform: translateX(5px); color: #e05f81; }

/* 🌟 4. 充实时间轴：让字和排版更舒服 */
.timeline-item .desc { font-size: 13px; color: #5E6B82; line-height: 1.8; margin: 0; text-align: left; background: #FDFAF5; padding: 10px; border-radius: 8px;}

/* 🌟 1. 鸟和守宫位置继续下移，靠近中间区域 */
.top-left { top: 190px; left: -50px; animation: floatCorner 6s ease-in-out infinite; } 
.bottom-right { bottom: 10px; right: -50px; animation: floatCorner 7s ease-in-out infinite alternate-reverse; } 

/* 🌟 2. 卡片内容变得极其丰满，需要调整高度和排版 */
.service-card {
  width: 190px; /* 稍微加宽一点 */
  height: 250px; /* 加高以容纳新内容 */
  /* 其他属性保持之前的代码 */
}
.short-desc { font-size: 13px; color: #8892A0; margin-bottom: 15px; }

/* 👇 新增：卡片里极其有用的功能小标签 */
.feature-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}
.feature-tags span {
  background: rgba(255,255,255,0.7);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  color: #1A2B4C;
  font-weight: bold;
}

/* 🌟 3. 时间轴内容排版优化（显得极其专业） */
.time-content {
  text-align: left;
  background: #FDFAF5;
  padding: 12px;
  border-radius: 12px;
  margin-top: 10px;
}
.time-content p {
  margin: 0 0 6px 0;
  font-size: 13px;
  color: #4E5969;
  line-height: 1.5;
}
.time-content p:last-child { margin-bottom: 0; }
.time-content strong { color: #1A2B4C; }

/* 微调新闻卡片的间距 */
.news-card p { margin-bottom: 15px; }
/* ================= ?? 曲线型生命周期时间轴 (多巴胺贴纸版) ================= */
.curve-timeline-wrapper {
  position: relative;
  max-width: 1150px; /* 稍微加宽一点，让四个大卡片放得下 */
  margin: 60px auto 0;
  padding: 40px 0;
}

/* 贯穿的波浪虚线背景 */
.curve-svg-line {
  position: absolute;
  top: 50%; left: 0;
  width: 100%; height: 100%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
}

/* 容器：让四个阶段横向排开 */
.timeline-items {
  display: flex;
  justify-content: center;
  gap:40px;
  align-items: flex-start;
  position: relative;
  z-index: 5;
}

/* ?? 核心：卡片变身为厚实的贴纸 */
.timeline-item {
  width: 24.5%; 
  border-radius: 28px;
  padding: 24px 20px;
  /* 极粗的白边，手账贴纸的灵魂 */
  border: 6px solid #FFFFFF; 
  /* 极强的立体阴影 */
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 悬浮时不仅浮起，还会稍微放大 */
.timeline-item:hover {
  transform: translateY(-15px) scale(1.03) !important;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  z-index: 10;
}

/* ?? 核心：通过 translateY 实现曲线高低错落，并赋予不同多巴胺底色 */
.pos-1 { transform: translateY(40px); background-color: #FFF0F5; }  /* 幼年：粉 */
.pos-2 { transform: translateY(0px);  background-color: #E1F0FF; }  /* 青年：蓝 */
.pos-3 { transform: translateY(20px); background-color: #FFF9EC; }  /* 成年：黄 */
.pos-4 { transform: translateY(60px); background-color: #E0F6E9; }  /* 老年：绿 */

/* 狗狗图片容器（透明底） */
.dog-img-box {
  width: 100%;
  height: 110px; 
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 12px;
}
.dog-img-box img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 12px 12px rgba(0,0,0,0.15)); /* 狗狗阴影加重 */
}

/* ?? 核心：爪子从小到大 */
.paw-icon {
  margin-bottom: 12px;
}
.paw-s { width: 22px; height: 22px; }
.paw-m { width: 28px; height: 28px; }
.paw-l { width: 34px; height: 34px; }
.paw-xl { width: 40px; height: 40px; }

/* ?? 文字全面放大 */
.timeline-item h3 { 
  font-size: 22px; /* 从18px放大 */
  color: #1A2B4C; 
  margin: 0 0 6px; 
  font-weight: 900; 
}
.timeline-item .age { 
  color: #5C3A21; 
  font-weight: bold; 
  font-size: 15px; 
  margin-bottom: 16px; 
  
  /* ?? 新增下面这 4 行代码 */
  display: inline-block; /* 让框框只包裹文字 */
  background: rgba(255, 255, 255, 0.8); /* 半透明白底 */
  padding: 4px 14px; /* 框框内部的留白 */
  border-radius: 20px; /* 药丸形状的圆角 */
  border: 1.5px solid #E6D0B3; /* 给框框加个浅咖色边框 */
}

/* 底部文字说明区域 */
.time-content {
  background: rgba(255, 255, 255, 0.6); /* 半透明白底 */
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.time-content p {
  margin: 0 0 10px 0;
  font-size: 15px; /* 从12px放大，极其清晰 */
  color: #1A2B4C; /* 颜色加深，更好读 */
  line-height: 1.7; /* 行距拉开 */
}
.time-content p:last-child { margin-bottom: 0; }
.time-content strong { 
  color: #5C3A21; 
  font-weight: 900; 
}
/* ================= 🌟 知识情报站 (一大两小排版) ================= */
.news-layout {
  display: flex;
  gap: 30px;
  align-items: stretch; /* 让左右两边等高 */
  max-width: 1200px;
  margin: 0 auto;
}

/* 左侧占据 2/3 */
.news-left {
  flex: 2;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr; /* 大卡片稍微宽一点 */
  grid-template-rows: auto auto; /* 自动高度 */
  gap: 20px;
}

/* 大卡片占左边两行（上下横跨），小卡片在右边上下排 */
.large-card { grid-row: 1 / 3; display: flex; flex-direction: column; }
.news-side-stack { display: flex; flex-direction: column; gap: 20px; }

/* 卡片手账风基础样式 */
.news-card {
  background: #FFFDF9; /* 微微泛黄的纸张底色 */
  padding: 24px;
  border-radius: 24px;
  /* 手账感：深棕色虚线边框 */
  border: 3px dashed #D4A373; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.03);
  transition: all 0.3s;
}
.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  border-color: #5C3A21; /* 悬浮时虚线变深 */
}

/* 大卡片里的图片占位区 */
.img-placeholder {
  width: 100%;
  height: 180px;
  background: #F4F6F9;
  border: 2px dashed #C9CDD4;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: #8892A0;
  font-size: 14px;
  font-weight: bold;
  transition: 0.3s;
}
.img-placeholder:hover {
  background: #E8F3FF;
  border-color: #0052D9;
  color: #0052D9;
}

/* 卡片内部文字 */
.news-content h3, .small-card h3 {
  font-size: 18px;
  color: #1A2B4C;
  margin: 12px 0;
  font-weight: 900;
  line-height: 1.4;
}
.news-content p, .small-card p {
  font-size: 14px;
  color: #5E6B82;
  line-height: 1.7;
  margin: 0 0 15px 0;
}
.read-more {
  display: inline-block;
  font-size: 14px;
  color: #D4A373;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.news-card:hover .read-more { color: #5C3A21; transform: translateX(5px); }

/* 右侧 1/3 区域 */
.news-right-img {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
}

/* 完整的萨摩耶大图（自带黄底） */
.samo-sticker {
  width: 100%;
  max-width: 360px; /* 如果觉得太大就调小一点，比如 320px */
  height: auto;
  object-fit: contain;
  /* 加上柔和的阴影，让它像一张大贴纸浮在页面上 */
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15));
  animation: floatSmall 6s ease-in-out infinite;
}
.large-card-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 20px;
}
/* ================= 🌟 数据看板小鸟贴纸 ================= */
/* 数据看板外层容器 */
.stats-section { 
  padding: 80px 0; 
  position: relative; /* 👈 核心：给小鸟定位提供坐标参考 */
  z-index: 10; 
}

/* 虚线框容器 */
.stats-container { 
  display: flex; 
  justify-content: space-around; 
  align-items: center; 
  background: #FFFFFF; 
  border-radius: 30px; 
  padding: 40px; 
  border: 1px dashed #E6D0B3; 
}

/* 🌟 小鸟贴纸精准定位 */
.stats-bird {
  position: absolute;
  /* 👇 核心修改：让它在虚线框上方，并且靠右侧偏中，踩在框线上 */
  top: 50px; 
  right: 22%; 
  
  /* 👇 尺寸缩到极限的 35px */
  width: 35px; 
  height: 35px;
  object-fit: contain;
  z-index: 20;
  
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  animation: floatCorner 4s ease-in-out infinite; 
}
</style>