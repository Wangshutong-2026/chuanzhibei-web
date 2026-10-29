
<template>
  <div class="workspace-layout">
    <!-- 左侧导航 -->
    <aside class="sidebar">
      <div class="logo-area">
        <div class="logo-icon"></div>
        <span class="logo-text">透明仓</span>
      </div>
      <nav class="menu-list">
        <div class="menu-item">📊 数据总览</div>
        <div class="menu-item active">🔍 智能审计工作台</div>
        <div class="menu-item">🕸️ 供应链穿透图谱</div>
        <div class="menu-item">📄 历史报告记录</div>
        <div class="menu-item">🔗 API 接口管理</div>
      </nav>
    </aside>

    <!-- 右侧主内容 -->
    <main class="main-area">
      <header class="top-header">
        <div class="breadcrumb">
          <span class="crumb-item">工作台</span>
          <span class="crumb-separator">/</span>
          <span class="crumb-item active">智能审计</span>
        </div>
        <div class="demo-badge">
          <span class="pulse-dot"></span> Demo 体验模式 | 免登录
        </div>
      </header>

      <div class="content-body">
        <!-- 数据总览 -->
        <div class="data-cards">
          <div class="data-card">
            <div class="card-title">今日审计次数</div>
            <div class="card-value">128 <span class="unit">次</span></div>
          </div>
          <div class="data-card warning">
            <div class="card-title">发现成本倒挂 (高风险)</div>
            <div class="card-value text-red">45 <span class="unit">次</span></div>
          </div>
          <div class="data-card">
            <div class="card-title">平均计算耗时</div>
            <div class="card-value">2.5 <span class="unit">秒</span></div>
          </div>
        </div>

        <!-- 核心操作区 -->
        <div class="operation-panel">
          <div class="panel-header">
            <h2 class="panel-title">
              启动新一次配方成本测算
              <!-- 一键填充按钮 -->
              <span class="quick-demo-btn" @click="fillDemoData">✨ 一键填入真实测试数据</span>
            </h2>
            <p class="panel-desc">请上传清晰的正规包装背面配料表与营养保证值截图。</p>
          </div>
          
          <input type="file" id="file-upload" @change="handleFileChange" accept="image/*" style="display: none;" />

          <div class="form-group">
            <div class="upload-box" :class="{ 'error-border': showError && !imagePreview }" @click="triggerUpload">
              <img v-if="imagePreview" :src="imagePreview" class="preview-img" />
              <template v-else>
                <div class="scan-animation"></div>
                <div class="plus-icon">+</div>
                <p>拖拽截图到此处，或点击上传</p>
                <span class="sub-hint">支持 JPG, PNG 格式</span>
              </template>
            </div>
            
            <div class="form-bottom">
              <div class="input-group">
                <div class="price-input" :class="{ 'error-border': showError && !price }">
                  <span>￥</span>
                  <input type="number" v-model="price" placeholder="输入日常售价 (元/斤)" />
                </div>
                <span class="error-text" v-if="showError && !price">* 请输入售价</span>
              </div>
              
              <button 
                class="submit-btn" 
                @click="startAudit" 
                :disabled="isAuditing || !imagePreview || !price"
              >
                {{ isAuditing ? 'AI 深度审计中...' : '启动深度审计' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 加载动画 -->
        <div v-if="isAuditing" class="loading-panel">
          <div class="radar-scanner"></div>
          <p class="loading-text">正在比对农业农村部数据与大宗商品价格...</p>
        </div>

        <!-- 动态审计报告 -->
        <transition name="slide-up">
          <div v-if="showReport && !isAuditing" class="report-panel">
            <div class="report-header">
              <h2>📄 最新审计报告</h2>
              <!-- 动态标签：红牌或绿牌 -->
              <span :class="['status-tag', currentReport.status === 'danger' ? 'danger' : 'safe']">
                {{ currentReport.statusText }}
              </span>
            </div>
            
            <div class="report-content">
              <div class="cost-compare">
                <div class="compare-row">
                  <span class="label">市场售价：</span>
                  <!-- 修改1：使用 Number().toFixed(2) 防止出现 25.5.00 的情况 -->
                  <span class="val red">￥{{ Number(price).toFixed(2) }} /斤</span>
                </div>
                <div class="compare-row">
                  <span class="label">真实测算成本：</span>
                  <!-- 修改2：成本也用 toFixed(2) 规范格式 -->
                  <span class="val green">￥{{ currentReport.realCost.toFixed(2) }} /斤</span>
                </div>
                <div class="bar-chart">
                  <div class="bar-item">
                    <div class="bar bg-red" style="height: 100%;"></div>
                    <span>售价</span>
                  </div>
                  <div class="bar-item">
                    <!-- 修改3：核心防崩代码。价格为空时默认按1算，且最高不超过100% -->
                    <div class="bar bg-green" :style="{ height: `${Math.min((currentReport.realCost / (Number(price) || 1)) * 100, 100)}%` }"></div>
                    <span>成本</span>
                  </div>
                </div>
              </div>

              <div class="ai-conclusion" :class="currentReport.status === 'danger' ? 'border-red' : 'border-green'">
                <h3>AI 深度分析结论：</h3>
                <ul>
                  <li>{{ currentReport.conclusion1 }}</li>
                  <li>{{ currentReport.conclusion2 }}</li>
                </ul>
                <button class="btn-outline">查看完整溯源图谱 →</button>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const price = ref('')
const isAuditing = ref(false)
const showReport = ref(false)
const imagePreview = ref(null)
const showError = ref(false)

// 默认空报告数据
const currentReport = ref({
  status: 'danger',
  statusText: '等待审计',
  realCost: 0,
  conclusion1: '',
  conclusion2: ''
})

// 预设的 3 个真实打假/鉴宝案例
const demoLibrary = [
  {
    img: '/bad1.jpg', // 全是谷物和诱食剂的图
    price: 15,
    realCost: 4.5,
    status: 'danger',
    statusText: '红灯：高碳水劣质粮',
    conclusion1: '【配料雷区】检测到大量“大米、小麦、玉米蛋白粉”与“宠物饲料复合调味料”。利用廉价碳水凑重，并依赖诱食剂掩盖劣质原料。',
    conclusion2: '【成本倒挂】以 15 元/斤的售价，扣除营销与包装费用，真实出厂成本极低。长期食用易导致宠物软便、营养不良。'
  },
  {
    img: '/bad2.jpg', // 含骨粉和防腐剂的图
    price: 25,
    realCost: 8,
    status: 'danger',
    statusText: '红灯：慢性毒粮预警',
    conclusion1: '【成分造假】检测到“鸡肉骨粉”、“牛肉骨粉”及“口味增强剂”。标称粗蛋白靠植物蛋白与骨粉勉强凑数，吸收率极差。',
    conclusion2: '【安全隐患】配料表中赫然出现 BHA/BHT 等争议性防腐剂。长期食用会对宠物肝脏、肾脏造成不可逆损伤。'
  },
  {
    img: '/good.jpg', // 82%鲜肉的图
    price: 68,
    realCost: 35,
    status: 'safe',
    statusText: '绿灯：优质配方通过',
    conclusion1: '【配方透明】前两位为“鲜鸡肉50%、酶解鲜鸡肉20%”，动物性原料高达 82%。未发现廉价谷物与植物蛋白充数。',
    conclusion2: '【溢价合理】虽然售价较高，但用料扎实。系统判定为优质粮，不属于智商税产品，推荐有条件的宠物主购买。'
  }
]

let demoIndex = 0

const triggerUpload = () => {
  document.getElementById('file-upload').click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
    showError.value = false
    // 如果是用户手动上传的，给一个默认的“待分析”数据
    currentReport.value = {
      status: 'danger',
      statusText: '待分析',
      realCost: 10,
      conclusion1: '系统已提取配料表。',
      conclusion2: '等待 AI 深度计算……'
    }
  }
}

// 一键填入真实测试数据 (按顺序循环 3 个案例)
const fillDemoData = () => {
  const data = demoLibrary[demoIndex]
  imagePreview.value = data.img
  price.value = data.price
  currentReport.value = data
  showError.value = false
  
  demoIndex = (demoIndex + 1) % demoLibrary.length
}

const startAudit = () => {
  if (!imagePreview.value || !price.value) {
    showError.value = true
    return
  }
  
  isAuditing.value = true
  showReport.value = false

  // 准备真实的数据包 (FormData) 用来装图片
  const formData = new FormData()
  
  // 拿到页面上用户上传的那个真实图片文件
  const fileInput = document.getElementById('file-upload')
  
  if (fileInput && fileInput.files.length > 0) {
    // 如果有真实图片，就装进去
    formData.append('file', fileInput.files[0])
  } else {
    // 如果用户点了一键填充（没有真实文件），就不让他往下走
    alert("为了让 AI 真实识别，请手动选择一张配料表图片上传！")
    isAuditing.value = false
    return
  }
  
  // 把价格也装进去
  formData.append('price', price.value)

  // 模拟 1.5 秒的 AI 计算时间
  setTimeout(async () => {
    try {
      // 🌟 注意这里：请求的是 real_audit 接口，不再是 save_audit 了
      const res = await axios.post('http://127.0.0.1:8000/api/real_audit', formData)
      
      if(res.data.status === 'success') {
        const aiData = res.data.data
        // 把 AI 返回的真实数据填进报告里
        currentReport.value = {
          realCost: aiData.cost,
          statusText: aiData.risk,
          conclusion1: aiData.analysis,
          conclusion2: "此结论由通义千问 VL 视觉大模型实时识别包装图生成。"
        }
        showReport.value = true
      } else {
        alert("AI 识别失败：" + res.data.message)
      }
    } catch (error) {
      console.error("❌ 详细错误信息:", error)
      
      // 👇 核心：把后端的真实报错或者网络错误弹出来，不让他只说“未连接”
      if (error.response) {
        // 请求发出去了，但后端返回了错误状态码（比如 422, 500）
        alert(`后端返回错误! 状态码: ${error.response.status}，详情: ${JSON.stringify(error.response.data)}`)
      } else if (error.request) {
        // 请求发出去了，但没收到响应（大概率是跨域被拦，或者后端崩了）
        alert("请求无响应！大概率是跨域(CORS)被浏览器拦截，请检查后端是否加了允许跨域的中间件！")
      } else {
        alert('前端代码报错: ' + error.message)
      }
    } finally {
      isAuditing.value = false
    }
  }, 1500)
}
</script>

<style scoped>
/* --- 基础布局 --- */
.workspace-layout { display: flex; height: 100vh; background-color: #EBEDF0; font-family: sans-serif; }
.sidebar { width: 240px; background-color: #18212D; color: #fff; padding: 20px 0; border-right: 1px soild rgba(0,0,0,0.1);}
.logo-area { display: flex; align-items: center; padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.logo-icon { width: 28px; height: 28px; background: linear-gradient(135deg, #0052D9 0%, #00D2FF 100%); border-radius: 6px; margin-right: 10px; }
.logo-text { font-size: 18px; font-weight: bold; }
.menu-list { margin-top: 20px; }
.menu-item { padding: 14px 24px; color: #86909C; cursor: pointer; font-size: 15px; transition: all 0.2s; }
.menu-item:hover { color: #fff; background: rgba(255,255,255,0.06); }
.menu-item.active { color: #00D2FF; background: rgba(0, 210, 255, 0.12); border-left: 4px solid #00D2FF; }

/* --- 右侧主内容 --- */
.main-area { 
    flex: 1; 
    display: flex; 
    flex-direction: column; 
    overflow-y: auto; 
}
.top-header { height: 60px; background-color: #fff; display: flex; justify-content: space-between; align-items: center; padding: 0 30px; border-bottom: 1px solid #F2F3F5; }
.breadcrumb { display: flex; align-items: center; font-size: 14px; }
.crumb-item { color: #86909C; cursor: pointer; }
.crumb-item.active { color: #1D2129; font-weight: 600; }
.crumb-separator { margin: 0 8px; color: #C9CDD4; }

.demo-badge { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #0052D9; background: #E8F3FF; padding: 6px 16px; border-radius: 20px; font-weight: 600; border: 1px solid #B5D4FF; }
.pulse-dot { width: 8px; height: 8px; background: #00B42A; border-radius: 50%; box-shadow: 0 0 0 0 rgba(0, 180, 42, 0.7); animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 180, 42, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 180, 42, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 180, 42, 0); } }

.content-body { padding: 30px; max-width: 1000px; margin: 0 auto; width: 100%; }

/* --- 数据卡片 --- */
.data-cards { display: flex; gap: 20px; margin-bottom: 30px; }
.data-card { flex: 1; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #E5E6EB; }
.data-card.warning { border-color: rgba(227, 77, 89, 0.3); }
.card-title { color: #86909C; font-size: 14px; margin-bottom: 10px; }
.card-value { font-size: 32px; font-weight: bold; }
.text-red { color: #E34D59; }
.unit { font-size: 14px; font-weight: normal; color: #86909C; }

/* --- 操作区 --- */
.operation-panel { background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #E5E6EB; margin-bottom: 30px; }
.panel-header { margin-bottom: 20px; }
.panel-title { display: flex; align-items: center; gap: 15px; margin: 0 0 10px 0; font-size: 20px; color: #1D2129; }
.panel-desc { color: #86909C; font-size: 14px; margin: 0; }

.quick-demo-btn { font-size: 12px; color: #E34D59; background: #FFECE8; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
.quick-demo-btn:hover { background: #FFD4CC; }

.form-group { display: flex; flex-direction: column; gap: 15px; }
.upload-box { position: relative; width: 100%; height: 200px; border: 2px dashed #00D2FF; border-radius: 12px; background: #F8F9FA; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; overflow: hidden; transition: all 0.3s; }
.upload-box.error-border { border-color: #E34D59; background: #FFF2F0; }
.upload-box:hover { background: #E8F3FF; }
.scan-animation { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0, 210, 255, 0.15), transparent); animation: scan 2s infinite linear; pointer-events: none; }
@keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
.preview-img { 
  width: 100%; 
  height: 100%; 
  object-fit: contain; /* 保持比例缩放 */
  background-color: #F4F6F9; /* 换成极浅的灰色底色，消除刺眼的黑色 */
  padding: 10px; /* 给图片四周留一点呼吸空间 */
  box-sizing: border-box;
  border-radius: 10px;
}
.plus-icon { font-size: 40px; color: #0052D9; z-index: 10; margin-bottom: 5px; }
.upload-box p { color: #1D2129; font-size: 16px; font-weight: 500; z-index: 10; margin: 5px 0; }
.sub-hint { color: #86909C; font-size: 12px; z-index: 10; }

.form-bottom { display: flex; gap: 15px; align-items: flex-start; width: 100%; margin-top: 5px; }
.input-group { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.price-input { display: flex; align-items: center; border: 1px solid #E5E6EB; border-radius: 8px; padding: 0 15px; background: #F8F9FA; height: 48px; transition: border-color 0.3s; }
.price-input.error-border { border-color: #E34D59; background: #FFF2F0; }
.price-input span { color: #86909C; margin-right: 10px; font-weight: bold; }
.price-input input { flex: 1; border: none; background: transparent; outline: none; font-size: 16px; }

.error-text { color: #E34D59; font-size: 12px; margin-top: 6px; margin-left: 2px; }

.submit-btn { flex-shrink: 0; height: 48px; padding: 0 30px; background: #0052D9; color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s; }
.submit-btn:hover { background: #0043B2; }
.submit-btn:disabled { background: #E5E6EB; color: #86909C; cursor: not-allowed; box-shadow: none; }

/* --- Loading 动画 --- */
.loading-panel { text-align: center; padding: 40px; background: #fff; border-radius: 12px; margin-bottom: 30px; border: 1px solid #E5E6EB; }
.radar-scanner { width: 50px; height: 50px; border: 4px solid #E8F3FF; border-top-color: #0052D9; border-radius: 50%; margin: 0 auto 15px; animation: spin 1s infinite linear; }
@keyframes spin { 100% { transform: rotate(360deg); } }
.loading-text { color: #0052D9; font-weight: bold; font-size: 15px; }

/* --- 报告区 --- */
.slide-up-enter-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(40px); }
.report-panel { background: #fff; border-radius: 12px; border: 1px solid #E5E6EB; padding: 30px; }
.report-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F2F3F5; padding-bottom: 15px; margin-bottom: 20px; }
.report-header h2 { margin: 0; font-size: 18px; color: #1D2129; }

/* 红绿状态标签 */
.status-tag { padding: 4px 12px; border-radius: 4px; font-size: 13px; font-weight: bold; }
.status-tag.danger { background: #FFECE8; color: #E34D59; }
.status-tag.safe { background: #E8FFEA; color: #00B42A; }

.report-content { display: flex; gap: 40px; }
.cost-compare { width: 300px; }
.compare-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 15px; }
.compare-row .label { color: #86909C; }
.compare-row .val { font-weight: bold; }
.val.red { color: #E34D59; }
.val.green { color: #00B42A; }

.bar-chart { display: flex; align-items: flex-end; gap: 20px; height: 100px; margin-top: 20px; padding-left: 20px; }
.bar-item { display: flex; flex-direction: column; align-items: center; width: 40px; height: 100%; justify-content: flex-end; }
.bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.5s; }
.bg-red { background: #E34D59; }
.bg-green { background: #00B42A; }
.bar-item span { margin-top: 8px; font-size: 12px; color: #86909C; }

/* AI 结论区动态边框 */
.ai-conclusion { flex: 1; background: #F8F9FA; padding: 20px; border-radius: 8px; }
.ai-conclusion.border-red { border-left: 4px solid #E34D59; }
.ai-conclusion.border-green { border-left: 4px solid #00B42A; }

.ai-conclusion h3 { margin: 0 0 15px 0; font-size: 16px; color: #1D2129; }
.ai-conclusion ul { padding-left: 20px; margin: 0 0 20px 0; color: #4E5969; font-size: 14px; line-height: 1.8; }
.btn-outline { background: transparent; border: 1px solid #0052D9; color: #0052D9; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-outline:hover { background: #E8F3FF; }
</style>
