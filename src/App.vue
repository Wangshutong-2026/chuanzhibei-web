<template>
  <!-- 1. 全局引入你的导航栏 -->
  <Header />
  
  <!-- 2. 路由出口 -->
  <router-view></router-view>
</template>

<script setup>
// 3. 引入 Header 组件（注意检查路径对不对）
import Header from './components/Header.vue'
</script>

<style>
/* 你的全局样式重置 */
* {
  box-sizing: border-box;
}

body {
  /* ⚠️ 注意：这里你写的是中文路径 "/宠物档案.png"，一定要确保 public 文件夹里有这张图，且名字一模一样 */
  background-image: url("/宠物档案.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  color: #1a2b48;
  margin: 0;
  padding: 0;
}
</style>