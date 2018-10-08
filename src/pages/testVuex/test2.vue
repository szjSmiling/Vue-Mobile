<template>
  <div id="my-vuex2">
    <head-top id="header" >
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="top-distance"></div>
    </div>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import { Indicator, Toast } from "mint-ui";
import { mapGetters } from 'vuex';
import {mapActions} from "vuex";
export default {
  components:{
    headTop
  },
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
#my-vuex2{
  .top-distance{height:0.5rem;}
}
</style>
