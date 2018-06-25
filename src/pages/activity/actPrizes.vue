<template>
  <div id="gamePrize">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back" ></i>
      <p slot="title">My Prizes</p>
    </head-top>
    <div class="content" v-show="havePrize">
      <ul class="prizes">
        <li class="flex" v-for="(item,index) in prizeInfo" :key="index">
          <div class="imgIcon"><img :src="item.src" alt=""></div>
          <div class="word">
            <div class=" top flex">
              <h4>{{item.prizeName}}</h4>
              <span>{{item.winningTime}}</span>
            </div>
            <p>{{item.prizeContent}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div style="height:92.8%;" v-show="noPrize">
      <img style="width:100%;height:100%;vertical-align:top;" :src="noPrizeImg" alt="">
    </div>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
import {Toast,Indicator} from 'mint-ui';
// import { DomainManager } from "../../config/DomainManager.js";
export default {
  components:{
    headTop,
  },
  data(){
    return{
      havePrize:false,
      noPrize:false,
      noPrizeImg:require('../../assets/images/anniversary/ani-no-prize.png'),
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      prizeInfo:[
        {id:0,prizeName:'IPhoneX',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize0xx.png")},
        {id:1,prizeName:'Vivo x6',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize1xx.png")},
        {id:2,prizeName:'OPPO R11',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize2xx.png")},
        {id:3,prizeName:'诺基亚15',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize3xx.png")},
        {id:4,prizeName:'索尼26',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize4xx.png")},
        {id:5,prizeName:'小米发烧',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize5xx.png")},
        {id:6,prizeName:'魅族 S12',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize6xx.png")},
        {id:7,prizeName:'小灵通ing',winningTime:1525703600000,prizeContent:'The phone is the best around the world!',src:require("../../assets/images/anniversary/prize7xx.png")},
      ],
    }
  },
  methods:{
    getPrizeRecord(){
      // let url = DomainManager.getPrizeHistory();
      // this.$axios.get(url).then(res =>{
        // console.log(res)
        // if(res.data){
          // this.prizeInfo = res.data;
          this.prizeInfo.forEach((e,i) => {
            let date = new Date(e.winningTime);
            var M = this.months[date.getMonth()]+' ';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            this.$set(e,'winningTime',M+D+h+m);
          });
          this.havePrize = true;
          this.noPrize = false;
        // }else{
        //   this.havePrize = false;
        //   this.noPrize = true;
        // }
      // }).catch(err => {
      //   console.log(err);
      // })
    },
  },
  created(){
    setTimeout(()=>{
      this.getPrizeRecord();
      Indicator.close();
    },500)
    
  }
}
</script>
<style lang="less" scoped>
#gamePrize{
  .header {
    background: #0b9d78;
    height:7.2%;
  }
  .content{
    padding-top:0.5rem;
    text-align:left;
    margin-bottom: .2rem;
    .prizes{
      li{
        margin-left:0.15rem;
        border-bottom:1px solid #eee;
        align-items: center;
        .imgIcon{
          width:0.7rem;
          padding:0 0.18rem 0 0;
          img{
            width: 100%;
            // height:0.5rem;
          }
        }
        .word{
          font-size: 0.15rem;
          padding-top:0.23rem;
          padding-right:0.118rem;
          flex:1;
          .top{
            height:0.15rem;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.07rem;
            span{
              width:1.17rem;
              text-align: right;
            }
          }
          p{
            line-height: 0.2rem;
            padding-bottom: 0.07rem;
            color:#A6A6A6;
            word-break: break-all; 
            word-wrap:break-word;
          }
        }
      }
    }
  }
}
</style>
