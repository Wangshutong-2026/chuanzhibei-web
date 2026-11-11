<template>
  <div class="list-card">
    <div class="list-head">
      <h3>免疫记录清单</h3>
    </div>
    <div class="record-list">
      <div v-if="records.length === 0" class="record-empty">暂无免疫记录</div>
      <div v-for="r in records" :key="r.id" class="record-item">
        <div class="record-top">
          <span class="record-name">{{ r.type }}｜{{ r.name }}</span>
          <span class="record-status" :class="statusClass(r)">
            {{ statusText(r) }}
          </span>
        </div>
        <div class="record-info">
          <div>接种日期：{{ r.date }}</div>
          <div v-if="r.next">下次提醒：{{ r.next }}</div>
          <div v-if="r.place">地点：{{ r.place }}</div>
          <div v-if="r.note">备注：{{ r.note }}</div>
        </div>
        <div class="record-bottom">
          <span class="record-pet">{{ r.pet }}</span>
          <div class="btn-group">
            <button class="edit-btn" @click="$emit('edit', r)">编辑</button>
            <button class="del-btn" @click="$emit('delete', r.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['edit', 'delete'])

function statusText(item) {
  if (!item.next) return '已完成'
  const nextDay = new Date(item.next)
  const now = new Date()
  const diff = nextDay - now
  if (diff < 0) return '已过期'
  if (diff < 7 * 24 * 3600 * 1000) return '即将到期'
  return '正常'
}

function statusClass(item) {
  if (!item.next) return 's-done'
  const nextDay = new Date(item.next)
  const now = new Date()
  const diff = nextDay - now
  if (diff < 0) return 's-expired'
  if (diff < 7 * 24 * 3600 * 1000) return 's-soon'
  return 's-ok'
}
</script>
