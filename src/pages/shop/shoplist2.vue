<template>
  <div id="shoplist2">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Shopping</span>
      <i slot="right" class="iconfont icon-cart" ></i>
    </head-top>
    <div style="overflow:scroll;">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" 
        :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange"
        :auto-fill="false" ref="loadmore" >
        <ul class="load-content">
          <li v-for="(item,index) in totalData" :key="index">{{item}}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <mt-spinner class="spinner" v-show="topStatus === 'loading'" type="fading-circle"></mt-spinner>
          <!-- <span v-show="topStatus === 'loading'">refresh...</span> -->
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="bottom-arrow" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
          <mt-spinner class="spinner" v-show="bottomStatus === 'loading'" type="fading-circle"></mt-spinner>
          <!-- <span v-show="topStatus === 'loading'">loading...</span> -->
        </div>
      </mt-loadmore>
      <div class="allLoad" v-show="allLoaded">数据已经全部加载了!</div>
    </div>
  </div>
</template>
<script>
import headTop from 'Components/head/header.vue';
export default {
  components: {
    headTop,
  },
  data(){
    return {
      timer:null,
      timer1:null,
      topStatus:"",// drop , loading , pull 三种状态
      bottomStatus:"",// drop , loading , pull 三种状态
      allLoaded:false, // 是否数据全部加载完成
      num:0,　　// num为0时表示刷新或第一次加载，每加载一次增加1，刷新时默认为0
      firstData:[], // 首次进入页面的数据
      loadData:[], // 每次加载出来的新数据
      totalData:[], // 总共的数据(首次进入页面的数据 + 每次加载出来的新数据)
    }
  },
  methods:{
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status){ 
      this.bottomStatus = status;
    },
    loadTop(){
      this.num = 0;
      this.upData(0,"top");
    },
    loadBottom(){
      this.num ++;
      let offset = this.num * 10; // 一次加载十条
      this.upData(offset,"bottom");
    },
    upData(data,who){    
      this.loadData = [];
      clearTimeout(this.timer);
      if(who == "top"){
        this.timer = setTimeout(()=>{
          this.totalData = this.firstData;
          this.allLoaded = false;
          this.$refs.loadmore.onTopLoaded();
        },1200);
      }else if(who == "bottom"){
        if(data >= 30){
          this.allLoaded = true;// 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded();
        }else{
          for(let i = data+1;i <= (data + 10);i ++){
            this.loadData.push(i);
          }
          this.timer = setTimeout(()=>{
            this.totalData = this.totalData.concat(this.loadData);
            this.$refs.loadmore.onBottomLoaded();
          },1200);
        }
      }
    },
  },
  mounted() {
    // 页面首次进入,初始化数据
    for(let i = 1;i <= 10;i ++){
      this.loadData.push(i);
    }
    this.firstData = this.loadData;
    this.totalData = this.totalData.concat(this.loadData);
  },
}
</script>
<style lang="less" scoped>
#shoplist2{
  font-size: 0.2rem;
  .mint-loadmore{
    padding-top: 0.5rem;
    .load-content li{
      height:0.5rem;
      line-height: 0.5rem;
      border-bottom:1px solid #eee;
    }
    .mint-loadmore-top .spinner{
      vertical-align: middle;
    }
    .mint-loadmore-bottom{
      .bottom-arrow{
        transform:rotate(180deg);
      }
    }
  }
  .allLoad{
    height:0.5rem;
    line-height: 0.5rem;
    color:red;
  }
}
</style>
