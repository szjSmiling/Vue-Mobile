<template>
  <div class="hello">
    <div><img :src="img" alt=""></div>
    <h1>{{ msg }}</h1>
    <h2>测试mint-ui的使用</h2>
    <ul>
      <li><mt-button @click.native="handleClick">按钮</mt-button></li>
      <li @click="PDFLoad">PDF文件的预览</li>
    </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  name: 'HelloWorld',
  data () {
    return {
      img:require('../assets/logo.png'),
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    PDFLoad(){
      this.$router.push('/PDF');
    },
    handleClick: function() {
      Toast('Hello world!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
  font-size:0.8rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
