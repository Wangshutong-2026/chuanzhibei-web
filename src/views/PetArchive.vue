<template>
  <div class="page-wrap">
    <Header />
    <div class="container">
      <h2 class="page-title">我的宠物档案</h2>
      <p class="page-desc">记录小动物基础信息、生日、种类、体重，一站式管理它的资料</p>
      <div class="card-wrap">
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

        <div class="pet-card add-card" @click="openAdd">
          <div class="plus">+</div>
          <div>添加新宠物</div>
        </div>
      </div>
    </div>

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
import { ref } from 'vue'
// 导入你现成的导航组件
import Header from '../components/Header.vue'



const maskVisible = ref(false)
const formTitle = ref('添加宠物信息')
const editIndex = ref(null)
const currentAvatarIndex = ref(null)
const avatarInputRef = ref(null)

const formData = ref({
  name: '',
  breed: '',
  birth: '',
  gender: '公',
  weight: ''
})

const petList = ref(JSON.parse(localStorage.getItem('petData')) || [])

function saveData() {
  localStorage.setItem('petData', JSON.stringify(petList.value))
}

function closeMask() {
  maskVisible.value = false
}

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

function openEdit(index) {
  editIndex.value = index
  const item = petList.value[index]
  formData.value = { ...item }
  formTitle.value = '修改宠物信息'
  maskVisible.value = true
}

function delPet(index) {
  petList.value.splice(index, 1)
  saveData()
}

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

function submitForm() {
  const { name, breed, birth, weight } = formData.value
  if (!name.trim() || !breed.trim() || !birth || !weight) {
    alert('请填全所有信息！')
    return
  }

  if (editIndex.value === null) {
    petList.value.push({
      ...formData.value,
      avatar: null
    })
  } else {
    petList.value[editIndex.value] = { ...formData.value, avatar: petList.value[editIndex.value].avatar }
  }
  saveData()
  closeMask()
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ======修复背景图重点！！用:global() 控制body，scoped下必须这么写====== */


.page-wrap {
  background-color: rgba(255, 249, 238, 0.65);
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 80px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
}
.logo-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg,#ff7b63,#ffb86c);
  border-radius: 8px;
}
nav {
  display: flex;
  gap: 42px;
  align-items: center;
}
nav a {
  text-decoration: none;
  color: #444;
  font-size: 17px;
  padding: 6px 10px;
  border-radius: 12px;
}
nav a.active {
  background: #ffe9cc;
  color: #d47828;
}
.header-right {
  display: flex;
  gap: 16px;
  align-items: center;
}
.login-link {
  color: #444;
  text-decoration: none;
  font-size: 16px;
}
.btn-dark {
  background: #1a2b48;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  font-size: 16px;
  cursor: pointer;
}
.container {
  padding: 40px 80px;
}
.page-title {
  font-size: 32px;
  margin-bottom: 12px;
}
.page-desc {
  color: #666;
  font-size: 16px;
  margin-bottom: 32px;
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
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  position: relative;
  text-align: center;
}
.pet-avatar-wrap{
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
.pet-avatar-wrap img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.avatar-tip{
  font-size:13px;
  color:#999;
  text-align:center;
}
.pet-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}
.pet-info {
  color: #666;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom:16px;
}
.card-btn-group{
  display:flex;
  gap:10px;
  justify-content:center;
}
.card-btn{
  padding:6px 12px;
  border-radius:8px;
  border:none;
  cursor:pointer;
  font-size:14px;
}
.edit-btn{
  background:#ffe9cc;
  color:#d47828;
}
.del-btn{
  background:#ffeeee;
  color:#c83c3c;
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
  background: #ffffff44;
}
.add-card .plus{
  font-size:32px;
  margin-bottom:8px;
}
.mask {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:999;
}
.form-box {
  background:#fff;
  border-radius:20px;
  padding:32px;
  width:420px;
}
.form-box h3{
  text-align:center;
  margin-bottom:24px;
  font-size:22px;
}
.form-item{
  margin-bottom:18px;
}
.form-item label{
  display:block;
  margin-bottom:6px;
  font-weight:500;
}
.form-item input, .form-item select{
  width:100%;
  padding:10px 12px;
  border:1px solid #ddd;
  border-radius:10px;
  font-size:16px;
}
.form-btn-group{
  display:flex;
  gap:16px;
  margin-top:24px;
}
.btn-cancel{
  flex:1;
  padding:12px;
  border:1px solid #ccc;
  background:#fff;
  border-radius:12px;
  font-size:16px;
  cursor:pointer;
}
.btn-submit{
  flex:1;
  padding:12px;
  border:none;
  background:#1a2b48;
  color:#fff;
  border-radius:12px;
  font-size:16px;
  cursor:pointer;
}
#avatarInput{
  display:none;
}
</style>
