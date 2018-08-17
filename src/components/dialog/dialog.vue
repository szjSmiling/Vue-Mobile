<template>
	<div id="cancel-order">
		<div class="head">Cancel Payment</div>
		<div class="content">
			<p class="c-p1">We want to know why you cancel your payment so that we can improve our service.</p>
      <mt-checklist
        v-show="options.length > 0"
        v-model="value"
        :options="options">
      </mt-checklist>
		</div>
		<div class="sure">
			<mt-button slot="btn" @click="noCancel" class="btn btn1" type="default">Back</mt-button>
      <mt-button slot="btn" @click="canceled" class="btn btn2" :class="{active:option}" :disabled="!option" type="default">Submit</mt-button>
		</div>
	</div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
  name:"adDialog",
  data(){
    return{
      value:[],
      options:[
        {id:0,label:"My plan changed",value:1},
        {id:1,label:"Failed to pay",value:2},
        {id:2,label:"Ticket price is expensive",value:3},
        {id:3,label:"Duplicate order",value:4},
        {id:4,label:"Error in info",value:5},
        {id:5,label:"Refund my silver/coupon",value:6},
        {id:6,label:"Other",value:7},
      ],
      option:false,
    }
  },
  watch:{
    value:function(val,oldV){
      let arr = [this.value[this.value.length - 1]];
      if(this.value.length > 0){
        this.option = true;
      }else{
        this.option = false;
      }
      if(this.value.length > 1){
        this.value = arr;
      }
    }
  },
  methods: {
    noCancel(){
      this.$emit("cancel");
    },
    canceled(){
      let time = new Date().getFullYear()+"-"+(this.addZero(new Date().getMonth() + 1))+"-"+this.addZero(new Date().getDate());
      let value = this.value[0];
      console.log(time);
      Toast({
        message:"Edit Successfully",
        duration:1500
      });
      this.$emit("cancel");
      this.$router.replace({
        path:"/backfresh",
      });
    },
    addZero(who){ // 月份天数前面补零
      if(who < 10 && who > 0){
        who = "0"+who;
      }else{
        who = who;
      }
      return who;
    }
  },
};
</script>
<style lang="less">
#cancel-order{
  .mint-checklist{
    text-align: left;
    .mint-checklist-title{margin: 0;}
    .mint-cell:last-child {background-repeat: repeat;}
    .mint-cell{
      min-height:0.3rem;
      .mint-cell-wrapper{background-repeat: repeat;}
      .mint-checklist-label{
        display:flex;
        padding: 0;
      }
      .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: #0b9d78;
        border-color: #0b9d78;
      }
      .mint-checkbox-label{
        line-height: 19px;
        height: 19px;
        margin-left:10px;
        font-size:0.16rem;
      }
      .mint-checkbox-core{
        border-radius:0;
        width: 16px;
        height: 16px;
      }
      .mint-checkbox-core:after{
        top: 1px;
        left: 5px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
#cancel-order {
  width:100%;
  margin:auto;
  background-color: #fff;
  border-radius: 4px;
  padding-top: 0.16rem;
  .head {
    text-align: left;
    img {
      width: 0.3rem;
      margin-bottom: 0.1rem;
    }
    font-size: 0.16rem;
    color: #ffad3d;
    padding:0 0.15rem 0.1rem;
    border-bottom:1px solid #eee;
  }
  .content {
    font-size: 0.14rem;
    color: #333;
    line-height: 0.8rem;
    padding: 0.05rem 0.15rem 0;
    text-align: center;
    text-align: left;
    .c-p1{
      line-height:0.2rem;
      padding:0.1rem 0;
    }
  }
  .sure {
    padding: 0 0.2rem 0.2rem;
    font-size: 0.8rem;
    color: #007aff;
    margin-top: 0.1rem;
    line-height: 1rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-radius:0 0 4px 4px;
    // border-top:1px solid transparent;
    .mint-button{
      height:30px;
    }
    .mint-button::after{
      background: #fff;
    }
  }
  .btn {
    width: 45%;
    border-radius:0;
    font-size:0.2rem;
  }
  .active{
    color:#fff;
    background: #ffad3d;
  }
}
</style>