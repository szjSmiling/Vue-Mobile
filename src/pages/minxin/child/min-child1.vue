<template>
  <div class="szj-minxin_child">
    <h3 class="minxin_child_title">我是子混子</h3>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'hello',
      child: {
        name: 'child', age: 12
      }
    }
  },
  created () {
    console.log('混入对象的钩子被调用')
  },
  methods: {
    resetData () {
      // 重置所有的数据
      Object.assign(this.$data, this.$options.data());
      // 重置指定的数据
      Object.assign(this.$data.title, this.$options.data().title);
    }
  }
}
</script>
<style lang="less" scoped>
.szj-minxin_child{
  padding:0.1rem 0.3rem;
  .minxin_child_title{
    font-size: 0.3rem;
  }
}
</style>
