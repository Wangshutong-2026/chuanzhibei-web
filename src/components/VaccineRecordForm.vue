<!-- VaccineRecordForm.vue -->
<template>
  <div class="mask" v-if="visible">
    <div class="form-box">
      <h3>{{ isEdit ? '修改免疫记录' : '添加免疫记录' }}</h3>

      <div class="form-item">
        <label>宠物名称</label>
        <input v-model="form.pet" list="petNameList" placeholder="例如：多多、元宝" />
        <datalist id="petNameList">
          <option v-for="p in petNames" :key="p" :value="p" />
        </datalist>
      </div>

      <div class="form-item">
        <label>记录类型</label>
        <select v-model="form.type">
          <option value="疫苗">疫苗</option>
          <option value="驱虫">驱虫</option>
          <option value="体检">体检</option>
        </select>
      </div>

      <div class="form-item">
        <label>疫苗 / 项目名称</label>
        <input v-model="form.name" placeholder="例如：猫三联第一针、狂犬疫苗" />
      </div>

      <div class="form-item">
        <label>接种日期</label>
        <input type="date" v-model="form.date" />
      </div>

      <div class="form-item">
        <label>下次接种日期</label>
        <input type="date" v-model="form.next" />
      </div>

      <div class="form-item">
        <label>接种地点</label>
        <input v-model="form.place" placeholder="例如：XX宠物医院" />
      </div>

      <div class="form-item">
        <label>备注</label>
        <input v-model="form.note" placeholder="例如：第几针、医生姓名" />
      </div>

      <div class="form-btn-group">
        <button class="btn-cancel" @click="close">取消</button>
        <button class="btn-submit" @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  defaultDate: { type: String, default: '' },
  petNames: { type: Array, default: () => [] },
  editData: { type: Object, default: null }
})

const emit = defineEmits(['update:visible', 'save'])

const isEdit = computed(() => !!props.editData)

const form = reactive({
  pet: '',
  type: '疫苗',
  name: '',
  date: '',
  next: '',
  place: '',
  note: '',
  id: ''
})

const pad = n => (n < 10 ? '0' + n : '' + n)
function todayStr() {
  const d = new Date()
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

function reset() {
  if (props.editData) {
    form.pet = props.editData.pet
    form.type = props.editData.type
    form.name = props.editData.name
    form.date = props.editData.date
    form.next = props.editData.next || ''
    form.place = props.editData.place || ''
    form.note = props.editData.note || ''
    form.id = props.editData.id
  } else {
    form.pet = props.petNames[0] || ''
    form.type = '疫苗'
    form.name = ''
    form.date = props.defaultDate || todayStr()
    form.next = ''
    form.place = ''
    form.note = ''
    form.id = ''
  }
}

watch(() => props.visible, v => {
  if (v) reset()
})

watch(() => props.editData, () => {
  if (props.visible) reset()
})

function close() {
  emit('update:visible', false)
}

function submit() {
  if (!form.pet.trim()) return alert('请填写宠物名称')
  if (!form.name.trim()) return alert('请填写疫苗 / 项目名称')
  if (!form.date) return alert('请选择接种日期')
  if (form.next && form.next < form.date) return alert('下次接种日期不能早于接种日期')

  emit('save', {
    pet: form.pet.trim(),
    type: form.type,
    name: form.name.trim(),
    date: form.date,
    next: form.next,
    place: form.place.trim(),
    note: form.note.trim(),
    id: form.id
  })
  emit('update:visible', false)
}
</script>

<style scoped>
.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.form-box {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  width: 440px;
  max-width: 92vw;
  max-height: 86vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.form-box h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 21px;
  color: #1a2b48;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-item input,
.form-item select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ffd299;
  border-radius: 10px;
  background: #fffaf2;
  font-size: 15px;
  color: #1a2b48;
  outline: none;
  box-sizing: border-box;
}

.form-item input:focus,
.form-item select:focus {
  border-color: #ff9a52;
}

.form-btn-group {
  display: flex;
  gap: 14px;
  margin-top: 24px;
}

.btn-cancel {
  flex: 1;
  padding: 11px;
  border: 1px solid #ccc;
  background: #fff;
  color: #555;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
}

.btn-submit {
  flex: 1;
  padding: 11px;
  border: none;
  background: #1a2b48;
  color: #fff;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-submit:hover {
  background: #253758;
}
</style>
