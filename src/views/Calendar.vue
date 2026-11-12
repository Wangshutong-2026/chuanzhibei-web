<template>
  <div class="calendar-page">
    <Header />
    <div class="main-container">
      <!-- 【和PetArchive、PetBill完全统一标题区】 -->
      <div class="section-header-wrap">
        <div class="tape-title-img">
          <img src="/jiaotiao4.png" alt="胶布背景" />
          <h2>💉免疫日历</h2>
        </div>
        <p class="section-subtitle">记录什么时候打的疫苗、在哪打的，下次接种日期会自动提醒你</p>
      </div>

      <!-- 筛选栏：宠物下拉 + 月份切换 -->
      <div class="filter-bar">
        <div class="pet-select-wrap">
          <span>当前宠物</span>
          <select v-model="selectPetId">
            <option value="">全部宠物</option>
            <option v-for="pet in petList" :key="pet.id" :value="pet.id">
              {{ pet.name }}
            </option>
          </select>
        </div>
        <div class="month-control">
          <button @click="prevMonth">&lt;</button>
          <span>{{ currentYear }} 年 {{ currentMonth }} 月</span>
          <button @click="nextMonth">&gt;</button>
          <button class="today-btn" @click="goToday">回到本月</button>
        </div>
      </div>

      <div class="content-row">
        <!-- 日历组件 -->
        <VaccineCalendar
          :year="currentYear"
          :month="currentMonth"
          :records="filterRecords"
          @pick-date="openForm"
        />
        <!-- 记录清单 -->
        <div class="record-panel">
          <h3>免疫记录清单</h3>
          <div v-if="filterRecords.length === 0" class="empty-tip">暂无免疫记录</div>
          <div v-else class="record-list">
            <div class="record-item" v-for="item in filterRecords" :key="item.id">
              <div class="rec-top">
                <span class="rec-pet">{{ item.petName }}</span>
                <span class="rec-type tag">{{ item.type }}</span>
              </div>
              <p>{{ item.name }}</p>
              <div class="rec-date">接种：{{ item.date }}</div>
              <div v-if="item.next" class="rec-next">下次：{{ item.next }}</div>
              <div class="rec-opt">
                <button class="edit-btn" @click="editRecord(item)">编辑</button>
                <button class="del-btn" @click="delRecord(item.id)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 弹窗表单：现在传入完整petList，不再传name字符串数组 -->
      <VaccineRecordForm
        v-model:visible="formShow"
        :default-date="selectedDate"
        :pet-list="petList"
        :edit-data="editItem"
        @save="onSaveRecord"
      />
    </div>
  </div>
</template>

<script setup>
// 只新增这一行导入，剩下所有代码原样不动！！
import Header from '../components/Header.vue'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import VaccineCalendar from '../components/VaccineCalendar.vue'
import VaccineRecordForm from '../components/VaccineRecordForm.vue'

// =========下面你原本所有代码保持原样，一点不改========
const PET_KEY = 'petArchiveList'
const VACCINE_KEY = 'vaccineRecordList'
const petList = ref([])
const selectPetId = ref('') // 现在绑定petId，空字符串代表全部宠物
// 月份
const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth() + 1)
// 免疫记录
const vaccineList = ref([])
const formShow = ref(false)
const selectedDate = ref('')
const editItem = ref(null)
// 加载宠物档案，兼容旧无id宠物自动补id
function loadPetArchive() {
  const raw = localStorage.getItem(PET_KEY)
  let arr = raw ? JSON.parse(raw) : []
  // 兼容旧数据自动补id
  arr = arr.map(pet => {
    if (!pet.id) pet.id = Date.now().toString()
    return pet
  })
  petList.value = arr
}
function loadVaccineRecord() {
  vaccineList.value = JSON.parse(localStorage.getItem(VACCINE_KEY) || '[]')
}
function loadData() {
  loadPetArchive()
  loadVaccineRecord()
}
// 根据petId过滤记录
const filterRecords = computed(() => {
  if (!selectPetId.value) return vaccineList.value
  return vaccineList.value.filter(r => r.petId === selectPetId.value)
})
// 月份切换
function prevMonth() {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}
function nextMonth() {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}
function goToday() {
  const d = new Date()
  currentYear.value = d.getFullYear()
  currentMonth.value = d.getMonth() + 1
}
// 打开新增弹窗
function openForm(dateStr) {
  editItem.value = null
  selectedDate.value = dateStr
  formShow.value = true
}
// 编辑
function editRecord(row) {
  editItem.value = row
  formShow.value = true
}
// 删除
function delRecord(id) {
  if (!confirm('确定删除这条记录？')) return
  vaccineList.value = vaccineList.value.filter(x => x.id !== id)
  localStorage.setItem(VACCINE_KEY, JSON.stringify(vaccineList.value))
}
// 保存记录：接收来自弹窗 {petId,petName,...}
function onSaveRecord(data) {
  if (data.id) {
    // 修改
    const idx = vaccineList.value.findIndex(x => x.id === data.id)
    vaccineList.value[idx] = data
  } else {
    // 新增
    data.id = Date.now().toString()
    vaccineList.value.push(data)
  }
  localStorage.setItem(VACCINE_KEY, JSON.stringify(vaccineList.value))
}
// storage跨标签页更新
function handleStorage() {
  loadData()
}
onMounted(() => {
  loadData()
  window.addEventListener('storage', handleStorage)
})
onUnmounted(() => {
  window.removeEventListener('storage', handleStorage)
})
</script>


<style scoped>
.calendar-page {
  min-height: 100vh;
  background-image: url('home_bg.jpg');
  background-size:cover;
  background-attachment: fixed;
  background-color:rgba(253, 250, 245, 0.8);
  background-blend-mode: overlay;
  padding‑top: 120px;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 60px;
}

/* =========【和全站统一标题样式】========= */
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
  font-size: 30px;
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

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 18px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.pet-select-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pet-select-wrap select {
  padding: 6px 10px;
  border: 1px solid #ffd299;
  border-radius: 8px;
  background: #fffaf2;
}
.month-control {
  display: flex;
  gap: 12px;
  align-items: center;
}
.month-control button {
  border: 1px solid #ffd299;
  background: #fffaf2;
  border-radius: 8px;
  padding: 4px 10px;
  cursor: pointer;
}
.today-btn {
  background: #ff9a52 !important;
  color: white;
  border-color: #ff9a52 !important;
}
.content-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;
}
.record-panel {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.record-item {
  border-bottom: 1px solid #f3f3f3;
  padding: 12px 0;
}
.rec-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rec-pet {
  font-weight: 600;
}
.tag {
  background: #ffe9cc;
  color: #d47828;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 12px;
}
.rec-date,
.rec-next {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}
.rec-opt {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}
.edit-btn,
.del-btn {
  border: none;
  padding: 3px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}
.edit-btn {
  background: #e8f4ff;
  color: #2479c9;
}
.del-btn {
  background: #ffeeee;
  color: #c83c3c;
}
.empty-tip {
  color: #999;
  padding: 20px 0;
  text-align: center;
}
</style>
