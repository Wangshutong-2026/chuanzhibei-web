<template>
  <div class="pet-bill-wrapper">
    <!-- 只在这里加导航，内部PetBill完全不动 -->
    <Header />
    <PetBill />
  </div>
</template>
<script>
import PetBill from '../components/PetBill.vue'
import Header from '../components/Header.vue'
export default {
  name: 'PetBillPage',
  components: {
    PetBill,
    Header
  }
}
</script>
<style scoped>
.pet-bill-wrapper {
  padding-top: 0px;
  min-height: calc(100vh);
}
</style>
