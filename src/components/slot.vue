<template>
  <div class="component-slot">
    <slot name="header" :childHeader="child">
      <p>具名 header 插槽 默认内容 {{child.name}}</p>
    </slot>
    <slot > 父组件中没有使用 slot 的内容都将出现在这里, 否则都将摒弃 </slot>
    <slot name="content" :fromChild="value">
      <p>具名 content 插槽 默认内容</p>
    </slot>
    <p>slot 之外的 content</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      child: {
        name: 'Jelly',
        age: 18
      },
      value: '子传父'
    }
  },
}
</script>
<style lang="less" scoped>
.component-slot {
  background: #eee;
  h5{
    font-size: 0.24rem;
  }
  p{
    font-size: 0.22rem;
  }
}
</style>
