<template>
 <div id="swiper">
    <ul class="nanlist">
      <li class="list" v-for="(item,key) of list" :key="key" @click="selectTitle(item.id)">{{item.name}}</li>
    </ul>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <div class="swiper-content">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
          <a class="slide-cover"></a>
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <mt-swipe class="mint-swipe" :auto="isPlay" :show-indicators="true" @change="handleChange">
      <i class="fa fa-chevron-left" style="font-size:50px;height:30px;position:absolute;z-index:6;color:#fff;left:0;top:0;bottom:0;margin:auto;cursor:pointer;" @click="leftSwiper"></i>
      <i class="fa fa-chevron-right" style="font-size:50px;height:30px;position:absolute;z-index:6;color:#fff;right:0;top:0;bottom:0;margin:auto;cursor:pointer;" @click="rightSwiper"></i>
      <template v-for="(item,i) in bannerList">
        <mt-swipe-item :class="{'is-active':i == index}" v-if="bannerList?bannerList:false" :key="i">
          <a>
            <img :src="item" alt="szj-picture" title="szj try it">
          </a>
        </mt-swipe-item>
      </template>
    </mt-swipe>
 </div>
</template>
<script>
import { Indicator, Toast, Swipe, SwipeItem } from "mint-ui";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  components:{
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  data() {
    return {
      swiper:null,
      isPlay:0,
      index:0,
      isauto:false,
      list: [
        { name: "销量", id: 0 },
        { name: "价格", id: 1 },
        { name: "综合", id: 2 },
        { name: "距离", id: 3 },
        { name: "远近", id: 4 },
      ],
      banners: [
        "http://img3.redocn.com/20131012/Redocn_2013101208241467.jpg",
        "http://www.51pptmoban.com/d/file/2014/01/23/f03220aa5cc066bea0d4d2d355365f18.jpg",
        "http://pic17.nipic.com/20110927/4665748_174905747196_2.jpg",
        "http://img.bimg.126.net/photo/31kQlCGP44-34Q5yxvoqmw==/5770237022569104952.jpg",
        "http://5b0988e595225.cdn.sohucs.com/images/20181218/b93d89bf97ef4315b6a4d90c9ce72c3d.jpeg"
      ],
      bannerList:[
        require('Assets/images/banner/b_flight1.jpg'),require('Assets/images/banner/b_flight2.jpg'),
        require('Assets/images/banner/b_flight3.jpg'),require('Assets/images/banner/b_flight4.jpg'),
      ]
    };
  },
  mounted () {
    this.swiper = new Swiper(".swiper-container", {
      loop : true,
      // freeMode:true,
      // effect:"coverflow", // coverflow,fade
      // coverflowEffect: {
      //   rotate: 30,
      //   stretch: 10,
      //   depth: 60,
      //   modifier: 2,
      //   slideShadows : true
      // },
      speed: 500,
      observer: false,// 有修改时,自动初始化swiper
      initialSlide :0, // 初始化时slide的索引
      preloadImages:false,// 加载图片
      centeredSlides: true,//居中
      // slidesPerView: 2,//可见个数2, 效果如下面的siwper
      // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      // autoplayDisableOnInteraction: true,
      on: {
        slideChangeTransitionStart: function(){
          // activeIndex 非循环模式下使用,循环模式下使用 realIndex;
          // console.log(this.realIndex)
          $(".nanlist li").removeClass("active");
          $(".nanlist li").eq(this.realIndex).addClass("active");
        },
        tap: function(event){ // 点击事件，避免在dom上绑定事件时，loop复制的dom无点击事件
          console.log('你碰了Swiper');
        },
      },
    });
    let mySwiper = new Swiper(".swiper-content",{
      direction: "horizontal",
      loop: true,
      autoplay: true,
      slidesPerView: "auto",
      // loopedSlides: 3,// 要显示完整的3个
      centeredSlides: true,
      spaceBetween:9,
      loopAdditionalSlides: 100,
      on:{
        slideChange:function(){ 
          // console.log(this.realIndex)
        }
      }
    })
  },
  methods: {
    selectTitle(id) {
      this.swiper.slideToLoop(id);
    },
    autoPlay(){
      // if(this.isPlay != 0){
      //   this.isPlay == 4000;
      // }
    },
    leftSwiper(){
      this.isauto = false,
      this.isPlay = 0;
      this.index ++;
      if(this.index > 3){
        this.index = 0;
      }
    },
    rightSwiper(){
      this.isauto = false,
      this.isPlay = 0;
      this.index --;
      if(this.index < 0){
        this.index = 3;
      }
    },
    handleChange(index){
      this.index = index;
    },
  },
  beforeDestroy() {
    // 移除所有slide监听事件，所以拖动和click事件失效了。
    this.swiper.destroy(true);
  },
};
</script>
<style lang="less">
#swiper{
  .swiper-notification{
    display: none;
  }
}
</style>
<style lang="less" scoped>
#swiper {
  padding: 0 0.2rem;
  font-size: 0.2rem;
  .nanlist{
    padding: 0.2rem 0;
    display:flex;
    justify-content: space-between;
    .active{
      color:#f00;
    }
  }
  .swiper-container{
    height: 1.5rem;
    background: #eee;
    .swiper-slide{
      img{
        width:100%;
        height:100%;
      }
    }
  }
  // mint-swiper
  .mint-swipe {
    height:1.5rem;
    .mint-swipe-items-wrap > div{z-index:5;}
    a,img{
      width: 100%;
      height:100%;
    }
  }
  //swiper
  .swiper-content {
    width: 100%;
    // height: 1.7rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    position: relative;
    overflow-x:scroll;
    .swiper-wrapper .swiper-slide {
      width: 2.5rem;
      position: relative;
      .slide-cover{
        width:100%;
        height:100%;
        border-radius: 8px;
        background: rgba(0,0,0,0.4);
        position: absolute;
        top: 0;
        left: 0;
      }
      img {
        width: 100%;
        height: 1.22rem;
        border-radius: 8px;
      }
    }
    .swiper-slide-prev {
      // height: 1.5rem ;
      // margin-top: 0.18rem;
      // img {
      //   height: 1.4rem ;
      // }
    }
    .swiper-slide-next {
      // height: 1.5rem ;
      // margin-top: 0.18rem;
      // img {
      //   height: 1.4rem ;
      // }
    }
    .swiper-wrapper .swiper-slide-active {
      // width: 2.5rem;
      .slide-cover{ background: transparent; }
    }
  }
}
</style>
