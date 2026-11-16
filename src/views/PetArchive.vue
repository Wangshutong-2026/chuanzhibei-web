<template>
  <div class="page-wrap">
    <Header />
    <div class="main-container">
      <!-- ========== 胶带标题【和养护百科News结构完全一致】 ========== -->
      <div class="section-header-wrap">
        <div class="tape-title-img">
          <img src="/jiaotiao1.png" alt="胶布背景" />
          <h2>我的宠物档案</h2>
        </div>
        <p class="section-subtitle">记录小动物基础信息、生日、种类、体重，一站式管理它的资料</p>
      </div>

      <div class="card-wrap">
        <!-- 宠物卡片列表 -->
        <div class="pet-card" v-for="(item, index) in petList" :key="index">
          <div class="pet-avatar-wrap" @click="handleChangeAvatar(index)">
            <img v-if="item.avatar" :src="item.avatar" alt="头像" />
            <span v-else class="avatar-tip">点我上传<br />照片</span>
          </div>
          <div class="pet-name">{{ item.name }}</div>
          <div class="pet-info">
            种类：{{ item.breed }}<br />
            生日：{{ item.birth }}<br />
            性别：{{ item.gender }} | 体重：{{ item.weight }}kg
          </div>
          <div class="card-btn-group">
            <button class="card-btn edit-btn" @click="openEdit(index)">修改</button>
            <button class="card-btn del-btn" @click="delPet(index)">删除</button>
          </div>
        </div>
        <!-- 添加新宠物卡片 -->
        <div class="pet-card add-card" @click="openAdd">
          <div class="plus">+</div>
          <div>添加新宠物</div>
        </div>
      </div>
    </div>
    <!-- 弹窗蒙版 -->
    <div class="mask" v-show="maskVisible">
      <div class="form-box">
        <h3>{{ formTitle }}</h3>
        <div class="form-item">
          <label>宠物名字</label>
          <input v-model="formData.name" type="text" placeholder="例如：元宝、多多" />
        </div>
        <div class="form-item">
          <label>品种/种类</label>
          <input v-model="formData.breed" type="text" placeholder="例如：布偶猫、金毛、泰迪、英短、橘猫" />
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
          <input v-model="formData.weight" type="number" step="0.1" placeholder="例如：4.5" />
        </div>
        <div class="form-btn-group">
          <button class="btn-cancel" @click="closeMask">取消</button>
          <button class="btn-submit" @click="submitForm">保存</button>
        </div>
      </div>
    </div>
    <!-- 隐藏文件上传input -->
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
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'

// 弹窗状态
const maskVisible = ref(false)
const formTitle = ref('添加宠物信息')
const editIndex = ref(null)
const currentAvatarIndex = ref(null)
const avatarInputRef = ref(null)

// 表单数据
const formData = ref({
  name: '',
  breed: '',
  birth: '',
  gender: '公',
  weight: ''
})

// 宠物列表，读取localStorage
const petList = ref(JSON.parse(localStorage.getItem('petArchiveList')) || [])

// 保存到本地存储
function saveData() {
  localStorage.setItem('petArchiveList', JSON.stringify(petList.value))
}

// 关闭弹窗
function closeMask() {
  maskVisible.value = false
}

// 打开新增
function openAdd() {
  editIndex.value = null
  formTitle.value = '添加宠物信息'
  formData.value = {
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
  formTitle.value = '修改宠物信息'
  const item = petList.value[index]
  formData.value = {
    name: item.name,
    breed: item.breed,
    birth: item.birth,
    gender: item.gender,
    weight: item.weight
  }
  maskVisible.value = true
}

// 删除宠物
function delPet(index) {
  petList.value.splice(index, 1)
  saveData()
}

// 点击头像更换头像
function handleChangeAvatar(index) {
  currentAvatarIndex.value = index
  avatarInputRef.value.click()
}

// 文件选择回调，FileReader转base64
function onAvatarFileChange(e) {
  const file = e.target.files[0]
  if (!file || currentAvatarIndex.value === null) return
  const reader = new FileReader()
  reader.onload = function (ev) {
    petList.value[currentAvatarIndex.value].avatar = ev.target.result
    saveData()
    currentAvatarIndex.value = null
  }
  reader.readAsDataURL(file)
  // 清空input，防止选同一个图片不触发change
  e.target.value = ''
}

// 表单提交保存
function submitForm() {
  const { name, breed, birth, weight } = formData.value
  if (!name.trim() || !breed.trim() || !birth || !weight) {
    alert('请填全所有信息！')
    return
  }
  if (editIndex.value === null) {
    // 新增
    // 新增
    petList.value.push({
      id: Date.now().toString(),
      name: formData.value.name,
      breed: formData.value.breed,
      birth: formData.value.birth,
      gender: formData.value.gender,
      weight: formData.value.weight,
      avatar: null
    })



  } else {
    // 修改
    const idx = editIndex.value
    petList.value[idx].name = formData.value.name
    petList.value[idx].breed = formData.value.breed
    petList.value[idx].birth = formData.value.birth
    petList.value[idx].gender = formData.value.gender
    petList.value[idx].weight = formData.value.weight
  }
  saveData()
  closeMask()
}

onMounted(() => {
  // 页面加载自动读取localStorage，ref初始化已经处理
})
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
}

.page-wrap {
  background-color: rgba(253, 250, 245, 0.25);
  background-image: url('/dangan.png');
  background-size: cover;
  background-attachment: fixed;
  background-blend-mode: overlay;
  min-height: 100vh;
  padding-top: 80px;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
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

.card-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pet-card {
  background: #fff8ee;
  border: 1px solid #f3e2c4;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;
  text-align: center;
}


.pet-avatar-wrap {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #eee;
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
  color: #999;
  text-align: center;
}

.pet-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #5C3A21;
}

.pet-info {
  color: #666;
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
  background: #ffe9cc;
  color: #d47828;
}

.del-btn {
  background: #ffeeee;
  color: #c83c3c;
}

.add-card {
  border: 2px dashed #ffd299;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  color: #d47828;
  cursor: pointer;
  background: #fff3df;
}

.add-card .plus {
  font-size: 32px;
  margin-bottom: 8px;
}

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
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  width: 420px;
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
  color: #5C3A21;
}

.form-item input,
.form-item select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e6d5c3;
  border-radius: 10px;
  font-size: 16px;
  background: #fffdf8;
}

.form-btn-group {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}

.btn-submit {
  flex: 1;
  padding: 12px;
  border: none;
  background: #f5a623;
  color: #fff;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}

#avatarInput {
  display: none;
}

</style>

