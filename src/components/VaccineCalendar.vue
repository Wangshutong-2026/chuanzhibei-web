<template>
  <div class="calendar-card">
    <div class="week-head">
      <span>日</span>
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
    </div>
    <div class="calendar-grid">
      <div
        v-for="cell in cells"
        :key="cell.key"
        class="day-cell"
        :class="{ empty: cell.empty, today: cell.isToday, remind: cell.remindList.length > 0 }"
        @click="handleClick(cell)"
      >
        <div class="day-num">{{ cell.day }}</div>
        <div class="day-tags">
          <span
            v-for="item in cell.list"
            :key="item.id"
            class="day-tag"
          >
            {{ item.type }}：{{ item.name }}
          </span>
          <!-- 新增提醒标签 -->
          <span
            v-for="item in cell.remindList"
            :key="'remind-' + item.id"
            class="day-tag remind-tag"
          >
            ⚠️待接种：{{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="calendar-tip">点击日期添加免疫记录</div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  year: Number,
  month: Number,
  records: Array
})
const emit = defineEmits(['pick-date'])
const cells = computed(() => {
  const arr = []
  const first = new Date(props.year, props.month - 1, 1)
  const last = new Date(props.year, props.month, 0)
  const weekStart = first.getDay()
  const totalDays = last.getDate()
  // 前面空白占位
  for (let i = 0; i < weekStart; i++) {
    arr.push({ key: `empty-${i}`, empty: true })
  }
  const now = new Date()
  const todayY = now.getFullYear()
  const todayM = now.getMonth() + 1
  const todayD = now.getDate()
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${props.year}-${String(props.month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const list = props.records.filter(r => r.date === dateStr)
    // 新增：筛选下次接种日等于当前日期的记录
    const remindList = props.records.filter(r => r.next === dateStr)
    const isToday = props.year === todayY && props.month === todayM && d === todayD
    arr.push({
      key: dateStr,
      day: d,
      dateStr,
      list,
      remindList, // 新增提醒数组
      isToday,
      empty: false
    })
  }
  return arr
})
function handleClick(cell) {
  if (cell.empty) return
  emit('pick-date', cell.dateStr)
}
</script>

<style scoped>
.week-head {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}
.week-head span {
  text-align: center;
  font-size: 14px;
  color: #a1764a;
  font-weight: 600;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
.day-cell {
  min-height: 78px;
  border-radius: 14px;
  background: #ffe9cc;
  padding: 8px;
  cursor: pointer;
  transition: 0.15s;
  border: 1px solid transparent;
}
.day-cell.empty {
  background: transparent;
  cursor: default;
}
.day-cell.today {
  border: 2px solid #ff9a52;
  background: #fff1e0;
}
.day-cell:hover:not(.empty) {
  border-color: #ffd299;
  background: #fff5e8;
}
.day-num {
  font-size: 14px;
  font-weight: 600;
}
.day-tags {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 6px;
}
.day-tag {
  font-size: 18px;
  background: #ffe9cc;
  color: #994c14;
  border-radius: 6px;
  padding: 1px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar-tip {
  font-size: 12px;
  color: #999;
  margin-top: 12px;
  text-align: center;
}
.day-cell.remind {
  background: #ffe2c4 !important;
  border: 1px solid #ff9a52;
}
.day-tag.remind-tag {
  background: #ffd299;
  color: #994c14;
}

</style>
