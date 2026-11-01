<template>
  <div class="pet-bill-wrapper">
    <!-- 组员的主体页面 -->
    <PetBill />
  </div>
</template>

<script>
// 引入你马上要复制到 components 里的组件
import PetBill from '../components/PetBill.vue'

export default {
  name: 'PetBillPage',
  components: {
    PetBill
  }
}
</script>

<style scoped>
/* 防止页面顶部被你的导航栏挡住 */
.pet-bill-wrapper {
  padding-top: 0px; 
  min-height: calc100vh; 
}
</style>