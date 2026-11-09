<template>
  <div class="pet-archive-page">
    <Header />
    <div class="main-container">
      <!--页面标题 -->
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <img class="tape-bg-img" src="/jiaotiao5.png" alt="胶带背景" />
            <h1>我的宠物档案</h1>
          </div>
          <p>记录毛孩子基础信息，喂食、免疫AI分析将读取本档案数据</p>
        </div>
        <button class="add-btn" @click="openAddModal">➕新增宠物档案</button>
      </div>

      <!--顶部统计卡片 -->
      <div class="stat-card">
        <div class="stat-item">
          <div class="num">{{ petList.length }}</div>
          <div class="label">宠物总数量</div>
        </div>
        <div class="stat-item">
          <div class="num">{{ catDogCount }}</div>
          <div class="label">猫狗宠物</div>
        </div>
        <div class="stat-item">
          <div class="num">{{ otherPetCount }}</div>
          <div class="label">异宠（仓鼠/守宫/鸟类）</div>
        </div>
      </div>

      <!--空状态 -->
      <div v-if="petList.length === 0" class="empty-tip">
        📭 暂无宠物档案，点击上方按钮创建第一条宠物档案
      </div>

      <!--宠物档案卡片列表 -->
      <div class="card-wrap" v-else>
        <div class="pet-card" v-for="pet in petList" :key="pet.id">
          <div class="card-head">
            <h3>{{ pet.name }}</h3>
            <div class="card-operate">
              <button class="edit-btn" @click="openEditModal(pet)">✏️编辑</button>
              <button class="del-btn" @click="handleDelete(pet.id)">🗑️删除</button>
            </div>
          </div>
          <div class="card-body">
            <div class="row-item">
              <span class="label">品种：</span>
              <span>{{ pet.breed }}</span>
            </div>
            <div class="row-item">
              <span class="label">生日：</span>
              <span>{{ pet.birth || "未填写" }}</span>
            </div>
            <div class="row-item">
              <span class="label">年龄：</span>
              <span>{{ getAgeByBirth(pet.birth) }} 岁</span>
            </div>
            <div class="row-item">
              <span class="label">体重(kg)：</span>
              <span>{{ pet.weight }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--弹窗：新增/编辑档案 -->
      <transition name="modal">
        <div v-if="modalShow" class="modal-mask" @click.self="closeModal">
          <div class="modal-box">
            <div class="modal-title">
              {{ isEdit ? "编辑宠物档案" : "新增宠物档案" }}
            </div>
            <div class="form-item">
              <label>宠物名字 <span class="red">*</span></label>
              <input v-model="form.name" placeholder="例如：年糕" />
            </div>
            <div class="form-item">
              <label>品种 <span class="red">*</span></label>
              <input v-model="form.breed" placeholder="例如：布偶猫 / 金毛 / 豹纹守宫" />
            </div>
            <div class="form-item">
              <label>生日</label>
              <input type="date" v-model="form.birth" />
            </div>
            <div class="form-item">
              <label>体重(kg) <span class="red">*</span></label>
              <input type="number" step="0.01" min="0.01" v-model.number="form.weight" placeholder="例如3.2" />
            </div>
            <div class="modal-btn-group">
              <button class="btn cancel" @click="closeModal">取消</button>
              <button class="btn primary" @click="submitForm">保存</button>
            </div>
          </div>
        </div>
      </transition>

      <!--toast提示 -->
      <transition name="slide-up">
        <div v-if="toastMessage" class="custom-toast">{{ toastMessage }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "../components/Header.vue";

const STORAGE_KEY = "petArchiveList";

const petList = ref([]);
const modalShow = ref(false);
const isEdit = ref(false);
const editId = ref(null);
const toastMessage = ref("");
let toastTimer = null;

const form = ref({
  name: "",
  breed: "",
  birth: "",
  weight: null,
});

const catDogCount = computed(() => {
  return petList.value.filter((p) => p.breed.includes("猫") || p.breed.includes("狗")).length;
});
const otherPetCount = computed(() => {
  return petList.value.length - catDogCount.value;
});

function getAgeByBirth(birthStr) {
  if (!birthStr) return "--";
  const birth = new Date(birthStr);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age <= 0 ? 0.2 : age;
}

function saveLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(petList.value));
}

function showToast(msg) {
  toastMessage.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastMessage.value = "";
  }, 2200);
}

function openAddModal() {
  isEdit.value = false;
  editId.value = null;
  form.value = {
    name: "",
    breed: "",
    birth: "",
    weight: null,
  };
  modalShow.value = true;
}

function openEditModal(pet) {
  isEdit.value = true;
  editId.value = pet.id;
  form.value = {
    name: pet.name,
    breed: pet.breed,
    birth: pet.birth,
    weight: pet.weight,
  };
  modalShow.value = true;
}

function closeModal() {
  modalShow.value = false;
}

function submitForm() {
  if (!form.value.name) return showToast("请填写宠物名字");
  if (!form.value.breed) return showToast("请填写品种");
  if (!form.value.weight || Number(form.value.weight) <= 0) return showToast("请填写有效体重");

  if (isEdit.value) {
    const idx = petList.value.findIndex((i) => i.id === editId.value);
    if (idx !== -1) {
      petList.value[idx] = { ...petList.value[idx], ...form.value };
    }
    showToast("档案修改成功✅");
  } else {
    const newPet = {
      id: Date.now(),
      ...form.value,
    };
    petList.value.push(newPet);
    showToast("档案创建成功✅");
  }
  saveLocal();
  closeModal();
}

function handleDelete(id) {
  petList.value = petList.value.filter((item) => item.id !== id);
  saveLocal();
  showToast("已删除该档案");
}

onMounted(() => {
  const str = localStorage.getItem(STORAGE_KEY);
  if (str) {
    petList.value = JSON.parse(str);
  }
});
</script>


<style scoped>
.pet-archive-page {
  min-height: 100vh;
  background-image: url("/home_bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-color: rgba(253, 250, 245, 0.82);
  background-blend-mode: overlay;
  font-family: -apple-system, sans-serif;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
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
.header-left p {
  font-size: 15px;
  color: #8892A0;
  margin: 0;
  padding-left: 8px;
}
.add-btn {
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}
.add-btn:hover {
  transform: translateY(-2px);
}

/*统计卡片 */
.stat-card {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
}
.stat-item {
  flex-shrink: 0;
  min-width: 160px;
  background: #FFFDF9;
  border: 2px dashed #D4A373;
  border-radius: 16px;
  padding: 18px 24px;
  text-align: center;
}
.stat-item .num {
  font-size: 32px;
  font-weight: bold;
  color: #5C3A21;
  margin-bottom: 6px;
}
.stat-item .label {
  font-size: 14px;
  color: #8c6b4f;
}

.empty-tip {
  text-align: center;
  padding: 80px 0;
  font-size: 16px;
  color: #8c6b4f;
}
.card-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, min-max(340px, 1fr));
  gap: 22px;
}
.pet-card {
  background: #FFFDF9;
  border: 2px dashed #D4A373;
  border-radius: 20px;
  padding: 24px;
  transition: 0.25s;
}
.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  border-bottom: 1px dashed #E6D0B3;
  padding-bottom: 12px;
}
.card-head h3 {
  margin: 0;
  font-size: 22px;
  color: #5C3A21;
}
.card-operate {
  display: flex;
  gap: 8px;
}
.edit-btn {
  border: none;
  background: #e8f3ff;
  color: #0052D9;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
}
.del-btn {
  border: none;
  background: #ffe9e9;
  color: #d14343;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
}
.row-item {
  display: flex;
  margin-bottom: 10px;
  font-size: 15px;
}
.row-item .label {
  color: #5C3A21;
  font-weight: bold;
  width: 90px;
  flex-shrink: 0;
}

/*弹窗 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-box {
  width: 460px;
  background: #FFFDF9;
  border-radius: 20px;
  border: 2px dashed #D4A373;
  padding: 28px;
}
.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #5C3A21;
  text-align: center;
  margin-bottom: 22px;
}
.form-item {
  margin-bottom: 18px;
}
.form-item label {
  display: block;
  margin-bottom: 7px;
  font-size: 14px;
  color: #44382e;
}
.red {
  color: #d14343;
}
.form-item input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e6d0b3;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fffdf9;
}
.form-item input:focus {
  outline: none;
  border-color: #5C3A21;
}
.modal-btn-group {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.btn {
  flex: 1;
  height: 42px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.btn.cancel {
  background: #f3e9dd;
  color: #5C3A21;
}
.btn.primary {
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color: white;
}

/*toast */
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(29, 33, 41, 0.9);
  color: #fff;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 15px;
  z-index: 9999;
  backdrop-filter: blur(4px);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
