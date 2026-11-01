<template>
  <div class="bill-page">
    <div class="container">
      <div class="page-header">
        <h2 class="title-animate">💰 养宠日常账本</h2>
        <p class="subtitle subtitle-animate">
          记录每一笔养宠开销，让陪伴更安心、更清楚。
        </p >

        <div class="title-divider">
          <span class="dot"></span>
          <span class="line line-left"></span>
          <span class="heart">🐾</span>
          <span class="line line-right"></span>
          <span class="dot"></span>
        </div>
      </div>

      <div class="add-bill-card card-animate">
        <h3>新增消费记录</h3>

        <div class="form-row">
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
        <p class="current-pet-tip">当前养护宠物：{{ currentPetName }}</p >

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
            :key="index"
          >
            <span>{{ item.date }}</span>
            <span>{{ item.type }}</span>
            <span class="money">{{ item.money }} 元</span>
            <span>{{ item.remark }}</span>
            <span>
              <button class="del-btn" @click="delBill(index)">删除</button>
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
import { ref, computed } from 'vue'

const props = defineProps({
  currentPetName: {
    type: String,
    default: "橘猫"
  }
})

const form = ref({
  type: '粮品',
  money: '',
  date: '',
  remark: ''
})

const allBillList = ref([])

const petBillList = computed(() => {
  return allBillList.value.filter(
    item => item.petName === props.currentPetName
  )
})

const totalMoney = computed(() => {
  return petBillList.value.reduce((sum, item) => sum + Number(item.money), 0)
})

const monthMoney = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  return petBillList.value
    .filter(item => {
      const d = item.date.split('-')
      return d[0] == year && d[1] == month
    })
    .reduce((sum, item) => sum + Number(item.money), 0)
})

const yearMoney = computed(() => {
  const now = new Date()
  const year = now.getFullYear()

  return petBillList.value
    .filter(item => {
      const d = item.date.split('-')
      return d[0] == year
    })
    .reduce((sum, item) => sum + Number(item.money), 0)
})

const addBill = () => {
  if (!form.value.money || !form.value.date) {
    alert('请填写金额和日期')
    return
  }

  allBillList.value.push({
    petName: props.currentPetName,
    type: form.value.type,
    money: Number(form.value.money),
    date: form.value.date,
    remark: form.value.remark
  })

  form.value.money = ''
  form.value.remark = ''
}

const delBill = (index) => {
  const realIndex = allBillList.value.findIndex(
    item => item === petBillList.value[index]
  )
  allBillList.value.splice(realIndex, 1)
}
</script>

<style scoped>
.bill-page {
  width: 100%;
  min-height: calc(100vh - 72px);
  background: url("/bill-bg.jpg");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  padding: 40px 24px;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 34px;
  text-align: center;
}

.page-header h2 {
  font-size: 30px;
  color: #ff6b35;
  font-weight: 800;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 16px;
  color: #ff8c42;
  font-weight: 600;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
}

.title-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}

.title-divider .line {
  width: 90px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ffb347, transparent);
}

.title-divider .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffb347;
  box-shadow: 0 0 8px rgba(255, 179, 71, 0.8);
}

.title-divider .heart {
  font-size: 18px;
  animation: heartbeat 1.4s ease-in-out infinite;
}

.title-animate {
  animation: fadeDown 0.8s ease-out both;
}

.subtitle-animate {
  animation: fadeDown 1s ease-out 0.15s both;
}

.card-animate {
  animation: fadeUp 0.9s ease-out both;
}

.card-animate:nth-child(2) {
  animation-delay: 0.2s;
}

.card-animate:nth-child(3) {
  animation-delay: 0.35s;
}

.add-bill-card,
.bill-list-card {
  background: rgba(255, 255, 255, 0.88);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 179, 71, 0.25);
}

.add-bill-card h3,
.bill-list-card h3 {
  font-size: 18px;
  color: #333;
  margin: 0 0 16px 0;
}

.current-pet-tip {
  color: #888;
  font-size: 14px;
  margin-bottom: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.4fr;
  gap: 16px;
  align-items: end;
}

.form-item label {
  display: block;
  margin-bottom: 6px;
  color: #444;
  font-size: 14px;
}

.form-item input,
.form-item select {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 15px;
  background: #fff;
  box-sizing: border-box;
  transition: 0.25s ease;
}

.form-item input:focus,
.form-item select:focus {
  outline: none;
  border-color: #ffb347;
  box-shadow: 0 0 0 3px rgba(255, 179, 71, 0.15);
}

.add-btn {
  background: linear-gradient(135deg, #ffb347, #ff6b35);
  border: none;
  color: #fff;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 16px;
  transition: 0.25s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(255, 107, 53, 0.35);
}

.bill-table {
  margin-top: 16px;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 2fr 0.8fr;
  padding: 12px 8px;
  align-items: center;
}

.table-head {
  font-weight: bold;
  color: #444;
  border-bottom: 1px solid #eee;
  background: #fdf8ee;
  border-radius: 10px 10px 0 0;
}

.table-row {
  border-bottom: 1px solid #f3f3f3;
  transition: 0.25s ease;
}

.table-row:hover {
  background: #fffaf0;
  transform: scale(1.005);
}

.money {
  color: #d97706;
  font-weight: bold;
}

.del-btn {
  color: #ef4444;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
}

.del-btn:hover {
  color: #b91c1c;
}

.stat-area {
  margin-top: 20px;
  display: flex;
  gap: 30px;
  font-size: 16px;
  flex-wrap: wrap;
}

.stat-item {
  background: #fdf4e3;
  padding: 12px 18px;
  border-radius: 10px;
  color: #444;
  transition: 0.25s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(255, 179, 71, 0.25);
}

.stat-item b {
  color: #c47b28;
  margin-left: 6px;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.18);
  }
}
</style>