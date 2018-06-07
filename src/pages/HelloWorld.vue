<template>
  <div id="hello">
    <head-top id="header">
      <i slot="left" class="iconfont icon-items"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="iconfont icon-home" ></i>
    </head-top>
    <div>
      <img :src="img" alt="">
      <h1>{{ msg }}</h1>
      <h2>测试mint-ui的使用</h2>
    </div>
    <ul class="btnGroup">
      <li><mt-button @click.native="handleClick" type="primary">按钮</mt-button></li>
      <li @click="PDFLoad">
        <mt-button>
          <img 
          src="../assets/images/dog.gif" 
          type="primary" 
          size="large" 
          height="20" width="20" s
          lot="icon">
          PDF文件的预览
        </mt-button>
      </li>
      <li></li>
    </ul>
    <mt-swipe class="mint-swipe" :auto="4000">
     <mt-swipe-item v-if="bannerList?bannerList:false" v-for="(item,index) in bannerList" :key="index">
      <a href="item.landingPageUrl">
        <img :src="item" alt="szj-picture" title="szj try it">
      </a>
     </mt-swipe-item>
    </mt-swipe>
    <div class="content">
      <ol class="cont-ol">
        <li v-for="item in textList" :key="item.id">
          <p>{{item.id+1}}. {{item.title}}</p>
          <p>{{item.content}}</p>
          <mt-button class="close" @click="closeRow(item.id)" type="danger">
            <i class="iconfont icon-close"></i>
          </mt-button>
        </li>
      </ol>
    </div>
    <foot-end></foot-end>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import footEnd from "@/components/foot/footer.vue";
import { Indicator, Toast, Swipe, SwipeItem } from "mint-ui";
export default {
  name: "HelloWorld",
  components: {
    headTop,
    footEnd,
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  data() {
    return {
      img: require("../assets/logo.png"),
      msg: "Welcome to Your Vue.js App",
      bannerList:[
        require('Assets/images/banner/b_flight1.jpg'),require('Assets/images/banner/b_flight2.jpg'),
        require('Assets/images/banner/b_flight3.jpg'),require('Assets/images/banner/b_flight4.jpg'),
      ],
      textList: [
        { id: 0, title: "首先", content: "first" },
        { id: 1, title: "其次", content: "second" },
        { id: 2, title: "然后", content: "third" },
        { id: 3, title: "之后", content: "fourth" },
        { id: 4, title: "最后", content: "fifth" }
      ]
    };
  },
  methods: {
    PDFLoad() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(() => {
        Indicator.close();
        this.$router.push("/PDF");
      }, 1000);
    },
    handleClick: function() {
      Toast({
        message: "Hello world!",
        position: "top",
        duration: 1000
      });
    },
    closeRow(id) {
      this.list = this.list.filter(val => {
        return val.id != id;
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#hello {
  padding-top: 2rem;
  h2 {
    padding: 0.5rem 0;
  }
  ul,
  li {
    list-style-type: none;
  }
  .btnGroup {
    padding: 0 0 0.5rem;
    li {
      display: inline-block;
      margin: 0 10px;
    }
  }
  a {
    color: #42b983;
  }
  .mint-swipe {
    height:7rem;
    img{
      width: 100%;
      height:100%;
    }
  }
  .content {
    padding: 1rem 0.68rem;
    background: #eee;
    border-radius: 3px;
    .cont-ol {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0;
        font-size: 0.86rem;
        font-family: Arial, Helvetica, sans-serif;
        border-bottom: 1px solid #ddd;
        .close {
          height: auto;
          padding: 0 0.3rem;
        }
      }
    }
  }
}
</style>
