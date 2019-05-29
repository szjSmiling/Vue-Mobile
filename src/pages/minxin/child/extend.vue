<template>
  <div class="szj-extend_child">
    <h3 class="extend_child_title">我是extend</h3>
  </div>
</template>
<script>
export default {
  data () {
    return {
      extend: 'extend',
    }
  }
}
</script>
<style lang="less" scoped>
.szj-extend_child{
  padding:0.1rem 0.3rem;
  .extend_child_title{
    font-size: 0.3rem;
  }
}
</style>
