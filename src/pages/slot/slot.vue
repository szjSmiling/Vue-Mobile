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
  </div>
</template>
<script>
import testSlot from "Components/slot.vue"
export default {
  components: {
    testSlot,
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
</style>
