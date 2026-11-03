<template>
  <div class="feed-page">
    <Header />
    <div class="main-container">
      <!-- 页面头部：胶带标题 -->
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <img class="tape-bg-img" src="/jiaotiao5.png" alt="胶带背景" />
            <h1>每日喂食记录</h1>
          </div>
          <p>记录毛孩子每日饮食，掌握喂食频率，预防过饥过饱</p>
        </div>
      </div>

      <!-- 今日统计卡片 -->
      <div class="stat-card">
        <div class="stat-item">
          <div class="num">{{ todayFeedCount }}</div>
          <div class="label">今日喂食次数</div>
        </div>
        <div class="stat-item">
          <div class="num">{{ feedList.length }}</div>
          <div class="label">总记录条数</div>
        </div>
      </div>

      <div class="content-wrap">
        <!-- 左侧：新增喂食记录表单 -->
        <div class="form-panel">
          <h3>➕ 添加喂食记录</h3>

          <div class="form-item">
            <label>选择宠物（来自宠物档案）</label>
            <select v-model="selectedPetId" @change="handlePetChange">
              <option value="">请选择宠物</option>
              <option v-for="pet in petArchiveList" :key="pet.id" :value="pet.id">
                {{ pet.name }}｜{{ pet.type }}
              </option>
            </select>
          </div>

          <!-- ✨ AI饮食分析提示框：选中宠物后才出现 -->
          <div v-if="aiTip.show || aiLoading" class="ai-tip-block">
              <div class="ai-title">🤖 AI饮食参考分析</div>
              <div v-if="aiLoading" class="ai-content">AI思考中，请稍候……</div>
              <div v‑else class="ai-content">{{ aiTip.content }}</div>
          </div>


          <div class="form-item">
            <label>食物类型</label>
            <select v-model="form.foodType">
              <option value="">请选择食物</option>
              <option value="主粮">主粮</option>
              <option value="罐头">罐头</option>
              <option value="冻干">冻干</option>
              <option value="零食">零食</option>
              <option value="蔬菜水果">蔬菜水果</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-item">
            <label>喂食时间</label>
            <input type="datetime-local" v-model="form.feedTime" />
          </div>
          <div class="form-item">
            <label>备注（选填）</label>
            <textarea v-model="form.remark" placeholder="食量、状态等补充信息"></textarea>
          </div>

          <div class="btn-group">
            <button class="btn primary" @click="submitRecord">保存记录</button>
            <button class="btn reset" @click="resetForm">重置</button>
          </div>

          <!-- 没有宠物档案的时候提示跳转去创建档案 -->
          <div v-if="petArchiveList.length === 0" class="warn-tip">
            ⚠️ 暂无宠物档案，请先前往【宠物档案】页面添加宠物！
            <br />
            <router-link to="/pet-archive" class="link-go">👉 去创建宠物档案</router-link>
          </div>
        </div>

        <!-- 右侧：喂食历史记录列表 -->
        <div class="list-panel">
          <h3>📋 喂食历史记录</h3>
          <div v-if="feedList.length === 0" class="empty-tip">
            暂无喂食记录，快来添加第一条吧✨
          </div>
          <div class="feed-item" v-for="(item, index) in feedList" :key="index">
            <div class="item-top">
              <span class="pet-tag">{{ item.petName }}</span>
              <span class="food-tag">{{ item.foodType }}</span>
              <span class="time-text">{{ item.feedTime }}</span>
              <button class="del-btn" @click="deleteRecord(index)">🗑️ 删除</button>
            </div>
            <div class="item-remark" v-if="item.remark">备注：{{ item.remark }}</div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-up">
      <div v-if="toastMessage" class="custom-toast">{{ toastMessage }}</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const router = useRouter()

// 宠物档案列表
const petArchiveList = ref([])
const selectedPetId = ref('')
const currentPetInfo = ref(null)

// AI状态
const aiTip = ref({
  show: false,
  content: ''
})
const aiLoading = ref(false)

// 表单
const form = ref({
  petName: '',
  petId: '',
  foodType: '',
  feedTime: '',
  remark: ''
})

// 喂食记录
const feedList = ref([])
const toastMessage = ref('')
let toastTimer = null

// 今日喂食数量
const todayFeedCount = computed(() => {
  const todayStr = new Date().toLocaleDateString()
  return feedList.value.filter(item => {
    return new Date(item.feedTime).toLocaleDateString() === todayStr
  }).length
})

// 根据生日计算年龄
function getAgeByBirth(birthStr) {
  if (!birthStr) return 1
  const birth = new Date(birthStr)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--
  }
  return age <= 0 ? 0.2 : age
}

// 读取本地存储
onMounted(() => {
  // 读取宠物档案原始数据
  const petArchiveStr = localStorage.getItem('petArchiveList')
  if (petArchiveStr) {
    const rawList = JSON.parse(petArchiveStr)
    petArchiveList.value = rawList.map(pet => ({
      id: pet.id,
      name: pet.name,
      type: pet.breed,
      age: getAgeByBirth(pet.birth),
      weight: Number(pet.weight)
    }))
  }

  // 读取喂食记录
  const localFeed = localStorage.getItem('feedRecord')
  if (localFeed) {
    feedList.value = JSON.parse(localFeed)
  }
  form.value.feedTime = new Date().toISOString().slice(0, 16)
})

// 宠物切换
const handlePetChange = async () => {
  aiTip.value.show = false
  aiTip.value.content = ''
  currentPetInfo.value = null
  if (!selectedPetId.value) return

  const findPet = petArchiveList.value.find(p => p.id === selectedPetId.value)
  if (!findPet) return
  currentPetInfo.value = findPet

  const aiReqParams = {
    petName: findPet.name,
    petSpecies: findPet.type,
    petAge: Number(findPet.age) || 1,
    petWeight: Number(findPet.weight) || 2,
  }

  aiLoading.value = true
  try {
    // =====================
    // ⚠️【开发调试：模拟AI，页面可以正常点击】
    // 等写完Node后端，注释下面模拟，打开fetch请求
    await new Promise(resolve => setTimeout(resolve,600))
    let mockAiText=''
    const age=aiReqParams.petAge
    const weight=aiReqParams.petWeight
    if(aiReqParams.petSpecies.includes('猫')||aiReqParams.petSpecies.includes('狗')){
      if(age<1){
        mockAiText=`【幼宠提醒】${aiReqParams.petName}年龄${age}岁，属于幼年期，代谢高，建议少量多餐，每日分3‑4餐。体重${weight}kg，注意幼宠不要无限制投喂零食，优先保证主粮占比。`
      }else if(age>=7){
        mockAiText=`【老年宠提醒】${aiReqParams.petName}已${age}岁，步入老年阶段。体重${weight}kg，建议控制热量，减少高脂肪零食，优先选择老年专用粮，警惕肥胖加重内脏负担。`
      }else{
        mockAiText=`【成年宠参考】${aiReqParams.petName}${age}岁，体重${weight}kg。成宠建议每日2餐，零食总量不要超过每日总热量10%，避免过度投喂造成肥胖。`
      }
    }else{
      mockAiText=`【异宠参考】${aiReqParams.petName}（${aiReqParams.petSpecies}），体重${weight}kg。异宠饮食差异很大，请严格遵循该物种专属饲养标准，不要随意投喂人类零食。`
    }
    aiTip.value.content=mockAiText
    aiTip.value.show=true

    /*
    // ==========【正式上线：后端写好后启用这一段fetch】==========
    const res = await fetch('/api/pet/aiFeedAdvice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aiReqParams)
    })
    if (!res.ok) throw new Error('服务异常')
    const data = await res.json()
    aiTip.value.content = data.advice
    aiTip.value.show = true
    */

  } catch (err) {
    console.error('AI请求失败', err)
    showToastMsg('AI分析服务暂时不可用，请稍后重试')
  } finally {
    aiLoading.value = false
  }

  form.value.petId = findPet.id
  form.value.petName = findPet.name
}

// 保存喂食记录到本地存储
const saveLocalFeed = () => {
  localStorage.setItem('feedRecord', JSON.stringify(feedList.value))
}

const showToastMsg = (msg) => {
  toastMessage.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMessage.value = '' }, 2200)
}

// 提交记录
const submitRecord = () => {
  if (!form.value.petId) return showToastMsg('请从档案选择一只宠物！')
  if (!form.value.foodType) return showToastMsg('请选择食物类型')
  if (!form.value.feedTime) return showToastMsg('请选择喂食时间')

  feedList.value.unshift({ ...form.value })
  saveLocalFeed()
  showToastMsg('喂食记录保存成功✅')
  resetForm()
}

// 重置表单
const resetForm = () => {
  selectedPetId.value = ''
  currentPetInfo.value = null
  aiTip.value.show = false
  aiTip.value.content = ''
  form.value.petName = ''
  form.value.petId = ''
  form.value.foodType = ''
  form.value.remark = ''
  form.value.feedTime = new Date().toISOString().slice(0, 16)
}

// 删除记录
const deleteRecord = (idx) => {
  feedList.value.splice(idx, 1)
  saveLocalFeed()
  showToastMsg('已删除该记录')
}
</script>



<style scoped>
.feed-page {
  min-height: 100vh;
  background-image: url('/home_bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-color: rgba(253, 250, 245, 0.82);
  background-blend-mode: overlay;
  font-family: -apple-system, sans-serif;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

/* 页面头部标题 */
.page-header {
  margin-bottom: 32px;
}
.header-left {
  position: relative;
}
.tape-title-img {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}
.tape-bg-img {
  width: 280px;
  height: 60px;
  display: block;
  object-fit: contain;
}
.tape-title-img h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 32px;
  color: #5C3A21;
  font-weight: 900;
  letter-spacing: 1px;
  white-space: nowrap;
}
.header-left p {
  font-size: 15px;
  color: #8892A0;
  margin: 0;
  padding-left: 8px;
}

/* 统计卡片行 */
.stat-card {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
}
.stat-item {
  flex-shrink: 0;
  min-width: 160px;
  background: #FFFDF9;
  border: 2px dashed #D4A373;
  border-radius: 16px;
  padding: 18px 24px;
  text-align: center;
}
.stat-item .num {
  font-size: 32px;
  font-weight: bold;
  color: #5C3A21;
  margin-bottom: 6px;
}
.stat-item .label {
  font-size: 14px;
  color: #8c6b4f;
}

/* 主体左右分栏 */
.content-wrap {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
.form-panel {
  width: 420px;
  flex-shrink: 0;
  background: #FFFDF9;
  border: 2px dashed #D4A373;
  border-radius: 20px;
  padding: 26px;
}
.form-panel h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #5C3A21;
}
.form-item {
  margin-bottom: 18px;
}
.form-item label {
  display: block;
  font-size: 14px;
  color: #44382e;
  margin-bottom: 8px;
}
.form-item input,
.form-item select,
.form-item textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e6d0b3;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fffdf9;
}
.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
  outline: none;
  border-color: #5C3A21;
}
.form-item textarea {
  min-height: 80px;
  resize: vertical;
}

/* 🤖 AI饮食提示框样式 */
.ai-tip-block {
  background: #fff8e8;
  border:1px solid #e2c49c;
  border-radius:12px;
  padding:14px 16px;
  margin-bottom:18px;
}
.ai-title {
  font-weight:bold;
  color:#8c5e38;
  margin-bottom:6px;
  font-size:14px;
}
.ai-content {
  font-size:13.5px;
  color:#6b4c32;
  line-height:1.6;
}

.warn-tip {
  margin-top:16px;
  padding:12px;
  background:#fff1e8;
  border-radius:10px;
  font-size:13px;
  color:#b05c2b;
  line-height:1.6;
}
.link-go {
  color:#8c5e38;
  font-weight:bold;
}

.btn-group {
  display: flex;
  gap:12px;
  margin-top: 10px;
}
.btn {
  flex:1;
  height:42px;
  border-radius:10px;
  border:none;
  cursor:pointer;
  font-weight:600;
  font-size:14px;
  transition:0.25s;
}
.btn.primary {
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color:#fff;
}
.btn.reset {
  background:#f3e9dd;
  color:#5C3A21;
}
.btn:hover {
  transform: translateY(-2px);
}

/* 记录列表 */
.list-panel {
  flex: 1;
  background: #FFFDF9;
  border: 2px dashed #D4A373;
  border-radius: 20px;
  padding: 26px;
  min-height: 420px;
}
.list-panel h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #5C3A21;
}
.empty-tip {
  text-align: center;
  padding:60px 0;
  color:#8c6b4f;
  font-size:15px;
}
.feed-item {
  padding:16px;
  border-radius:12px;
  background:#fff;
  border:1px dashed #E6D0B3;
  margin-bottom:14px;
}
.item-top {
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}
.pet-tag {
  background:#E8F3FF;
  color:#0052D9;
  font-size:13px;
  padding:3px 10px;
  border-radius:8px;
  font-weight:bold;
}
.food-tag {
  background:#F1EAFF;
  color:#9365FF;
  font-size:13px;
  padding:3px 10px;
  border-radius:8px;
  font-weight:bold;
}
.time-text {
  font-size:13px;
  color:#8892A0;
  margin-left:auto;
}
.del-btn {
  border:none;
  background:#ffe9e9;
  color:#d14343;
  border-radius:6px;
  padding:4px 8px;
  cursor:pointer;
  font-size:12px;
}
.item-remark {
  margin-top:10px;
  font-size:14px;
  color:#5E6B82;
}

/* toast */
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(29, 33, 41, 0.9);
  color: #fff;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 15px;
  z-index: 9999;
  backdrop-filter: blur(4px);
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
