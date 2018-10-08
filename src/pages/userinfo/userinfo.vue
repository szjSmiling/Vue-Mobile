<template>
  <div id="mt-userinfo">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">User Infomation</span>
      <i slot="right" class="icon-right fa fa-trophy"></i>
    </head-top>
    <div class="content">
      <button @click="showActionSheet">显示action-sheet</button>
      <button @click="openPicker">显示datetime-picker</button>
      <mt-actionsheet
        cancelText="cancel"
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <mt-datetime-picker
        ref="picker"
        type="date"
        cancelText="cancel"
        confirmText="confirm"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleConfirm">
      </mt-datetime-picker>
      <p>{{'性别:'+userinfo.sex+',生日:'+userinfo.birthday}}</p>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
import headTop from "Components/head/header.vue";
export default {
  components:{
    headTop,
  },
  data(){
    return {
      sheetVisible:false,
      actions:[
        {value:0,name:"male",method:this.selectMale},
        {value:1,name:"female",method:this.selectFemale},
      ],
      endDate:new Date(),
      startDate:new Date("1900/01/01"),
      userinfo:{
        name:'3556573571@qq.xcom',age:'',sex:'male',birthday:''
      },
    }
  },
  methods:{
    handleConfirm(val){
      this.userinfo.birthday = val
    },
    openPicker() {
      this.$refs.picker.open();
    },
    showActionSheet(){
      this.sheetVisible = true;
    },
    selectMale(val){
      this.userinfo.sex = val.name
    },
    selectFemale(val){
      this.userinfo.sex = val.name
    },
    translateTime(str){
      // let ;
    }
  }
}
</script>
<style lang="less" scoped>
#mt-userinfo{
  background:#eee;
  .content{padding:0.6rem 0.15rem;}
  button{
    font-size:0.2rem;
    margin:0 auto 0.2rem;
    border-bottom:1px solid #999;
  }
  p{
    font-size:0.18rem;
  }
}
</style>
