<template>
  <div id="my-vuex3">
    <head-top id="header" >
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="top-distance">{{fullName}}</div>
      <number-scroll :value="total"></number-scroll>
    </div>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import numberScroll from '@/components/number-scroll.vue';
import { Indicator, Toast } from "mint-ui";
import { mapGetters } from 'vuex';
import {mapActions} from "vuex";
export default {
  components:{
    headTop,
    numberScroll,
  },
  data(){
    return {
      total:0,
      firstName: 'Sun',
      lastName: 'Rain'
    }
  },
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        console.log(newValue)
        this.lastName = names[names.length - 1]
      }
    }
  },
  methods: {
    setDate(){
      this.fullName = "Jelly Sunshine";
      let str = this.fullName.substr(0,2)+'****'+this.fullName.substr(-4);
      console.log(str);
    }
  },
  mounted () {
    this.setDate();
    this.total = 1000;
  }
}
</script>
<style lang="less" scoped>
#my-vuex3{
  .top-distance{height:0.5rem;}
  .content{
    font-size: 0.2rem;
    padding:0.1rem 0.15rem;
  }
}
</style>
