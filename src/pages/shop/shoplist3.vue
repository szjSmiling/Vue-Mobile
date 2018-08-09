<template>
  <div id="infinite-scroll">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Shopping</span>
      <i slot="right" class="iconfont icon-cart" ></i>
    </head-top>
    <div class='loadmore' >
      <ul class="contentlist"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50">
        <li v-for="(item,index) in list" :key="index" >{{item}}</li>
      </ul>
      <mt-spinner class="infinite-scroll-icon" type="fading-circle" v-show='!loadIcon' ></mt-spinner>
      <span class="infinite-scroll-text" v-show="!loadIcon" >加载中</span>
      <p v-if='loadIcon' class='loading'>没有更多数据 !</p>
    </div>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
export default {
  components: {
    headTop,
  },
  data() {
    return {
      loadIcon:false,
      loading: false, //为true时不会触发加载更多，false可以触发
      list: [1,2,3,4,5,6,7,8,9,10]
    };
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
        if(this.list.length >= 40){
          this.loadIcon = true;
          this.loading = true;
        }
      }, 1500);
    },
  }
};
</script>
<style lang="less" scoped>
#infinite-scroll {
  font-size: 0.2rem;
  .loadmore {
    padding-top: 0.5rem;
    .contentlist {
      li {
        height: 0.5rem;
        line-height: 0.5rem;
      }
    }
    .loading{
      height: 0.5rem;
      line-height: 0.5rem;
      color:#f00;
    }
    .infinite-scroll-icon{
      vertical-align: middle;
    }
    .infinite-scroll-text{
      height: 0.5rem;
      line-height: 0.5rem;
    }
    .infinite-scroll-text::after{
      display:inline-block;
      content:"...";
      transform:translateY(-0.05rem);
    }
  }
}
</style>
