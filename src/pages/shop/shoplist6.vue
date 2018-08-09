<template>
  <div id="lazyLoad">
    <router-link v-for="brand in brandList" :to="brand.detail" tag="li" :key="brand.id" >
      <div class="load-imgs">
        <img alt="" v-lazy="brand.img">
      </div>
      <div>
        <div class="info">{{brand.info}}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      brandList:[
        {id:0,img:require('../../assets/images/banner/b_flight1.jpg'),info:"昨天",detail:"/"},
        {id:1,img:require('../../assets/images/banner/b_flight2.jpg'),info:"今天",detail:"/"},
        {id:2,img:require('../../assets/images/banner/b_flight3.jpg'),info:"明天",detail:"/"},
        {id:3,img:require('../../assets/images/banner/b_flight4.jpg'),info:"后天",detail:"/"},
      ]
    }
  },
  methods:{

  },
  created () {
    
  }
}
</script>
<style lang="less" scoped>
#lazyLoad{
  font-size: 0.18rem;
  li{list-style-type: none;padding:0.2rem 0 0;}
  .load-imgs{
    margin-bottom:0.1rem;
    img[lazy=loading] {
      width: 40px;
    }
    img{
      width: 50%;
      height: 100%;
    }
  }
}
</style>
