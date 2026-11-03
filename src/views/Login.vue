<template>
  <div class="login-page">
    <!-- 左侧背景区域：你后面可以在这里插背景图 -->
    <div class="login-left">
      <div class="left-content">
        <h1 class="main-title">伴宠有方</h1>
        <p class="sub-title">科学养宠，从这里开始</p>
      </div>
    </div>

    <!-- 右侧登录注册卡片 -->
    <div class="login-right">
      <div class="login-card">
        <div class="card-header">
          <h2>欢迎回来</h2>
          <p>登录你的账号，继续探索养宠知识</p>
        </div>

        <el-tabs v-model="activeTab" class="login-tabs">
          <el-tab-pane label="登录" name="login">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="User" size="large" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password size="large" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit-btn" size="large" @click="handleLogin">登 录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="注册" name="register">
            <el-form ref="regFormRef" :model="regForm" :rules="regRules" label-width="0">
              <el-form-item prop="username">
                <el-input v-model="regForm.username" placeholder="设置账号" prefix-icon="User" size="large" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="regForm.password" type="password" placeholder="设置密码" prefix-icon="Lock" show-password size="large" />
              </el-form-item>
              <el-form-item prop="confirmPwd">
                <el-input v-model="regForm.confirmPwd" type="password" placeholder="确认密码" prefix-icon="Lock" show-password size="large" />
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model="regForm.phone" placeholder="手机号（选填）" prefix-icon="Phone" size="large" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit-btn" size="large" @click="handleRegister">注 册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <div class="other-tip">
          <span @click="$router.push('/')">← 返回首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('login')

const loginFormRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})
const loginRules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const regFormRef = ref(null)
const regForm = ref({
  username: '',
  password: '',
  confirmPwd: '',
  phone: ''
})
const regRules = ref({
  username: [{ required: true, message: '请设置账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  confirmPwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== regForm.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const handleLogin = async () => {
  await loginFormRef.value.validate()
  ElMessage.success('登录成功！')
  localStorage.setItem('petToken', 'test-token-123')
  router.push('/home')
}

const handleRegister = async () => {
  await regFormRef.value.validate()
  ElMessage.success('注册成功，请登录')
  activeTab.value = 'login'
  loginForm.value.username = regForm.value.username
}
</script>

<style scoped>
.login-page {
  background-image: url('/login_bg.jpg');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 左侧区域：你后面插背景图就改这里 */
.login-left {
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 60px 50px;
  box-sizing: border-box;
}

/* 左侧文字只占上部分约 1/3 */
.left-content {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.main-title {
  font-size: 56px;
  font-weight: 800;
  color: #5c3a21;
  letter-spacing: 4px;
  margin: 0 0 12px 0;
  font-family: "Georgia", "Times New Roman", serif;
}

.sub-title {
  font-size: 22px;
  color: #8c6b4f;
  margin: 0 0 30px 0;
  font-weight: 500;
  letter-spacing: 2px;
}


.tag {
  padding: 8px 18px;
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px dashed #d4a373;
  border-radius: 999px;
  color: #5c3a21;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
}

/* 右侧登录卡片 */
.login-right {
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center;  注释掉这一行 */
  align-items: flex-start; /* 改成靠上 */
  padding: 20px 30px 0 30px;
}

.login-card {
  width: 440px;
  background: #fffdf9;
  border-radius: 24px;
  padding: 40px 36px;
  border: 2px dashed #d4a373;
  box-shadow: 0 10px 30px rgba(92, 58, 33, 0.08);
}

.card-header {
  text-align: center;
  margin-bottom: 28px;
}

.card-header h2 {
  font-size: 28px;
  color: #5c3a21;
  margin: 0 0 8px 0;
  font-family: "Georgia", "Times New Roman", serif;
  letter-spacing: 2px;
}

.card-header p {
  font-size: 14px;
  color: #8c6b4f;
  margin: 0;
}

/* Tab 样式美化 */
.login-tabs {
  margin-bottom: 24px;
}

.login-tabs :deep(.el-tabs__nav-wrap::after) {
  background-color: #e6d0b3;
}

.login-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  color: #8c6b4f;
  padding: 0 20px;
}

.login-tabs :deep(.el-tabs__item.is-active) {
  color: #5c3a21;
  font-weight: 700;
}

.login-tabs :deep(.el-tabs__active-bar) {
  background-color: #d4a373;
}

/* 输入框 */
.login-tabs :deep(.el-input__wrapper) {
  border-radius: 12px;
  padding: 4px 10px;
  box-shadow: 0 0 0 1px #e6d0b3 inset;
  transition: all 0.3s;
}

.login-tabs :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #d4a373 inset;
}

.login-tabs :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #5c3a21 inset;
}

.login-tabs :deep(.el-input__inner) {
  font-size: 15px;
  color: #3d2817;
}

/* 按钮 */
.submit-btn {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 4px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8c5e38 0%, #d4a373 100%);
  border: none;
  color: #fff;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #7a4f2e 0%, #c08950 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(196, 141, 77, 0.35);
}

/* 返回首页 */
.other-tip {
  text-align: center;
  margin-top: 24px;
}

.other-tip span {
  color: #8c6b4f;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.other-tip span:hover {
  color: #5c3a21;
}
</style>
