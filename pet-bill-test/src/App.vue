<template>
  <TopNav />
  <PetBill />
</template>

<script setup>
import TopNav from './components/TopNav.vue'
import PetBill from './components/PetBill.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  min-height: 100vh;
}

#app {
  width: 100%;
  min-height:100vh;
}
</style>