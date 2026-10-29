<template>
  <header class="cyber-header">
    <!-- 左侧 Logo -->
    <div class="logo-area" @click="$router.push('/')">
      <div class="logo-mark">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="url(#paint0_linear)"/>
          <circle cx="9" cy="11" r="1.5" fill="#fff"/><circle cx="15" cy="11" r="1.5" fill="#fff"/><circle cx="12" cy="15" r="1.5" fill="#fff"/>
          <defs>
            <linearGradient id="paint0_linear" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0052D9"/><stop offset="1" stop-color="#00D2FF"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="logo-text-group">
        <span class="logo-text">PawCare 智护</span>
        <span class="en-text">AI PET WELLNESS</span>
      </div>
    </div>

    <!-- 中间 导航菜单 -->
    <nav class="nav-menu">
      <!-- 1. 首页 -->
      <div class="nav-item" @click="$router.push('/')">首页</div>
      
      <!-- 2. 智护引擎 -->
      <div class="nav-dropdown">
        <div class="nav-item">智护引擎 <span class="arrow">▼</span></div>
        <div class="dropdown-panel">
          <div class="dropdown-item" @click="$router.push('/workspace')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#0052D9" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div class="info"><h4>食安溯源审计</h4><p>跳转核心算成本页面</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/graph')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#0052D9" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div>
            <div class="info"><h4>供应链图谱</h4><p>跳转关系图</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/ingredients')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#0052D9" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31M14 2v7.31M7 10a5 5 0 0 0 10 0V2H7v8z"/><path d="M12 15v7"/></svg></div>
            <div class="info"><h4>原料成分拆解</h4><p>真实的成分查询接口</p></div>
          </div>
        </div>
      </div>

      <!-- 3. 全生命周期档案 -->
      <div class="nav-dropdown">
        <div class="nav-item">全生命周期档案 <span class="arrow">▼</span></div>
        <div class="dropdown-panel">
          <div class="dropdown-item" @click="$router.push('/pets')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#00B42A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"/><path d="M9 12h6"/></svg></div>
            <div class="info"><h4>宠物档案管理</h4><p>真实的新增、读取宠物信息</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/calendar')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#00B42A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
            <div class="info"><h4>免疫与驱虫日历</h4><p>真实的日历表单，数据入库</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/vitals')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#00B42A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
            <div class="info"><h4>体征数据追踪</h4><p>记录真实体重变化</p></div>
          </div>
        </div>
      </div>

      <!-- 4. AI 膳食管家 -->
      <div class="nav-dropdown">
        <div class="nav-item">AI 膳食管家 <span class="arrow">▼</span></div>
        <div class="dropdown-panel">
          <div class="dropdown-item" @click="$router.push('/diet')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#FF7D00" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
            <div class="info"><h4>热量与喂食计算</h4><p>真实的数学物理公式 RER 计算</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/expenses')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#FF7D00" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
            <div class="info"><h4>养宠开销账本</h4><p>真实记录每一次审计的花费</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/symptom')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#FF7D00" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
            <div class="info"><h4>症状与便便自检</h4><p>真实调用视觉 API 识别图片</p></div>
          </div>
        </div>
      </div>

      <!-- 5. 行业智库 -->
      <div class="nav-dropdown">
        <div class="nav-item">行业智库 <span class="arrow">▼</span></div>
        <div class="dropdown-panel">
          <div class="dropdown-item" @click="$router.push('/news')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#86909C" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg></div>
            <div class="info"><h4>行业标准速递</h4><p>最新国标与监管动态</p></div>
          </div>
          <div class="dropdown-item" @click="$router.push('/history')">
            <div class="icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="#86909C" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 0 1-18 0 9 9 0 0 1 18 0z"/></svg></div>
            <div class="info"><h4>历史审计记录</h4><p>真实的数据库读取</p></div>
          </div>
        </div>
      </div>

      <!-- 6. 关于我们 -->
      <div class="nav-item" @click="scrollToAbout">关于我们</div>
    </nav>

    <!-- 右侧操作区 7. 登录注册 -->
    <div class="action-area">
      <span class="login-btn" @click="showLoginModal = true">登录 / 注册</span>
      <button class="btn-start" @click="$router.push('/dashboard')">进入控制台</button>
    </div>

    <!-- 模拟登录弹窗 -->
    <div class="modal-overlay" v-if="showLoginModal" @click.self="showLoginModal = false">
      <div class="login-box">
        <h3>登录 PawCare</h3>
        <p>Demo 演示环境：无需输入真实密码</p>
        <input type="text" placeholder="请输入账号" />
        <input type="password" placeholder="请输入密码" />
        <button class="submit-login" @click="mockLogin">立即登录</button>
        <span class="close-btn" @click="showLoginModal = false">×</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const showLoginModal = ref(false)

const mockLogin = () => {
  alert('Demo 演示：登录成功！即将进入控制台。')
  showLoginModal.value = false
  router.push('/dashboard')
}

// 关于我们滚动逻辑
const scrollToAbout = () => {
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  } else {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.cyber-header { position: fixed; top: 0; left: 0; width: 100%; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; box-sizing: border-box; background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0, 0, 0, 0.06); z-index: 1000; }
.logo-area { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.logo-mark svg { width: 32px; height: 32px; }
.logo-text-group { display: flex; flex-direction: column; text-align: left; }
.logo-text { color: #1D2129; font-size: 18px; font-weight: 800; letter-spacing: 1px; line-height: 1.1; }
.en-text { font-size: 10px; color: #86909C; font-weight: 600; margin-top: 2px; }

.nav-menu { display: flex; gap: 0; height: 100%; align-items: center; }
.nav-item { padding: 8px 12px; color: #4E5969; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; border-radius: 6px; display: flex; align-items: center; height: 100%; }
.nav-item:hover { color: #0052D9; background: rgba(0, 82, 217, 0.05); }
.arrow { font-size: 10px; margin-left: 4px; color: #86909C; }

.nav-dropdown { position: relative; height: 100%; display: flex; align-items: center; }
.dropdown-panel { position: absolute; top: 60px; left: 50%; transform: translateX(-50%) translateY(10px); width: 360px; background: #fff; border-radius: 12px; padding: 12px; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1); border: 1px solid #E5E6EB; opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.nav-dropdown:hover .dropdown-panel { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.dropdown-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
.dropdown-item:hover { background: #F8F9FA; }
.dropdown-item .icon { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; background: #F2F3F5; border-radius: 8px; flex-shrink: 0; }
.dropdown-item:hover .icon { background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.dropdown-item .info h4 { margin: 0 0 4px 0; font-size: 15px; color: #1D2129; font-weight: 600; }
.dropdown-item .info p { margin: 0; font-size: 12px; color: #86909C; line-height: 1.4; }

.action-area { display: flex; align-items: center; gap: 20px; }
.login-btn { font-size: 14px; color: #4E5969; cursor: pointer; font-weight: 500; transition: color 0.3s; }
.login-btn:hover { color: #0052D9; }
.btn-start { background: #0052D9; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0, 82, 217, 0.2); }
.btn-start:hover { background: #0043B2; transform: translateY(-1px); }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.login-box { background: #fff; padding: 30px; border-radius: 16px; width: 320px; text-align: center; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.login-box h3 { margin: 0 0 5px 0; font-size: 20px; color: #1D2129; }
.login-box p { margin: 0 0 20px 0; font-size: 13px; color: #86909C; }
.login-box input { width: 100%; box-sizing: border-box; margin-bottom: 15px; padding: 12px; border: 1px solid #E5E6EB; border-radius: 8px; outline: none; }
.login-box input:focus { border-color: #0052D9; }
.submit-login { width: 100%; background: #0052D9; color: #fff; border: none; padding: 12px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; }
.close-btn { position: absolute; top: 15px; right: 20px; font-size: 24px; color: #86909C; cursor: pointer; }
</style>