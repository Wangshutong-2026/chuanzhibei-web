<template>
  <div class="home-page">
    <Header />
    <div class="main-container">
      <!-- 1. Hero 区 -->
      <section class="hero-section">
        <div class="dashed-border"></div>
        <div class="bg-image-wrapper">
          <img src="/bg.png" alt="温馨背景" class="full-bg" />
          <div class="bg-overlay"></div>
        </div>
        <div class="hero-text">
          <h1>世界很大，<br>它的世界只有你。</h1>
          <p>从嗷嗷待哺到步履蹒跚，用数据定格它的成长轨迹，做它最合格的铲屎官。</p>
          <button class="cta-btn" @click="router.push('/pets')">立即创建档案 →</button>
        </div>
        <div class="hero-visual">
          <div class="sticker main-sticker"><img src="/tiezhi1.png" alt="主宠物" /></div>
          <div class="sticker small-sticker s1"><img src="/tiezhi2.png" alt="小宠物1" /></div>
          <div class="sticker small-sticker s2"><img src="/tiezhi3.png" alt="小宠物2" /></div>
          <div class="sticker small-sticker s3"><img src="/tiezhi4.png" alt="小宠物3" /></div>
          <div class="paw-float p1"><svg viewBox="0 0 24 24" fill="#FFB6C1"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg></div>
          <div class="paw-float p2"><svg viewBox="0 0 24 24" fill="#B4E197"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg></div>
          <div class="paw-float p3"><svg viewBox="0 0 24 24" fill="#A6D0FF"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg></div>
          <div class="paw-float p4"><svg viewBox="0 0 24 24" fill="#FFE4A0"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg></div>
        </div>
        <img class="bottom-left-sticker" src="/tiezhi5.png" alt="破形装饰" />
      </section>
      <!-- ================= 2. 贴心养护服务 (便利贴版) ================= -->
      <section class="services-section">
        <img src="/bird.png" class="corner-decor top-left" alt="小鸟" />
        <img src="/gecko.png" class="corner-decor bottom-right" alt="守宫" />
        <div class="section-header-wrap">
          <div class="tape-title-img">
            <img src="/jiaotiao1.png" alt="胶布1" />
            <h2>贴心养护服务</h2>
          </div>
          <p class="section-subtitle">陪伴它的每一个重要时刻，我们都在</p>
        </div>
        <div class="services-container">
          <div class="service-card" style="--bg-color: #FFE4EC;" @click="router.push('/pets')">
            <div class="sticker-icon" style="--icon-color: #FF7A9E;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <h3>宠物档案</h3>
            <p class="short-desc">记录毛孩子信息</p>
            <div class="feature-tags">
              <span>基础资料</span>
              <span>头像上传</span>
            </div>
          </div>
          <div class="service-card" style="--bg-color: #E0F6E9;" @click="router.push('/feed')">
            <div class="sticker-icon" style="--icon-color: #3DBE7B;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
            </div>
            <h3>每日喂食</h3>
            <p class="short-desc">科学喂养记录</p>
            <div class="feature-tags">
              <span>AI饮食建议</span>
              <span>喂食统计</span>
            </div>
          </div>
          <!-- 免疫日历卡片：待办>0显示小红点 -->
          <div class="service-card" style="--bg-color: #E1F0FF;" @click="router.push('/calendar')">
            <div v-if="soonExpireImmCount > 0" class="tip-dot"></div>
            <div class="sticker-icon" style="--icon-color: #4B93FF;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            </div>
            <h3>免疫日历</h3>
            <p class="short-desc">疫苗驱虫提醒</p>
            <div class="feature-tags">
              <span>日程提醒</span>
              <span>健康记录</span>
            </div>
          </div>
          <div class="service-card" style="--bg-color: #FFF3D6;" @click="router.push('/bill')">
            <div class="sticker-icon" style="--icon-color: #FFB020;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h3>日常账本</h3>
            <p class="short-desc">养宠开销记账</p>
            <div class="feature-tags">
              <span>支出统计</span>
              <span>消费分析</span>
            </div>
          </div>
          <div class="service-card" style="--bg-color: #F1EAFF;" @click="router.push('/news')">
            <div class="sticker-icon" style="--icon-color: #9365FF;">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h3>养护百科</h3>
            <p class="short-desc">专业养宠知识</p>
            <div class="feature-tags">
              <span>科普文章</span>
              <span>避坑指南</span>
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
          <svg class="curve-svg-line" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M 0 150 Q 250 50, 500 100 T 1000 50" fill="none" stroke="#E6D0B3" stroke-width="4" stroke-dasharray="10 10" stroke-linecap="round" />
          </svg>
          <div class="timeline-items">
            <div class="timeline-item pos-1">
              <div class="dog-img-box">
                <img src="/dog1.png" alt="幼年" />
              </div>
              <div class="paw-icon paw-s">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg>
              </div>
              <h3>幼年期</h3>
              <p class="age">0 - 6个月</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>建立基础免疫。</p>
                <p><strong>系统功能：</strong>自动生成疫苗接种时间表，提供少食多餐测算。</p>
              </div>
            </div>
            <div class="timeline-item pos-2">
              <div class="dog-img-box">
                <img src="/dog2.png" alt="青年" />
              </div>
              <div class="paw-icon paw-m">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg>
              </div>
              <h3>青年期</h3>
              <p class="age">7个月 - 2岁</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>行为训练与体态塑造。</p>
                <p><strong>系统功能：</strong>记录换牙期异常，提供充足的运动量消耗计算。</p>
              </div>
            </div>
            <div class="timeline-item pos-3">
              <div class="dog-img-box">
                <img src="/dog3.png" alt="成年" />
              </div>
              <div class="paw-icon paw-l">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg>
              </div>
              <h3>成年期</h3>
              <p class="age">3 - 6岁</p>
              <div class="time-content">
                <p><strong>核心任务：</strong>维持体态与口腔健康。</p>
                <p><strong>系统功能：</strong>肥胖风险预警，联动日常账本记录每年的体检开销。</p>
              </div>
            </div>
            <div class="timeline-item pos-4">
              <div class="dog-img-box">
                <img src="/dog4.png" alt="老年" />
              </div>
              <div class="paw-icon paw-xl">
                <svg viewBox="0 0 24 24" fill="#F3C255"><circle cx="6" cy="10" r="3" /><circle cx="18" cy="10" r="3" /><circle cx="10" cy="5" r="3" /><circle cx="14" cy="5" r="3" /><path d="M12 13C8.5 13 5 16 5 19C5 21 7 22 9 22H15C17 22 19 21 19 19C19 16 15.5 13 12 13Z" /></svg>
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
      <!-- ================= 4. 养宠知识情报站 ================= -->
      <section class="news-section">
        <div class="section-header-wrap">
          <div class="tape-title-img">
            <img src="/jiaotiao3.png" alt="胶布3" />
            <h2>养宠知识情报站</h2>
          </div>
          <p class="section-subtitle">拒绝网络谣言，用专业兽医知识武装日常养护</p>
        </div>
        <div class="news-layout">
          <div class="news-left">
            <div class="news-card large-card" @click="router.push('/news')" style="cursor: pointer;">
              <img src="/cat.jpg" class="large-card-cover" alt="科普封面" />
              <div class="news-content">
                <div class="news-tag" style="background: #FFE4EC; color: #FF7A9E;">饮食避坑</div>
                <h3>不要再给猫咪喝牛奶了！不仅没用还致命</h3>
                <p>绝大多数成年猫咪都有乳糖不耐受，喝牛奶极易导致严重腹泻和脱水。如果想补充营养，请选择专用的宠物羊奶粉。</p>
                <span class="read-more">前往养护百科 →</span>
              </div>
            </div>
            <div class="news-side-stack">
              <div class="news-card small-card" @click="router.push('/news')" style="cursor: pointer;">
                <div class="news-tag" style="background: #FFF3D6; color: #FFB020;">饲养避坑</div>
                <h3>仓鼠绝对不能合笼饲养！</h3>
                <p>仓鼠领地意识极强，合笼极易导致惨烈打架。系统在建立异宠档案时，会自动向新手主人推送“单笼独居”的预警提示。</p>
                <span class="read-more">阅读更多 →</span>
              </div>
              <div class="news-card small-card" @click="router.push('/news')" style="cursor: pointer;">
                <div class="news-tag" style="background: #E0F6E9; color: #3DBE7B;">环境温控</div>
                <h3>豹纹守宫缺钙怎么补？</h3>
                <p>爬宠极易缺乏维生素D3导致骨骼变形。专属异宠档案支持记录日常喂食的含钙量。</p>
                <span class="read-more">阅读更多 →</span>
              </div>
            </div>
          </div>
          <div class="news-right-img">
            <img src="/samo.png" alt="萨摩耶" class="samo-sticker" />
          </div>
        </div>
      </section>
      <!-- 🔵第三优先级：AI健康日报【静态占位，仅答辩展望，不调用后端】 -->
      <section class="ai-preview-section">
        <div class="ai-preview-card">
          <div class="ai-preview-title">🤖 AI健康日报（规划功能）</div>
          <p class="ai-preview-desc">整合宠物档案、喂食、免疫驱虫数据，AI生成每日健康总结，本功能将在后续迭代接入大模型接口。</p>
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
          <button class="cta-btn-large" @click="router.push('/pets')">
            立即创建档案 <span class="arrow">➔</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
const router = useRouter()

const petArchiveList = ref([])
const immuneList = ref([])

// 只读取小红点 +空状态需要的数据
function loadBaseData() {
  const petStr = localStorage.getItem('petArchiveList')
  petArchiveList.value = petStr ? JSON.parse(petStr) : []

  const immuneStr = localStorage.getItem('vaccineRecordList')
  immuneList.value = immuneStr ? JSON.parse(immuneStr) : []
}

// 只用于首页服务卡片小红点
const soonExpireImmCount = ref(0)
function calcImmTodo() {
  if(!immuneList.value.length){
    soonExpireImmCount.value = 0
    return
  }
  const nowTime = new Date()
  const sevenDayLater = new Date(Date.now() + 7*24*60*60*1000)
  soonExpireImmCount.value = immuneList.value.filter(item=>{
    if(!item.next) return false
    const t = new Date(item.next)
    return t >= nowTime && t <= sevenDayLater
  }).length
}

onMounted(() => {
  loadBaseData()
  calcImmTodo()
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');
.home-page {
  min-height: 100vh;
  background-color: #FDFAF5;
  font-family: -apple-system, sans-serif;
  padding-top: 80px;
  overflow-x: hidden;
  background-image: url('home_bg.jpg');
  background-size:cover;
  background-attachment: fixed;
  background-color:rgba(253, 250, 245, 0.8);
  background-blend-mode: overlay;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}
/* 空状态卡片 */
.empty-warn-section {
  padding:40px 0;
}
.empty-card {
  background:#fffdf9;
  border:2px dashed #D4A373;
  border-radius:24px;
  text-align:center;
  padding:32px;
}
.empty-card h3 {
  color:#5C3A21;
  margin:0 0 12px;
}
.empty-card p {
  color:#8892A0;
  margin:0 0 20px;
}
.empty-btn {
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color:#fff;
  border:none;
  padding:12px 28px;
  border-radius:30px;
  cursor:pointer;
}
/* 小红点提醒 */
.service-card{
  position:relative;
}
.tip-dot{
  position:absolute;
  top:12px;
  right:12px;
  width:12px;
  height:12px;
  background:#e53935;
  border-radius:50%;
}
/* AI健康日报静态占位 */
.ai-preview-section{
  margin:40px 0 10px;
}
.ai-preview-card{
  background:#fff8e8;
  border:1px dashed #e2c49c;
  border-radius:16px;
  padding:20px;
  text-align:center;
}
.ai-preview-title{
  font-size:17px;
  font-weight:bold;
  color:#8c5e38;
  margin-bottom:8px;
}
.ai-preview-desc{
  font-size:14px;
  color:#6b4c32;
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
.dashed-border {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border-radius: 35px;
  pointer-events: none;
  z-index: 20;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='35' ry='35' stroke='%23C08552' stroke-width='20' stroke-dasharray='60 40' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  background-size: 100% 100%;
}
.bottom-left-sticker {
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 160px;
  height: auto;
  z-index: 30;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.15));
  animation: floatSmall 5s ease-in-out infinite;
}
.hero-text h1 {
  font-family: 'ZCOOL KuaiLe', "YouYuan", "Microsoft YaHei", sans-serif;
  font-size: 48px;
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
  padding-left: 90px;
  padding-bottom: 40px;
}
.hero-text p {
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #5E6B82;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 420px;
  letter-spacing: 0.5px;
}
.cta-btn { background: #1A2B4C; color: #FFF; border: none; padding: 16px 36px; border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-left:20px;position: relative; z-index: 30; }
.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(26, 43, 76, 0.2); }
.hero-visual {
  flex: 1.1;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transform: translateY(20px);
}
.sticker {
  position: absolute;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
}
.sticker img { width: 100%; height: 100%; object-fit: contain; }
.main-sticker {
  width: 480px;
  height: 480px;
  z-index: 5;
  animation: wobbleMain 6s ease-in-out infinite;
}
.small-sticker { z-index: 6; }
.s1 { width: 160px; height: 160px; top: 10%; left: 5%; animation: floatSmall 5s ease-in-out infinite alternate; }
.s2 { width: 100px; height: 100px; top: 15%; right: 10%; animation: floatSmall 7s ease-in-out infinite alternate-reverse; }
.s3 { width: 130px; height: 130px; bottom: 10%; right: 5%; animation: wobbleSmall 4s ease-in-out infinite; }
.paw-float { position: absolute; z-index: 7; opacity: 0.9; }
.p1 { width: 50px; height: 50px; top: 15%; left: 35%; animation: floatPaw 4s ease-in-out infinite alternate; }
.p2 { width: 40px; height: 40px; bottom: 25%; left: 25%; animation: floatPaw 5s ease-in-out infinite alternate-reverse; }
.p3 { width: 55px; height: 55px; top: 5%; right: 25%; animation: floatPaw 6s ease-in-out infinite alternate; }
.p4 { width: 45px; height: 45px; bottom: 20%; right: 20%; animation: floatPaw 4s ease-in-out infinite alternate-reverse; }
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
.section-header-wrap { text-align: center; margin-bottom: 60px; position: relative; z-index: 10; }
.tape-title-img { position: relative; display: inline-block; margin-bottom: 12px; }
.tape-title-img img { width: 280px; height: auto; opacity: 0.9; display: block; }
.tape-title-img h2 { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0; font-size: 24px; color: #5C3A21; font-weight: 900; letter-spacing: 2px; white-space: nowrap; }
.section-subtitle { font-size: 16px; color: #8892A0; margin-top: 10px; }
.services-section { padding: 100px 0; position: relative; overflow: visible; }
.corner-decor { position: absolute; width: 140px; height: 140px; object-fit: contain; z-index: 1; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); }
.top-left { top: 190px; left: -50px; animation: floatCorner 6s ease-in-out infinite; }
.bottom-right { bottom: 10px; right: -50px; animation: floatCorner 7s ease-in-out infinite alternate-reverse; }
@keyframes floatCorner {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
.services-container { display: flex; justify-content: center; gap: 24px; position: relative; z-index: 10; }
.service-card {
  width: 190px; height: 250px; background-color: var(--bg-color);
  border-radius: 32px; border: 6px solid #FFFFFF;
  box-shadow: 0 15px 30px rgba(0,0,0,0.06), inset 0 -4px 10px rgba(0,0,0,0.03);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.service-card:hover { transform: translateY(-12px) scale(1.05) rotate(-2deg); box-shadow: 0 25px 40px rgba(0,0,0,0.1), inset 0 -4px 10px rgba(0,0,0,0.03); }
.sticker-icon { width: 72px; height: 72px; background: #FFFFFF; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; color: var(--icon-color); box-shadow: 0 8px 16px rgba(0,0,0,0.05); }
.service-card h3 { font-size: 20px; color: #1A2B4C; margin-bottom: 8px; font-weight: 900; }
.short-desc { font-size: 13px; color: #8892A0; margin-bottom: 15px; }
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
.timeline-section { padding: 80px 0; position: relative; z-index: 10; }
.curve-timeline-wrapper {
  position: relative;
  max-width: 1150px;
  margin: 60px auto 0;
  padding: 40px 0;
}
.curve-svg-line {
  position: absolute;
  top: 50%; left: 0;
  width: 100%; height: 100%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
}
.timeline-items {
  display: flex;
  justify-content: center;
  gap:40px;
  align-items: flex-start;
  position: relative;
  z-index: 5;
}
.timeline-item {
  width: 24.5%;
  border-radius: 28px;
  padding: 24px 20px;
  border: 6px solid #FFFFFF;
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.timeline-item:hover {
  transform: translateY(-15px) scale(1.03) !important;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  z-index: 10;
}
.pos-1 { transform: translateY(40px); background-color: #FFF0F5; }
.pos-2 { transform: translateY(0px);  background-color: #E1F0FF; }
.pos-3 { transform: translateY(20px); background-color: #FFF9EC; }
.pos-4 { transform: translateY(60px); background-color: #E0F6E9; }
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
  filter: drop-shadow(0 12px 12px rgba(0,0,0,0.15));
}
.paw-icon {
  margin-bottom: 12px;
}
.paw-s { width: 22px; height: 22px; }
.paw-m { width: 28px; height: 28px; }
.paw-l { width: 34px; height: 34px; }
.paw-xl { width: 40px; height: 40px; }
.timeline-item h3 {
  font-size: 22px;
  color: #1A2B4C;
  margin: 0 0 6px;
  font-weight: 900;
}
.timeline-item .age {
  color: #5C3A21;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 16px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 14px;
  border-radius: 20px;
  border: 1.5px solid #E6D0B3;
}
.time-content {
  background: rgba(255, 255, 255, 0.6);
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.time-content p {
  margin: 0 0 10px 0;
  font-size: 15px;
  color: #1A2B4C;
  line-height: 1.7;
}
.time-content p:last-child { margin-bottom: 0; }
.time-content strong {
  color: #5C3A21;
  font-weight: 900;
}
.news-section { padding: 80px 0; position: relative; z-index: 10; }
.news-layout {
  display: flex;
  gap: 30px;
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto;
}
.news-left {
  flex: 2;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-rows: auto auto;
  gap: 20px;
}
.large-card { grid-row: 1 / 3; display: flex; flex-direction: column; }
.news-side-stack { display: flex; flex-direction: column; gap: 20px; }
.news-card {
  background: #FFFDF9;
  padding: 24px;
  border-radius: 24px;
  border: 3px dashed #D4A373;
  box-shadow: 0 10px 25px rgba(0,0,0,0.03);
  transition: all 0.3s;
}
.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  border-color: #5C3A21;
}
.news-tag { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 900; margin-bottom: 15px; }
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
  text-decoration:none;
}
.news-card:hover .read-more { color: #5C3A21; transform: translateX(5px); }
.news-right-img {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
}
.samo-sticker {
  width: 100%;
  max-width: 360px;
  height: auto;
  object-fit: contain;
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
.cta-section {
  padding: 80px 0 100px;
  position: relative;
  z-index: 10;
}
.cta-card {
  background-image: url('/bg.png');
  background-size: cover;
  background-position: center;
  border-radius: 40px;
  padding: 60px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 2px dashed #E6D0B3;
  max-width: 950px;
  margin: 0 auto;
}
.cta-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(253, 250, 245, 0.75);
  z-index: 1;
}
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
</style>
