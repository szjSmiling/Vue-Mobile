<template>
  <div class="vue-slot">
    <h4>Slot</h4>
    <test-slot>
      <template slot="header" slot-scope="{childHeader}">
        <p>父组件传入的 header {{childHeader.name}}, {{childHeader.age}}</p>
      </template>
      <template slot="default" >
        <p>父组件默认的 content </p>
      </template>
      <template slot="content" slot-scope="{fromChild}">
        <p>父组件传入的 content: {{fromChild}}</p>
      </template>
    </test-slot>
    <div class="scroll-box">
      <div class="scroll-test">
        <div class="scroll-left" @click="scrollToRight"></div>
        <div class="scroll-right" @click="scrollToLeft"></div>
      </div>
    </div>
  </div>
</template>
<script>
import testSlot from "Components/slot.vue"
export default {
  components: {
    testSlot,
  },
  methods: {
    scrollToRight () {
      this.$nextTick(() => {
        let cover = document.getElementsByClassName('scroll-box')[0]
        let box = document.getElementsByClassName('scroll-test')[0]
        cover.scrollLeft = box.clientWidth;
      })
    },
    scrollToLeft () {
      this.$nextTick(() => {
        let cover = document.getElementsByClassName('scroll-box')[0]
        let box = document.getElementsByClassName('scroll-test')[0]
        cover.scrollLeft = 0;
      })
    },
  },
}
</script>
<style lang="less" scoped>
.vue-slot{
  background: #eee;
  font-size: 0.22rem;
  h4{
    font-size: 0.28rem;
  }
}

.scroll-box{
  padding: 0.1rem 0.2rem;
  width: 100%;
  height: 200px;
  background: #ddd;
  overflow: scroll;
}
.scroll-test{
  width: 160%;
  height: 100%;
  background: #ddd;
}
.scroll-left{
  width: 45%;
  height: 100%;
  background: #aaa;
  float: left;
}
.scroll-right{
  width: 45%;
  height: 100%;
  background: #aaa;
  float: right;
  margin-right: 0.2rem;
}
</style>
