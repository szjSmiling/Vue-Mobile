<template>
  <div id="user-address">
    <head-top id="header" v-show="address.show">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa fa-pencil-square-o" @click="edit"></i>
    </head-top>
    <div class="ad-con" v-show="address.show">
      <div class="ad-detail">
        <div class="ad-left" v-show="datePicker">
          <mt-picker :showToolbar="true" :slots="slots" @change="onValuesChange">吃饭时间</mt-picker>
        </div>
        <div class="ad-center"></div>
        <div class="ad-right"></div>
      </div>
    </div>
    <ad-edit v-show="!address.show" @selected="defaultAddress" ></ad-edit>
    <mt-popup 
      v-model="cancelOrder" 
      popup-transition="popup-fade" 
      modal="true" 
      closeOnClickModal="false">
      <ad-dialog @cancel="cancelled" ></ad-dialog>
    </mt-popup>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
import headTop from "Components/head/header.vue";
import adEdit from "Pages/address/child/edit.vue";
import adDialog from "Components/dialog/dialog.vue";
import {appBrower} from 'Models/apptype.js';// 判断app的浏览器是android 还是 ios
export default {
  components: {
    headTop,
    adEdit,
    adDialog,
  },
  data() {
    return {
      arr:[],
      datePicker:true,
      cancelOrder:false,
      address:{
        show:true,
      },
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center',
          visibleItemCount:5,// 可见区域显示的最大时间个数,默认值是5
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center',
          visibleItemCount:5,
        }
      ],
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    edit(){
      this.address.show = false;
    },
    defaultAddress(who){
      this.address.show = true;
      this.cancelOrder = true;
    },
    cancelled(){
      this.cancelOrder = false;
    },
  },
  created() {
    if(appBrower.versions.android){
      console.log("安卓系统--安卓机,浏览器内核? webkit = "+appBrower.versions.webKit);
    }else if(appBrower.versions.ios){
      console.log("苹果系统--苹果机,浏览器内核? webkit = "+appBrower.versions.webKit);
    }
    for (let i = 1976; i <= Number(new Date().getFullYear());i++) {
      this.arr.push(i);
    }
    let arr = this.arr.reverse();
    this.slots[0].values = arr;
    this.slots[2].values = arr;
  },
}
</script>
<style lang="less" scoped>
#user-address{
  .ad-con{
    padding-top:0.5rem;
  }
  .mint-popup{
    width: 75%;
  }
}
</style>
