<template>
  <div class="szj-minxin">
    <h3 class="minxin_title">vue之混入(minxin)</h3>
  </div>
</template>
<script>
import MinChild from './child/min-child1.vue'
import minxin from '@/common/minxin'
export default {
  mixins: [MinChild, minxin],
  data () {
    return {
      parent: {
        name: 'parent', age: 18
      },
      child: {
        sex: 'male',
        age: 0
      }
    }
  },
  created () {
    console.log("组件钩子被调用.")
    var title = this.$options.data().title
    if (title) {
      console.log(title)
    }
    console.log('message = ' + this.message)
  },
  mounted () {
    this.fn()
  },
  methods: {
    fn () {
      console.log(this.child.age);
    }
  }
}
</script>
<style lang="less" scoped>
.szj-minxin{
  padding:0.1rem 0.3rem;
  .minxin_title{
    font-size: 0.3rem;
  }
}
</style>
