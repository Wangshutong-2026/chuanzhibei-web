<template>
  <div class="home-container">
    <div class="aurora-bg"></div>
    <Header />
    
    <!-- 顶部背景图，透明处理 -->
    <div class="bg-decor"></div>

    <div class="main-content">
      
     <!-- 第一部分：高级分栏版 Hero 区 (无表单，纯展示) -->
      <section class="hero-section">
        <!-- 左侧文案与引导按钮 -->
        <div class="hero-left">
          <div class="tag">
            <span class="pulse-dot"></span> AI 驱动的宠物全生命周期养护平台
          </div>
          
          <h1 class="main-title">
            用数据，给毛孩子<br>
            <span class="text-gradient">更长久的陪伴</span>
          </h1>
          
          <p class="sub-title">
            依托国家级公开许可数据与视觉大模型，打通食品安全溯源、科学膳食推演、日常健康档案与免疫提醒。<br>
            为您的爱宠提供一站式、全链路的深度决策辅助。
          </p>

          <!-- 核心引导按钮 -->
          <div class="hero-actions">
            <button class="btn-primary" @click="$router.push('/workspace')">开始食安溯源</button>
            <button class="btn-secondary" @click="$router.push('/dashboard')">进入控制台</button>
          </div>
          
          <div class="hero-trust">
            <span>✓ 真实接入工商数据</span>
            <span>✓ 毫秒级成本测算</span>
            <span>✓ 多维实体关系图谱</span>
          </div>
        </div>

        <!-- 右侧插图 -->
        <!-- 右侧：行星环绕科技图 -->
        <div class="hero-right">
          <!-- 中心大光晕 -->
          <div class="hero-image-glow"></div>
          
          <!-- 中间圆形主图 -->
          <div class="center-circle">
            <!-- 如果你有新的科技宠物图，把 dog.jpg 换掉 -->
            <img src="/hero.jpg" alt="科技宠物" class="main-image" />
          </div>

          <!-- 悬浮的功能标签 -->
          <!-- 标签 1：食品安全 (左上) -->
          <div class="float-tag tag-1">
            <div class="tag-icon">🛡️</div>
            <div class="tag-text">
              <h4>食安溯源</h4>
              <p>成本反推 / 扒代工厂</p>
            </div>
          </div>

          <!-- 标签 2：健康管理 (右上) -->
          <div class="float-tag tag-2">
            <div class="tag-icon">📈</div>
            <div class="tag-text">
              <h4>健康档案</h4>
              <p>体重追踪 / 免疫日历</p>
            </div>
          </div>

          <!-- 标签 3：AI 膳食 (左下) -->
          <div class="float-tag tag-3">
            <div class="tag-icon">🍽️</div>
            <div class="tag-text">
              <h4>科学膳食</h4>
              <p>RER 热量计算</p>
            </div>
          </div>

          <!-- 标签 4：知识图谱 (右下) -->
          <div class="float-tag tag-4">
            <div class="tag-icon">🕸️</div>
            <div class="tag-text">
              <h4>关系图谱</h4>
              <p>穿透品牌底牌</p>
            </div>
          </div>
        </div>
      </section>
      <!-- 第二部分：吸顶锚点导航 -->
      <nav class="anchor-nav">
        <div class="anchor-item" @click="scrollTo('sec-features')">核心业务</div>
        <div class="anchor-item" @click="scrollTo('sec-preview')">系统预览</div>
        <div class="anchor-item" @click="scrollTo('sec-engine')">引擎架构</div>
        <div class="anchor-item" @click="scrollTo('sec-news')">行业智库</div>
      </nav>
      <!-- 四大核心引擎标题区 -->
      <div class="section-header" style="margin-top: 60px; margin-bottom: 20px;">
        <h2>四大核心引擎，全方位守护</h2>
        <p>从吃进嘴里的每一口，到每一天的陪伴</p>
      </div>

      <!-- 沉浸式全屏轮播版块 -->
      <section class="hero-carousel-section">
        <div class="carousel-container">
          
          <!-- 循环渲染 4 张图片 -->
          <div 
            v-for="(item, index) in carouselItems" 
            :key="index"
            class="carousel-slide"
            :class="{ 'active': currentSlide === index }"
            :style="{ backgroundImage: `url(${item.bg})` }"
          >
            <!-- 半透明遮罩，保证文字清晰 -->
            <div class="slide-overlay"></div>

            <!-- 文字内容（左右交错排版） -->
            <div class="slide-content" :class="item.align">
              <div class="content-box">
                <h2>{{ item.title }}</h2>
                <p>{{ item.desc }}</p>
                <button class="slide-btn" @click="$router.push(item.link)">
                  {{ item.btnText }} →
                </button>
              </div>
            </div>
          </div>

          <!-- 底部指示器 (点击可手动切换) -->
          <div class="carousel-indicators">
            <span 
              v-for="(item, index) in carouselItems" 
              :key="index"
              class="dot"
              :class="{ 'active': currentSlide === index }"
              @click="goToSlide(index)"
            ></span>
          </div>

        </div>
      </section>
      <!-- 第四部分：巨型系统预览图 -->
      <section id="sec-preview" class="preview-section">
        <div class="section-header">
          <h2>全链路数据监控大屏</h2>
          <p>从配方解析到真实成本反推，一切数据尽在掌握</p>
        </div>
        <div class="preview-mockup">
          <div class="mockup-header">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
          </div>
          <img src="/public/dog.jpg" alt="系统预览" class="preview-img" onerror="this.src='data:image/svg+xml;charset=utf-8,%3Csvg width=\\'100%25\\' height=\\'100%25\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23E8F3FF\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' font-size=\\'24\\' text-anchor=\\'middle\\' fill=\\'%230052D9\\'%3EPawCare 系统演示大屏%3C/text%3E%3C/svg%3E'" />
        </div>
      </section>

      <!-- 第五部分：底层技术支撑 (交叠立体感) -->
      <section id="sec-engine" class="engine-section">
        <div class="section-header">
          <h2>底层技术支撑</h2>
          <p>构建坚不可摧的技术护城河</p>
        </div>
        
        <div class="engine-list">
          <!-- 技术点 1 -->
          <div class="engine-card">
            <div class="engine-img-box">
              <img src="/tech1.jpg" alt="技术图1" class="engine-bg-img" />
              <!-- 悬浮玻璃卡片 -->
              <div class="glass-float right-float">
                <div class="icon-box bg-blue">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#0052D9" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div class="glass-text">
                  <h4>AI Vision 置信度</h4>
                  <p>98.5% · 识别极速</p>
                </div>
              </div>
            </div>
            
            <div class="engine-text-card">
              <div class="eng-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#0052D9" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
              <h3>多模态视觉大模型</h3>
              <p>精准提取包装配料表与成分数据，支持复杂排版、中英混排甚至模糊图片的深度解析，实现毫秒级信息结构化。</p>
            </div>
          </div>

          <!-- 技术点 2 (反向交叠) -->
          <div class="engine-card reverse">
            <div class="engine-img-box">
              <img src="/tech2.jpg" alt="技术图2" class="engine-bg-img" />
              <div class="glass-float left-float">
                <div class="icon-box bg-green">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#00B42A" stroke-width="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div class="glass-text">
                  <h4>鸡肉原料指数</h4>
                  <p class="text-green">↓ 2.1% 今日</p>
                </div>
              </div>
            </div>
            
            <div class="engine-text-card">
              <div class="eng-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#00B42A" stroke-width="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h3>大宗商品实时价格库</h3>
              <p>毫秒级对接全国农产品批发平台，实时更新禽肉、谷物等原料底价。确保成本反推模型时刻精准，拆穿虚假溢价。</p>
            </div>
          </div>

          <!-- 技术点 3 -->
          <div class="engine-card">
            <div class="engine-img-box">
              <img src="/tech3.jpg" alt="技术图3" class="engine-bg-img" />
              <div class="glass-float right-float">
                <div class="icon-box bg-purple">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#7B61FF" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </div>
                <div class="glass-text">
                  <h4>图谱节点</h4>
                  <p class="text-purple">14,203 个</p>
                </div>
              </div>
            </div>
            
            <div class="engine-text-card">
              <div class="eng-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#7B61FF" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </div>
              <h3>实体关系知识图谱</h3>
              <p>穿透品牌工商信息，深度挖掘股权结构与代工链路，发现隐匿的同源平替，让品牌的每一分溢价都有迹可循。</p>
            </div>
          </div>
        </div>
      </section>
      <!-- 第六部分：行业智库与最新动态 (主次分明，全外链) -->
      <section id="sec-news" class="news-section">
        <div class="news-header-row">
          <div class="section-header">
            <h2>行业智库与最新动态</h2>
            <p>追踪最前沿的监管动态与市场数据</p>
          </div>
        </div>

        <div class="news-layout">
          <!-- 左侧大头条 (带背景图) -->
          <div class="news-main" @click="openExternalNews('https://law.foodmate.net/mobile/index.php?moduleid=23&itemid=236880')">
            <!-- 如果你有图片，修改这里的 background-image -->
            <div class="news-main-img" style="background-image: url('/toutiao.jpg');">
              <div class="img-tag">头条推荐</div>
            </div>
            <div class="news-main-content">
              <div class="news-tag">行业合规</div>
              <h3>2026 版宠物饲料国家标准深度解读</h3>
              <p>农业农村部发布最新修订版国标，对原料溯源与营养指标提出更高要求。新规将如何影响市面上的主流品牌？...</p>
            </div>
          </div>
          
          <!-- 右侧快讯列表 -->
          <div class="news-side">
            <div class="news-item" @click="openExternalNews('https://www.yangjiang.gov.cn/yj/zwgk/zdlyxxgk/jgsf/jfbz/spjg/content/post_988184.html')">
              <div class="news-item-info">
                <div class="news-tag">宏观数据</div>
                <h4>Q3 季度禽肉类大宗商品价格波动报告</h4>
                <p class="news-desc">受饲料成本影响，白羽鸡价格持续走低，部分主打“鲜鸡肉”的宠物食品成本结构发生变化...</p>
              </div>
            </div>
            
            <!-- 修复超链接：同厂不同价 -->
            <div class="news-item" @click="openExternalNews('https://www.toutiao.com/article/7635957092746215963/?wid=1793122898847')">
              <div class="news-item-info">
                <div class="news-tag">深度洞察</div>
                <h4>同厂不同价：揭秘宠物食品代工背后的溢价逻辑</h4>
                <p class="news-desc">同一条生产线产出的宠物粮，换个包装售价相差五倍。品牌溢价是否合理？消费者该如何避坑？</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右下角了解更多 (跳转到独立资讯页) -->
        <div class="more-action-row">
          <button class="btn-more" @click="$router.push('/news')">探索更多行业资讯 →</button>
        </div>
      </section>
      <!-- 底部 Footer
      <section id="about-section">
        <footer class="site-footer">
          <div class="footer-content">
            <p>© 2026 PawCare 智护团队. All Rights Reserved.</p>
            <div class="footer-links">
              <a href="#">数据来源声明</a>
              <a href="#">隐私政策</a>
              <a href="#">联系我们</a>
            </div>
          </div>
        </footer>
      </section> -->
      <!-- 沉浸式全宽宠物背景 Footer -->
      <footer class="site-footer">
        <div class="footer-overlay"></div>
        <div class="footer-inner">
          
          <div class="footer-top">
            <!-- 左侧品牌与 Slogan -->
            <div class="footer-brand">
              <h2>PawCare 智护</h2>
              <p>用数据，给毛孩子更长久的陪伴。</p>
            </div>
            
            <!-- 右侧链接矩阵 -->
            <div class="footer-links">
              <div class="link-group">
                <h4>核心业务</h4>
                <a @click="$router.push('/workspace')">食安溯源</a>
                <a @click="$router.push('/graph')">关系图谱</a>
                <a @click="$router.push('/diet')">AI 膳食</a>
              </div>
              <div class="link-group">
                <h4>健康管理</h4>
                <a @click="$router.push('/pets')">宠物档案</a>
                <a @click="$router.push('/calendar')">免疫日历</a>
                <a @click="$router.push('/history')">历史报告</a>
              </div>
              <div class="link-group">
                <h4>关于平台</h4>
                <a @click="$router.push('/news')">行业智库</a>
                <a @click="$router.push('/api')">API 接口</a>
                <a>联系我们</a>
              </div>
            </div>
          </div>

          <!-- 底部声明 -->
          <div class="footer-bottom">
            <p class="copyright">© 2026 PawCare 智护团队. All Rights Reserved.</p>
            <p class="disclaimer">免责声明：本平台数据基于公开信息测算，仅供学术交流与消费参考，不构成专业医疗建议。</p>
          </div>
          
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import { ref, onMounted, onUnmounted } from 'vue'
// 平滑滚动方法
const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 130
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// 打开外部新闻
const openExternalNews = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}


// 轮播图数据配置
const currentSlide = ref(0)
const carouselItems = ref([
  {
    bg: '/engine1.jpg',
    title: '食安溯源审计',
    desc: '拍照识别配方，结合大宗商品价格反推真实成本，扒开虚假营销的底裤。',
    btnText: '立即查粮',
    link: '/workspace',
    align: 'align-left' // 文字在左
  },
  {
    bg: '/engine2.jpg',
    title: 'AI 膳食推演',
    desc: '基于真实营养学公式（RER），结合宠物体重与运动量，精准计算每日科学喂食量。',
    btnText: '开始计算',
    link: '/diet',
    align: 'align-right' // 文字在右
  },
  {
    bg: '/engine3.jpg',
    title: '宠物数字档案',
    desc: '建立专属健康档案，管理多宠家庭，记录每一次体重变化与过敏史。',
    btnText: '建立档案',
    link: '/pets',
    align: 'align-right'
  },
  {
    bg: '/engine4.jpg',
    title: '免疫驱虫日历',
    desc: '智能提醒下一次打疫苗、驱虫的时间，让健康管理不留死角。',
    btnText: '查看日历',
    link: '/calendar',
    align: 'align-left'
  }
])

// 自动轮播定时器
let timer = null

const startAutoPlay = () => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselItems.value.length
  }, 4000) // 4秒自动切换一次
}

// 点击指示器手动切换
const goToSlide = (index) => {
  currentSlide.value = index
  // 重新开始计时（防止刚点完立马自动切走）
  clearInterval(timer)
  startAutoPlay()
}

// 组件挂载时启动，卸载时清理（防止内存泄漏）
onMounted(() => {
  startAutoPlay()
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* =========================================
   网页环境光背景点缀（蓝调渐变）
========================================= */

/* 1. 给全局容器加一个相对定位，用来装光晕 */
.home-container {
  position: relative;
  overflow: hidden; /* 防止光晕撑出滚动条 */
}

/* 2. 左上角的蓝色光晕 */
.home-container::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -200px;
  width: 600px;
  height: 600px;
  /* 用径向渐变做出一团蓝色的光 */
  background: radial-gradient(circle, rgba(0, 210, 255, 0.12) 0%, transparent 70%);
  filter: blur(60px); /* 核心：极度模糊 */
  z-index: 0;
  pointer-events: none; /* 防止遮挡鼠标点击 */
}

/* 3. 右侧中部的蓝色光晕（科技蓝） */
.home-container::after {
  content: '';
  position: absolute;
  top: 30%;
  right: -200px;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(0, 82, 217, 0.08) 0%, transparent 60%);
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
}

/* ?? 关键：让所有内容都浮在光晕之上 */
.main-content {
  position: relative;
  z-index: 10;
}
.bg-decor { position: absolute; top: 0; left: 0; width: 100%; height: 800px; background-image: url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2000&auto=format&fit=crop'); background-size: cover; background-position: center; opacity: 0.03; z-index: 0; pointer-events: none; }
.main-content { max-width: 1200px; margin: 0 auto; padding: 140px 20px 0; position: relative; z-index: 1; }

/* --- 第一部分：高级分栏版 Hero 区 --- */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70vh;
  margin-bottom: 80px;
  gap: 60px;
  position: relative;
  z-index: 5;
}

/* 左侧文案 */
.hero-left {
  flex: 1.1;
  text-align: left;
}

.tag {
  display: inline-flex; align-items: center; gap: 8px;
  color: #0052D9; border: 1px solid rgba(0, 82, 217, 0.2);
  padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;
  margin-bottom: 24px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.pulse-dot {
  width: 8px; height: 8px; background: #0052D9; border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 82, 217, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(0, 82, 217, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 82, 217, 0); }
}

.main-title {
  font-size: 64px; font-weight: 900; margin: 0 0 24px 0;
  line-height: 1.15; color: #1D2129; letter-spacing: 1px;
}
.text-gradient {
  background: linear-gradient(90deg, #0052D9 0%, #00D2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sub-title { color: #4E5969; font-size: 18px; line-height: 1.8; margin-bottom: 40px; }

/* 引导按钮组 */
.hero-actions {
  display: flex; gap: 16px; margin-bottom: 30px;
}
.btn-primary {
  height: 56px; padding: 0 40px; background: #0052D9; color: #fff;
  border: none; border-radius: 8px; font-size: 16px; font-weight: bold;
  cursor: pointer; transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(0, 82, 217, 0.3);
}
.btn-primary:hover { background: #0043B2; transform: translateY(-3px); }
.btn-secondary {
  height: 56px; padding: 0 40px; background: #fff; color: #0052D9;
  border: 1px solid #B5D4FF; border-radius: 8px; font-size: 16px; font-weight: bold;
  cursor: pointer; transition: all 0.3s;
}
.btn-secondary:hover { background: #E8F3FF; transform: translateY(-3px); }

/* 信任背书小字 */
.hero-trust {
  display: flex; gap: 20px; color: #86909C; font-size: 14px;
}
.hero-trust span { display: flex; align-items: center; gap: 4px; }

/* --- 右侧：行星环绕布局 --- */
.hero-right {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* 给一个固定高度，方便绝对定位摆放 */
}

/* 中心光晕 */
.hero-image-glow {
  position: absolute;
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(0, 110, 255, 0.15) 0%, transparent 60%);
  border-radius: 50%;
  z-index: 1;
  filter: blur(30px);
}

/* 中间圆形主图 */
.center-circle {
  position: relative;
  z-index: 2;
  width: 320px;
  height: 320px;
  border-radius: 50%; /* 变圆 */
  overflow: hidden;
  border: 8px solid #fff; /* 加一圈白边，更具像化 */
  box-shadow: 0 20px 40px rgba(0, 82, 217, 0.15), inset 0 0 20px rgba(0,0,0,0.1);
  animation: heroFloat 6s ease-in-out infinite; /* 保留飘动 */
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片填满圆形不拉伸 */
}

/* 悬浮标签通用样式 (毛玻璃卡片) */
.float-tag {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 12px 20px;
  border-radius: 16px;
  border: 1px solid #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  /* 每个标签也有自己的飘动动画，但节奏不同，显得灵动 */
  animation: floatTag 5s ease-in-out infinite;
  transition: transform 0.3s;
}
.float-tag:hover {
  transform: scale(1.05) !important;
  background: #fff;
  box-shadow: 0 15px 40px rgba(0, 82, 217, 0.15);
}

.tag-icon {
  font-size: 24px;
  background: #F4F6F9;
  width: 40px; height: 40px;
  display: flex; justify-content: center; align-items: center;
  border-radius: 10px;
}
.tag-text h4 { margin: 0 0 4px 0; font-size: 15px; color: #1D2129; font-weight: bold; }
.tag-text p { margin: 0; font-size: 12px; color: #86909C; }

/* ?? 四个标签的具体位置 (手动微调出环绕感) */
.tag-1 { top: 10%; left: 0%; animation-delay: 0s; }
.tag-2 { top: 20%; right: 0%; animation-delay: 1.5s; }
.tag-3 { bottom: 15%; left: 5%; animation-delay: 1s; }
.tag-4 { bottom: 5%; right: 5%; animation-delay: 2.5s; }

/* 飘动关键帧 */
@keyframes heroFloat {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
@keyframes floatTag {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
/* --- 第二部分：锚点导航 --- */
.anchor-nav { display: flex; justify-content: center; gap: 60px; background: #fff; padding: 18px 0; width: 80%; max-width: 900px; margin: 0 auto 60px; border-radius: 50px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); position: sticky; top: 84px; z-index: 100; border: 1px solid #E5E6EB; }
.anchor-item { font-size: 16px; font-weight: 600; color: #4E5969; cursor: pointer; transition: all 0.3s; }
.anchor-item:hover { color: #0052D9; transform: scale(1.05); }

/* --- 通用版块标题 --- */
.section-header { text-align: center; margin-bottom: 50px; }
.section-header h2 { font-size: 32px; color: #1D2129; font-weight: 800; margin: 0 0 12px 0; }
.section-header p { font-size: 16px; color: #86909C; margin: 0; }

/* --- 第三部分：核心业务 --- */
.features-section { padding: 40px 0; margin-bottom: 60px; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feature-card { background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #E5E6EB; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; }
.feature-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color: #B5D4FF; }
.icon-bg { width: 56px; height: 56px; border-radius: 14px; display: flex; justify-content: center; align-items: center; font-size: 28px; margin-bottom: 20px; }
.icon-bg.blue { background: #E8F3FF; } .icon-bg.green { background: #E8FFEA; } .icon-bg.purple { background: #F5E8FF; } .icon-bg.orange { background: #FFF2E8; }
.feature-card h3 { font-size: 20px; color: #1D2129; margin: 0 0 12px 0; }
.feature-card p { font-size: 14px; color: #4E5969; line-height: 1.6; flex: 1; }
.action-link { display: block; margin-top: 20px; font-size: 14px; font-weight: bold; color: #0052D9; }

/* --- 第四部分：巨型预览图 --- */
.preview-section { padding: 40px 0; margin-bottom: 60px; }
.preview-mockup { background: #fff; border: 1px solid #E5E6EB; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); overflow: hidden; }
.mockup-header { background: #F8F9FA; padding: 14px 20px; display: flex; gap: 8px; border-bottom: 1px solid #E5E6EB; }
.mockup-header .dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #FF5F56; } .dot.yellow { background: #FFBD2E; } .dot.green { background: #27C93F; }
.preview-img { width: 100%; height: 500px; object-fit: cover; display: block; }


/* --- 全新底层技术支撑排版 --- */
/* --- 第五部分：底层技术支撑 (破局交叠排版) --- */
.engine-section { 
  padding: 80px 40px; 
  background: #F8FAFC; 
  background-image: radial-gradient(#E2E8F0 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 32px; 
  border: 1px solid #E5E6EB; 
  margin-bottom: 60px; 
}

.engine-list { 
  display: flex; 
  flex-direction: column; 
  gap: 80px; /* 卡片之间拉开距离 */
  max-width: 1100px;
  margin: 0 auto;
}

/* 核心：交叠容器 */
.engine-card {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

/* 反向排版 */
.engine-card.reverse {
  flex-direction: row-reverse;
}

/* 右侧大图区域 (占了 65% 的宽度) */
.engine-img-box { 
  width: 65%; 
  height: 320px; 
  border-radius: 24px; 
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.engine-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  display: block;
}

/* 左侧文字卡片 (强势压住图片) */
.engine-text-card {
  width: 45%;
  background: #FFFFFF;
  padding: 40px;
  border-radius: 24px;
  /* 高级弥散阴影，产生悬浮感 */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #F2F3F5;
  z-index: 2; /* 确保文字在图片上方 */
  margin-right: -10%; /* 往右压住图片 10% 的宽度 */
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

/* 反向时，文字框往左压 */
.engine-card.reverse .engine-text-card {
  margin-right: 0;
  margin-left: -10%;
}

/* 悬浮时，文字卡片飞起 */
.engine-text-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.eng-icon { margin-bottom: 20px; }
.engine-text-card h3 { font-size: 26px; color: #1D2129; margin: 0 0 16px 0; font-weight: 800; }
.engine-text-card p { font-size: 15px; color: #4E5969; line-height: 1.8; margin: 0; }

/* 悬浮毛玻璃数据卡片 (给整体增加细节) */
.glass-float {
  position: absolute;
  bottom: 30px;
  background: rgba(255, 255, 255, 0.9); 
  backdrop-filter: blur(16px); 
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid #fff;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 3;
  animation: floatCard 4s ease-in-out infinite !important;
}
/* 让数据卡片在右侧边缘探出头 */
.right-float { right: -30px; }
.left-float { left: -30px; }

@keyframes floatCard {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

.icon-box { width: 40px; height: 40px; border-radius: 10px; display: flex; justify-content: center; align-items: center; flex-shrink: 0; }
.bg-blue { background: #E8F3FF; }
.bg-green { background: #E8FFEA; }
.bg-purple { background: #F5E8FF; }
.glass-text h4 { margin: 0 0 4px 0; font-size: 15px; color: #1D2129; font-weight: bold; }
.glass-text p { margin: 0; font-size: 13px; color: #86909C; font-weight: 500; }
.text-green { color: #00B42A !important; }
.text-purple { color: #7B61FF !important; }

/* --- 第六部分：行业智库 (大厂门户风) --- */
.news-section { padding: 60px 0; border-top: 1px solid #E5E6EB; }
.news-header-row { margin-bottom: 40px; }
.section-header-left h2 { font-size: 32px; color: #1D2129; font-weight: 800; margin: 0 0 12px 0; }
.section-header-left p { font-size: 16px; color: #86909C; margin: 0; }

.news-layout { display: flex; gap: 30px; }
.news-main { flex: 1.2; background: #fff; border-radius: 20px; border: 1px solid #E5E6EB; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.news-main:hover { transform: translateY(-6px); box-shadow: 0 15px 35px rgba(0,0,0,0.08); border-color: #B5D4FF; }

/* 头条图片区域 (如果你有真实图片，在 HTML 里改 url) */
.news-main-img { height: 260px; background-size: cover; background-position: center; position: relative; }
.img-tag { position: absolute; top: 20px; left: 20px; background: #0052D9; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; }

.news-main-content { padding: 30px; }
.news-main-content h3 { font-size: 24px; color: #1D2129; margin: 16px 0; line-height: 1.4; font-weight: 800; }
.news-main-content p { font-size: 15px; color: #4E5969; line-height: 1.8; margin: 0; }

/* 右侧列表 */
.news-side { flex: 1; display: flex; flex-direction: column; gap: 24px; }
.news-item { background: #fff; padding: 30px; border-radius: 20px; border: 1px solid #E5E6EB; cursor: pointer; transition: all 0.3s; flex: 1; display: flex; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.news-item:hover { transform: translateY(-6px); box-shadow: 0 15px 35px rgba(0,0,0,0.08); border-color: #B5D4FF; }
.news-item h4 { font-size: 20px; color: #1D2129; margin: 12px 0; line-height: 1.4; font-weight: 700; }
.news-desc { font-size: 14px; color: #86909C; line-height: 1.6; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* 标签 */
.news-tag { font-size: 12px; color: #0052D9; background: #E8F3FF; padding: 4px 10px; border-radius: 4px; display: inline-block; font-weight: bold; }

/* 右下角按钮 */
.more-action-row { display: flex; justify-content: flex-end; margin-top: 40px; }
.btn-more { background: #fff; border: 1px solid #0052D9; color: #0052D9; padding: 14px 32px; border-radius: 30px; font-size: 15px; font-weight: bold; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0, 82, 217, 0.1); }
.btn-more:hover { background: #0052D9; color: #fff; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0, 82, 217, 0.3); }

/* --- Footer --- */
.site-footer { border-top: 1px solid #E5E6EB; padding: 40px 0; margin-top: 60px; }
.footer-content { display: flex; justify-content: space-between; align-items: center; color: #86909C; font-size: 14px; }
.footer-links a { color: #86909C; text-decoration: none; margin-left: 20px; transition: color 0.3s; }
.footer-links a:hover { color: #0052D9; }
/* --- 沉浸式全屏轮播 --- */
.hero-carousel-section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 500px; /* 轮播图高度，可根据需要调整 */
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
}

/* 轮播图片层 */
.carousel-slide {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.8s ease, visibility 0.8s ease, transform 1.5s ease;
  transform: scale(1.05); /* 切换时图片有微弱的缩放 */
  z-index: 1;
}

.carousel-slide.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  z-index: 2;
}

/* 遮罩层：左黑右透 或 右黑左透 */
.slide-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%);
  z-index: 2;
}

/* 动态调整遮罩方向（文字在右时） */
.carousel-slide .slide-content.align-right + .slide-overlay,
.carousel-slide:has(.align-right) .slide-overlay {
  background: linear-gradient(-90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%);
}

/* 内容区域 */
.slide-content {
  position: relative;
  z-index: 3;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  padding: 0 80px;
}

.slide-content.align-left { justify-content: flex-start; }
.slide-content.align-right { justify-content: flex-end; }

.content-box {
  max-width: 450px;
  color: #fff;
  /* 进入动画 */
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}
.carousel-slide.active .content-box {
  opacity: 1;
  transform: translateY(0);
}

.content-box h2 {
  font-size: 48px;
  font-weight: 900;
  margin: 0 0 20px 0;
  letter-spacing: 2px;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.content-box p {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 30px;
  color: #E5E6EB;
}

.slide-btn {
  padding: 16px 36px;
  background: #0052D9;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(0, 82, 217, 0.4);
}

.slide-btn:hover {
  background: #0043B2;
  transform: translateX(5px);
}

/* 底部指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 40px;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #0052D9;
  width: 60px; /* 选中的指示器变长 */
  box-shadow: 0 0 10px rgba(0, 82, 217, 0.5);
}
/* =========================================
   网页环境光背景点缀（蓝调渐变）
========================================= */

/* 1. 给全局容器加一个相对定位，用来装光晕 */
.home-container {
  position: relative;
  overflow: hidden; /* 防止光晕撑出滚动条 */
}

/* =========================================
   网页环境光背景点缀（蓝调渐变）
========================================= */

/* 1. 给全局容器加一个相对定位，用来装光晕 */
/* 确保最外层是可以作为参考系的 */
.home-container {
  position: relative;
  overflow: hidden; /* 防止光晕出边界出现滚动条 */
  background-color: #F4F6F9; /* 保持你原本的底色 */
}


/* 🌟 极光氛围层核心代码 */
/* 🌟 极光氛围层核心代码（轻盈呼吸版） */
.aurora-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* 铺满整个容器 */
  z-index: 1;
  pointer-events: none; 
  
  /* 🎨 色彩修正：浓度从 0.15 降到 0.06，位置分别放在左上、右中、左下，形成包围感 */
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(0, 110, 255, 0.06) 0%, transparent 40%),
    radial-gradient(circle at 85% 45%, rgba(0, 210, 255, 0.04) 0%, transparent 40%),
    radial-gradient(circle at 10% 80%, rgba(123, 97, 255, 0.04) 0%, transparent 40%);
    
  /* 让光晕极其缓慢地游走，增加灵动感 */
  animation: auroraFloat 20s ease-in-out infinite alternate;
}

@keyframes auroraFloat {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.1) translate(30px, 20px); }
}


/* 2. 左上角的蓝色光晕 */
.home-container::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -200px;
  width: 600px;
  height: 600px;
  /* 用径向渐变做出一团蓝色的光 */
  background: radial-gradient(circle, rgba(0, 210, 255, 0.12) 0%, transparent 70%);
  filter: blur(60px); /* 核心：极度模糊 */
  z-index: 0;
  pointer-events: none; /* 防止遮挡鼠标点击 */
}

/* 3. 右侧中部的蓝色光晕（科技蓝） */
.home-container::after {
  content: '';
  position: absolute;
  top: 30%;
  right: -200px;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(0, 82, 217, 0.08) 0%, transparent 60%);
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
}

/* ?? 关键：让所有内容都浮在光晕之上 */
.main-content {
  position: relative;
  z-index: 10;
}

/* 🚨 关键：让所有内容都浮在光晕之上 */
.main-content {
  position: relative;
  z-index: 10;
}
/* ================= 沉浸式全宽宠物背景 Footer (霸屏版) ================= */
.site-footer {
  position: relative;
  /* 破局魔法：强制突破父容器限制，100%铺满屏幕 */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  
  /* 确保背景图铺满 */
  background-image: url('/footer.jpg'); 
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  
  /* 上方留出巨大空间，制造呼吸感 */
  padding: 120px 0 60px; 
  margin-top: 100px;
}

/* 加深遮罩，让字绝对清晰 */
.footer-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to right, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.75) 50%, rgba(10, 10, 12, 0.4) 100%),
              linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0) 100%);
  z-index: 1;
}

.footer-inner {
  position: relative;
  z-index: 2;
  max-width: 1300px; /* 内容区变宽 */
  margin: 0 auto;
  color: #fff;
  padding: 0 40px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 90px; /* 上下拉开巨大距离 */
}

/* 左侧品牌区：字号超大 */
.footer-brand {
  flex: 1;
  max-width: 500px;
}
.footer-brand h2 {
  font-size: 48px; /* 超大字号 */
  font-weight: 900;
  margin: 0 0 20px 0;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #FFFFFF 0%, #00D2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.footer-brand p {
  font-size: 20px; /* 副标题也放大 */
  color: #E5E6EB;
  line-height: 1.6;
  margin: 0;
}

/* 右侧链接区：拉开间距 */
.footer-links {
  display: flex;
  gap: 120px; /* 列间距超大 */
}
.link-group h4 {
  font-size: 20px; /* 标题放大 */
  color: #fff;
  font-weight: bold;
  margin: 0 0 30px 0;
}
.link-group a {
  display: block;
  color: #C9CDD4;
  font-size: 16px; /* 链接字号放大 */
  margin-bottom: 20px; /* 行距拉开 */
  cursor: pointer;
  transition: all 0.3s;
}
.link-group a:hover {
  color: #00D2FF;
  transform: translateX(6px);
}

/* 底部声明区 */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* 分割线清晰一点 */
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.footer-bottom .copyright {
  font-size: 16px; /* 字体放大 */
  color: #C9CDD4;
  margin: 0;
}
.footer-bottom .disclaimer {
  font-size: 14px;
  color: #86909C;
  margin: 0;
  text-align: right;
  max-width: 500px;
}
</style>