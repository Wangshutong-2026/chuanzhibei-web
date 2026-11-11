// 免疫记录数据仓库：localStorage读写、新增、修改、删除
import { ref, watch } from 'vue'

const STORAGE_KEY = 'immuneData'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch (e) {
    return []
  }
}

export function useVaccines() {
  const records = ref(load())

  watch(
    records,
    val => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true }
  )

  function addRecord(data) {
    records.value.push({
      ...data,
      id: 'r' + Date.now() + Math.floor(Math.random() * 1000)
    })
  }

  function removeById(id) {
    records.value = records.value.filter(r => r.id !== id)
  }

  function editRecord(id, newData) {
    const idx = records.value.findIndex(item => item.id === id)
    if (idx !== -1) {
      records.value[idx] = { ...records.value[idx], ...newData }
    }
  }

  return { records, addRecord, removeById, editRecord }
}
