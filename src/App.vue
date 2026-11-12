<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  color: #1a2b48;
  margin: 0;
  padding: 0;
}
</style>
