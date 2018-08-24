<template>
 <div id="swiper">
    <ul class="nanlist">
      <li class="list" v-for="(item,key) of list" @click="dianji(item.id,key)" :key="key">{{item.name}}</li>
    </ul>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
 </div>
</template>
<script type="text/ecmascript-6">
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  data() {
    return {
      list: [
        { name: "销量", id: 0 },
        { name: "价格", id: 1 },
        { name: "综合", id: 2 },
        { name: "距离", id: 3 },
        { name: "远近", id: 4 },
        { name: "远近", id: 5 },
      ],
      banners: [
        "https://www.baidu.com/img/baidu_jgylogo3.gif",
        "https://www.baidu.com/img/baidu_jgylogo3.gif",
        "https://www.baidu.com/img/baidu_jgylogo3.gif",
        "https://www.baidu.com/img/baidu_jgylogo3.gif",
        "https://www.baidu.com/img/baidu_jgylogo3.gif"
      ],
      swiper:null,
    };
  },
  mounted () {
    this.swiper = new Swiper(".swiper-container", {
      loop : true,
      on: {
        slideChangeTransitionStart: function(){
          $(".nanlist li").removeClass("active");
          $(".nanlist li").eq(this.activeIndex).addClass("active");
        },
      },
    });
  },
  methods: {
    dianji(id) {
      this.swiper.slideTo(id);
    }
  },
  components: {}
};
</script>
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
    background: #eee;
    height: 1rem;
  }
}
</style>
