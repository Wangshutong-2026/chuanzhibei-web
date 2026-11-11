<template>
  <div class="calendar-page">
    <Header />
    <div class="main-container">
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <img class="tape-bg-img" src="/jiaotiao5.png" alt="胶带背景" />
            <span class="tape-text">免疫日历</span>
          </div>
          <p>记录什么时候打的疫苗、在哪打的，下次接种日期会自动提醒你</p>
        </div>
      </div>

      <!-- 筛选栏：宠物下拉 + 月份切换 -->
      <div class="filter-bar">
        <div class="pet-select-wrap">
          <span>当前宠物</span>
          <select v-model="selectPet">
            <option value="">全部宠物</option>
            <option v-for="pet in petList" :key="pet.id" :value="pet.name">
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
                <span class="rec-pet">{{ item.pet }}</span>
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

      <!-- 弹窗表单 -->
      <VaccineRecordForm
        v-model:visible="formShow"
        :default-date="selectedDate"
        :pet-names="petNameArr"
        :edit-data="editItem"
        @save="onSaveRecord"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import VaccineCalendar from '../components/VaccineCalendar.vue'
import VaccineRecordForm from '../components/VaccineRecordForm.vue'
import Header from '../components/Header.vue'

// ========== 宠物档案数据（和档案页共用localStorage）==========
const PET_KEY = 'petArchiveList'
const getPetArchive = () => JSON.parse(localStorage.getItem(PET_KEY) || '[]')

const petList = ref([])
const selectPet = ref('') // 选中的宠物名字，空=全部宠物

// 提取宠物名字数组，传给弹窗下拉datalist
const petNameArr = computed(() => petList.value.map(p => p.name))

// 月份
const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth() + 1)

// 免疫记录
const VACCINE_KEY = 'vaccineRecordList'
const vaccineList = ref([])

const formShow = ref(false)
const selectedDate = ref('')
const editItem = ref(null)

// 加载档案宠物 + 免疫记录
function loadData() {
  petList.value = getPetArchive()
  vaccineList.value = JSON.parse(localStorage.getItem(VACCINE_KEY) || '[]')
}

// 根据选中宠物过滤记录
const filterRecords = computed(() => {
  if (!selectPet.value) return vaccineList.value
  return vaccineList.value.filter(r => r.pet === selectPet.value)
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
// 保存
function onSaveRecord(data) {
  if (data.id) {
    // 修改
    const idx = vaccineList.value.findIndex(x => x.id === data.id)
    vaccineList.value[idx] = data
  } else {
    // 新增，生成id
    data.id = Date.now().toString()
    vaccineList.value.push(data)
  }
  localStorage.setItem(VACCINE_KEY, JSON.stringify(vaccineList.value))
}

onMounted(() => {
  loadData()
  // 监听storage，档案页新增/删除宠物时自动刷新下拉
  window.addEventListener('storage', loadData)
})
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}
.page-header {
  margin-bottom: 20px;
}
.tape-title-img {
  position: relative;
  display: inline-block;
}
.tape-bg-img {
  height: 42px;
  display: block;
}
.tape-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  line-height: 42px;
  text-align: center;
  font-size: 28px;
  font-family: "Arial Rounded MT Bold", "Comic Sans MS", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-weight: 800;
  color: #1a2b48;
  letter-spacing: 3px;
}


.page-header p {
  margin-top: 10px;
  color: #555;
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
