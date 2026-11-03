<template>
  <div class="page-wrap">
    <Header />
    <div class="container">
      <!-- 胶带标题，和全站页面统一 -->
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <img class="tape-bg-img" src="/jiaotiao5.png" alt="胶带背景" />
            <h1>我的宠物档案</h1>
          </div>
          <p class="page-desc">记录小动物基础信息、生日、种类、体重，喂食模块与AI饮食分析将读取本档案数据</p>
        </div>
      </div>

      <div class="card-wrap">
        <!-- key使用pet.id，不再使用index，修复数组移位错乱bug -->
        <div class="pet-card" v-for="(item, index) in petList" :key="item.id">
          <div class="pet-avatar-wrap" @click="handleChangeAvatar(index)">
            <img v-if="item.avatar" :src="item.avatar" alt="头像" />
            <span v-else class="avatar-tip">点我上传<br />照片</span>
          </div>
          <div class="pet-name">{{ item.name }}</div>
          <div class="pet-info">
            品种：{{ item.breed }}<br />
            生日：{{ item.birth }}<br />
            性别：{{ item.gender }} | 体重：{{ item.weight }}kg
          </div>
          <div class="card-btn-group">
            <button class="card-btn edit-btn" @click="openEdit(index)">修改</button>
            <button class="card-btn del-btn" @click="delPet(index)">删除</button>
          </div>
        </div>
        <div class="pet-card add-card" @click="openAdd">
          <div class="plus">+</div>
          <div>添加新宠物</div>
        </div>
      </div>

      <!-- 提示跳转喂食页面 -->
      <div class="tip-jump" v-if="petList.length > 0">
        ✨档案添加完成，前往
        <router-link to="/feed">每日喂食记录</router-link>
        使用AI饮食参考分析
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <div class="mask" v-show="maskVisible">
      <div class="form-box">
        <h3>{{ formTitle }}</h3>
        <div class="form-item">
          <label>宠物名字</label>
          <input v-model="formData.name" type="text" placeholder="例如：元宝、多多" />
        </div>
        <div class="form-item">
          <label>品种/种类</label>
          <input v-model="formData.breed" type="text" placeholder="例如：布偶猫、金毛、仓鼠、鹦鹉" />
        </div>
        <div class="form-item">
          <label>生日</label>
          <input v-model="formData.birth" type="date" />
        </div>
        <div class="form-item">
          <label>性别</label>
          <select v-model="formData.gender">
            <option value="公">公</option>
            <option value="母">母</option>
          </select>
        </div>
        <div class="form-item">
          <label>体重(kg)</label>
          <input v-model.number="formData.weight" type="number" step="0.1" min="0.01" placeholder="例如：4.5" />
        </div>
        <div class="form-btn-group">
          <button class="btn-cancel" @click="closeMask">取消</button>
          <button class="btn-submit" @click="submitForm">保存</button>
        </div>
      </div>
    </div>

    <input
      ref="avatarInputRef"
      id="avatarInput"
      type="file"
      accept="image/*"
      @change="onAvatarFileChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'

const maskVisible = ref(false)
const formTitle = ref('添加宠物信息')
const editIndex = ref(null)
const currentAvatarIndex = ref(null)
const avatarInputRef = ref(null)

const formData = ref({
  id: '',
  name: '',
  breed: '',
  birth: '',
  gender: '公',
  weight: ''
})

// ⭐统一存储key！！！和Feed.vue保持一致：petArchiveList
const STORAGE_KEY = 'petArchiveList'
const petList = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])



// 根据生日计算年龄（供给AI分析）
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

// 保存本地
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(petList.value))
}

function closeMask() {
  maskVisible.value = false
}

// 打开新增
function openAdd() {
  editIndex.value = null
  formTitle.value = '添加宠物信息'
  formData.value = {
    id: '',
    name: '',
    breed: '',
    birth: '',
    gender: '公',
    weight: ''
  }
  maskVisible.value = true
}

// 打开编辑
function openEdit(index) {
  editIndex.value = index
  const item = petList.value[index]
  formData.value = { ...item }
  formTitle.value = '修改宠物信息'
  maskVisible.value = true
}

// 删除
function delPet(index) {
  petList.value.splice(index, 1)
  saveData()
}

// 头像上传
function handleChangeAvatar(index) {
  currentAvatarIndex.value = index
  avatarInputRef.value.click()
}

function onAvatarFileChange(e) {
  const file = e.target.files[0]
  if (!file || currentAvatarIndex.value === null) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    petList.value[currentAvatarIndex.value].avatar = ev.target.result
    saveData()
    currentAvatarIndex.value = null
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

// 提交表单
function submitForm() {
  const { name, breed, birth, weight } = formData.value
  if (!name?.trim()) return alert('请填写宠物名字')
  if (!breed?.trim()) return alert('请填写品种')
  if (!birth) return alert('请选择生日')
  if (!weight || Number(weight) <= 0) return alert('请填写有效的体重')

  if (editIndex.value === null) {
    // 新增：生成唯一id
    petList.value.push({
      ...formData.value,
      id: Date.now().toString(),
      avatar: null
    })
  } else {
    // 编辑：保留原来的id、avatar，不被覆盖！修复编辑丢失头像bug
    const oldItem = petList.value[editIndex.value]
    petList.value[editIndex.value] = {
      ...formData.value,
      id: oldItem.id,
      avatar: oldItem.avatar
    }
  }
  saveData()
  closeMask()
}
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background-image: url('/home_bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-color: rgba(253, 250, 245, 0.82);
  background-blend-mode: overlay;
  font-family: system-ui, -apple-system, sans-serif;
}
.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 120px 20px 60px;
}

/* 页面头部胶带标题，全站统一 */
.page-header {
  margin-bottom: 36px;
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
.page-desc {
  font-size: 15px;
  color: #8892A0;
  margin: 0;
  padding-left: 8px;
}

.tip-jump {
  margin-top: 24px;
  font-size: 14px;
  color: #5C3A21;
}
.tip-jump a {
  color: #d4a373;
  font-weight: bold;
}

.card-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.pet-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;
  text-align: center;
  border: 2px dashed #E6D0B3;
}
.pet-avatar-wrap {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f7f3ee;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}
.pet-avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-tip {
  font-size: 13px;
  color: #8892A0;
  text-align: center;
}
.pet-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #5C3A21;
}
.pet-info {
  color: #5E6B82;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 16px;
}
.card-btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.card-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.edit-btn {
  background: #F3E9DD;
  color: #5C3A21;
}
.del-btn {
  background: #ffeeee;
  color: #c83c3c;
}
.add-card {
  border: 2px dashed #D4A373;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  color: #5C3A21;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.44);
  transition: 0.25s;
}
.add-card:hover {
  background: rgba(255, 255, 255, 0.7);
}
.add-card .plus {
  font-size: 32px;
  margin-bottom: 8px;
}

/* 弹窗遮罩 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.form-box {
  background: #fffdf9;
  border-radius: 20px;
  padding: 32px;
  width: 420px;
  border: 2px dashed #E6D0B3;
}
.form-box h3 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 22px;
  color: #5C3A21;
}
.form-item {
  margin-bottom: 18px;
}
.form-item label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #44382e;
}
.form-item input,
.form-item select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e6d0b3;
  border-radius: 10px;
  font-size: 16px;
  background: #fffdf9;
}
.form-item input:focus,
.form-item select:focus {
  outline: none;
  border-color: #5C3A21;
}
.form-btn-group {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
.btn-cancel {
  flex: 1;
  padding: 12px;
  border: 1px solid #E6D0B3;
  background: #f3e9dd;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  color: #5C3A21;
}
.btn-submit {
  flex: 1;
  padding: 12px;
  border: none;
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color: #fff;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}
#avatarInput {
  display: none;
}
</style>
