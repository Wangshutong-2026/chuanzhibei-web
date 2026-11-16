<template>
  <div class="bill-page">
    <div class="container">
      <!-- 标题区：和养护百科、宠物档案结构完全一致 -->
      <div class="section-header-wrap">
        <div class="tape-title-img">
          <img src="/jiaotiao2.png" alt="胶布背景" />
          <h2>💰 养宠日常账本</h2>
        </div>
        <p class="section-subtitle">记录每一笔养宠开销，让陪伴更安心、更清楚。</p>
      </div>

      <div class="add-bill-card card-animate">
        <h3>新增消费记录</h3>
        <div class="form-row">
          <div class="form-item">
            <label>选择养护宠物</label>
            <select v-model="selectedPetId">
              <option v-if="petList.length === 0" value="" disabled>暂无宠物档案，请先去创建</option>
              <option
                v-for="pet in petList"
                :key="pet.id"
                :value="pet.id"
              >
                {{ pet.name }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label>消费类别</label>
            <select v-model="form.type">
              <option value="粮品">宠粮零食</option>
              <option value="医疗">医疗体检</option>
              <option value="用品">宠物用品</option>
              <option value="洗护">洗护美容</option>
              <option value="其他">其他开销</option>
            </select>
          </div>
          <div class="form-item">
            <label>金额（元）</label>
            <input type="number" v-model="form.money" placeholder="输入金额" />
          </div>
          <div class="form-item">
            <label>消费日期</label>
            <input type="date" v-model="form.date" />
          </div>
          <div class="form-item">
            <label>备注</label>
            <input type="text" v-model="form.remark" placeholder="例如：猫粮一袋" />
          </div>
        </div>
        <button class="add-btn" @click="addBill">添加记录</button>
      </div>

      <div class="bill-list-card card-animate">
        <h3>📋 账单记录</h3>
        <p class="current-pet-tip" v-if="currentSelectPetName">
          当前养护宠物：{{ currentSelectPetName }}
        </p>
        <div class="bill-table">
          <div class="table-head">
            <span>日期</span>
            <span>类别</span>
            <span>金额</span>
            <span>备注</span>
            <span>操作</span>
          </div>
          <div
            class="table-row"
            v-for="(item, index) in petBillList"
            :key="item.id"
          >
            <span>{{ item.date }}</span>
            <span>{{ item.type }}</span>
            <span class="money">{{ item.money }} 元</span>
            <span>{{ item.remark }}</span>
            <span>
              <button class="del-btn" @click="delBill(item.id)">删除</button>
            </span>
          </div>
        </div>
        <div class="stat-area">
          <div class="stat-item">累计花费：<b>{{ totalMoney }} 元</b></div>
          <div class="stat-item">本月花费：<b>{{ monthMoney }} 元</b></div>
          <div class="stat-item">本年花费：<b>{{ yearMoney }} 元</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const petList = ref([])
const selectedPetId = ref('')

const form = ref({
  type: '粮品',
  money: '',
  date: '',
  remark: ''
})

const allBillList = ref([])
const BILL_KEY = 'petBillList'
const PET_ARCHIVE_KEY = 'petArchiveList'

// 读取宠物档案
function loadPetList() {
  const raw = localStorage.getItem(PET_ARCHIVE_KEY)
  petList.value = raw ? JSON.parse(raw) : []
  // 给旧宠物补id
  petList.value = petList.value.map(pet => {
    if (!pet.id) {
      pet.id = Date.now().toString()
    }
    return pet
  })
  // 如果选中的宠物已经被删掉，才切换；保留用户自己选的，不要乱覆盖
  const hasSelectPet = petList.value.some(p => p.id === selectedPetId.value)
  if (petList.value.length > 0 && !hasSelectPet) {
    selectedPetId.value = petList.value[0].id
  }
}

// 读取账单
function loadBillData() {
  const raw = localStorage.getItem(BILL_KEY)
  allBillList.value = raw ? JSON.parse(raw) : []
}

function saveBillData() {
  localStorage.setItem(BILL_KEY, JSON.stringify(allBillList.value))
}

const currentSelectPetName = computed(() => {
  const pet = petList.value.find(p => p.id === selectedPetId.value)
  return pet ? pet.name : ''
})

const petBillList = computed(() => {
  if (!selectedPetId.value) return []
  return allBillList.value.filter(bill => bill.petId === selectedPetId.value)
})

const totalMoney = computed(() => {
  return petBillList.value.reduce((sum, item) => sum + Number(item.money), 0)
})

const monthMoney = computed(() => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return petBillList.value
    .filter(item => {
      const dArr = item.date.split('-')
      return dArr[0] == y && dArr[1] == m
    })
    .reduce((sum, item) => sum + Number(item.money), 0)
})

const yearMoney = computed(() => {
  const now = new Date()
  const y = now.getFullYear()
  return petBillList.value
    .filter(item => item.date.startsWith(String(y)))
    .reduce((sum, item) => sum + Number(item.money), 0)
})

const addBill = () => {
  if (!selectedPetId.value) {
    alert('请先选择宠物！')
    return
  }
  if (!form.value.money || !form.value.date) {
    alert('请填写金额和日期')
    return
  }
  allBillList.value.push({
    id: Date.now().toString(),
    petId: selectedPetId.value,
    type: form.value.type,
    money: Number(form.value.money),
    date: form.value.date,
    remark: form.value.remark
  })
  saveBillData()
  form.value.money = ''
  form.value.remark = ''
}

const delBill = (billId) => {
  allBillList.value = allBillList.value.filter(item => item.id !== billId)
  saveBillData()
}

// storage监听，跨标签页更新
function handleStorageChange() {
  loadPetList()
  loadBillData()
}

onMounted(() => {
  loadPetList()
  loadBillData()
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<style scoped>
.bill-page {
  min-height: 100vh;
  background-image: url("/bill-bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-color: rgba(253, 250, 245, 0.5);
  background-blend-mode: overlay;
  font-family: -apple-system, sans-serif;
  padding-top: 120px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 80px;
}
.section-header-wrap {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 10;
}
.tape-title-img {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}
.tape-title-img img {
  width: 280px;
  height: auto;
  opacity: 0.9;
  display: block;
}
.tape-title-img h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 24px;
  color: #5C3A21;
  font-weight: 900;
  letter-spacing: 2px;
  white-space: nowrap;
}
.section-subtitle {
  font-size: 16px;
  color: #8892A0;
  margin-top: 10px;
}
.card-animate {
  background: #FFFDF9;
  border: 2px dashed #D4A373;
  border-radius: 20px;
  padding: 26px;
  margin-bottom: 24px;
}
.card-animate h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #5C3A21;
}
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap:16px;
}
.form-item {
  display: flex;
  flex-direction: column;
  gap:8px;
}
.form-item label {
  font-size:14px;
  color:#44382e;
}
.form-item input,
.form-item select {
  width:100%;
  box-sizing: border-box;
  border:1px solid #e6d0b3;
  border-radius:10px;
  padding:10px 12px;
  font-size:14px;
  background:#fffdf9;
}
.form-item input:focus,
.form-item select:focus {
  outline: none;
  border-color: #5C3A21;
}
.add-btn {
  margin-top:20px;
  width:100%;
  height:44px;
  border-radius:10px;
  border:none;
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color:#fff;
  font-size:15px;
  font-weight:600;
  cursor:pointer;
  transition:0.25s;
}
.add-btn:hover {
  transform: translateY(-2px);
}
.current-pet-tip {
  font-size:14px;
  color:#5C3A21;
  margin-bottom:16px;
}
.bill-table {
  width:100%;
}
.table-head {
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 100px;
  font-weight:bold;
  padding:12px 8px;
  color:#5C3A21;
  border-bottom:1px dashed #E6D0B3;
}
.table-row {
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 100px;
  padding:12px 8px;
  border-bottom:1px dashed #F3E9DD;
  align-items:center;
  font-size:14px;
  color:#4E5969;
}
.money {
  color:#c83c3c;
  font-weight:bold;
}
.del-btn {
  border:none;
  background:#ffeeee;
  color:#c83c3c;
  border-radius:6px;
  padding:4px 8px;
  cursor:pointer;
  font-size:12px;
}
.stat-area {
  margin-top:20px;
  display:flex;
  gap:24px;
  flex-wrap:wrap;
}
.stat-item {
  font-size:15px;
  color:#4E5969;
}
.stat-item b {
  color:#5C3A21;
}
</style>
