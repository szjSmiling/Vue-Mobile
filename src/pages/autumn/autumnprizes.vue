<template>
  <div id="heg-autumnprizes">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" >My Prizes</p>
    </head-top>
    <div class="content">
      <div class="appTop" v-if="!noPrize && contentMargin" ></div>
      <div class="noPirze" v-if="noPrize">
        <img style="width:100%;height:100%;vertical-align:top;" :src="noPrizeImg" alt="">
      </div>
      <ul class="hasPrize" v-if="!noPrize">
        <li v-for="(item,index) in prizeInfo" :key="index">
          <div class="item-top">
            <div class="flex space-between align-items-center">
              <h4>{{item.prizeName}}</h4>
              <span>{{item.winningTime}}</span>
            </div>
            <p>Zoomcar coupons can be used on Zoomcar’s official website (https://goo.gl/f4Eyyo) for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower. </p>
          </div>
          <div class="item-middle">
            <div class="item-coupon flex space-between">
              <p>Validity:</p>
              <p>{{item.startDate}} - {{item.endDate}}</p>
            </div>
            <div class="item-coupon flex space-between align-items-center">
              <input :id="'foo'+[index]" v-model="item.postalCode" style="width:1px;position:absolute;left:0;opacity:0;">
              <span>USE CODE:</span>
              <div class="flex space-around align-items-center">
                <span>{{item.postalCode}}</span>
                <button class="copy" :id="'copyUrl1'+[index]" :data-clipboard-target="'#foo'+[index]" @click="copyCode(index)" >
                  <img :src="require('../../assets/images/autumn/icon_copy.png')" alt="">
                </button>
              </div>
            </div>
            <div @click="openDetail(index)" class="detail-title flex space-between align-items-center">
              <h5>More details</h5>
              <i class="iconfont icon-doubledown" :class="{isfold:item.flag}" ></i>
            </div>
            <div class="detail-text" v-show="item.flag" >The coupon is valid till 30th September, 2018.</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import headTop from '../../components/head/header.vue';
import { Toast, Indicator } from 'mint-ui';
import { CookieUtil } from '../../models/utils/CookieUtil.js';
import { DomainManager } from "../../request/DomainManager.js";
export default {
  components:{
    headTop,
  },
  data(){
    return{
      flag:true,
      noPrize:true,
      contentMargin:true,
      noPrizeImg:require('../../assets/images/anniversary/ani-no-prize.png'),
      prizeInfo:[
        {id:0,prizeName:"Zoomcar Coupon",postalCode:"HEGAPP1",flag:true,startDate:1534285000000,endDate:1537268100000,winningTime:1535549957000},
        {id:1,prizeName:"Zoomcar Coupon",postalCode:"HEGAPP2",flag:false,startDate:1533185000000,endDate:1537463200000,winningTime:1536549957000},
        {id:2,prizeName:"Zoomcar Coupon",postalCode:"HEGAPP3",flag:false,startDate:1534585000000,endDate:1537464200000,winningTime:1536649957000},
        {id:3,prizeName:"Zoomcar Coupon",postalCode:"HEGAPP4",flag:false,startDate:1534685000000,endDate:1537465200000,winningTime:1536849957000},
        {id:4,prizeName:"Zoomcar Coupon",postalCode:"HEGAPP5",flag:false,startDate:1534785000000,endDate:1537466200000,winningTime:1539549957000},
      ],
    }
  },
  created() {
    this.getPrizeRecord();
  },
  methods:{
    openDetail(who){
      this.prizeInfo.forEach((e,i)=>{
        if(who == i){
          this.prizeInfo[who].flag = !this.prizeInfo[who].flag;
        }else{
          this.prizeInfo[i].flag = false;
        }
      })
    },
    getPrizeRecord(){
      Indicator.open({
        text: 'loading...',
        spinnerType: 'fading-circle'
      });
      // let that = this;
      // let url = DomainManager.getPrizeHistory();
      // this.$axios.get(url).then(res =>{
      //   Indicator.close();
      //   if(res.data.length >= 1){
        //     that.prizeInfo = res.data;
          this.noPrize = false;
          this.prizeInfo.forEach((e,i) => {
            let date = new Date(e.winningTime);
            var Y = date.getFullYear();
            var M = date.getMonth() + 1;
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            this.$set(e,"winningTime",this.transformDate(e.winningTime,1));
            this.$set(e,"startDate",this.transformDate(e.startDate,2));
            this.$set(e,"endDate",this.transformDate(e.endDate,2));
            this.$set(e,'flag',false);
            // if(i == 0){// 默认第一项展开
            //   this.$set(e,'flag',true);
            // }
          });
          setTimeout(()=>{
            Indicator.close();
          },1000)
      //   }else{
      //     that.noPrize = true;
      //   }
      // }).catch(err => {
      //   Indicator.close();
      //   console.log(err);
      // })
    },
    copyCode(who){
      let clipboard;
      if(this.flag){
        this.flag = false;
        clipboard = new Clipboard('#copyUrl1'+who);
        clipboard.on('success', (e) =>{
          Toast({
            message:"Successfully copied to the Clipboard! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        clipboard.on('error', (e)=> {
          Toast({
            message:"Copy failed, please input manually! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        setTimeout(()=>{
          this.flag = true;
        },1200);
      }
    },
    transformDate(who,type){
      let date = new Date(who);
      var Y = date.getFullYear();
      var M = date.getMonth() + 1;
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      if(type == 1){
        return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s
      }else if(type == 2){
        return Y+'/'+M+'/'+D;
      }
    },
  }
}
</script>
<style lang="less" scoped>
#heg-autumnprizes{
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .content,.noPirze{height:100%;}
  .appTop{padding-top:0.5rem;}
  .hasPrize{
    background:#eee;
    text-align:left;
    padding:0 0 0.24rem;
    li{
      background:#fff;
      padding:0.15rem 0.15rem 0.05rem;
      margin:0 0 0.15rem;
      h4{
        font-size: 0.16rem;
        color: #111111;
        letter-spacing: 0;
        line-height:0.24rem;
      }
      h5{
        font-size: 0.12rem;
        color: #111111;
        letter-spacing: 0;
        line-height:0.16rem;
      }
      .item-top{
        border-bottom:1px solid #eee;
        p{
          font-size: 0.16rem;
          color: #111111;
          letter-spacing: 0;
          line-height:0.24rem;
        }
        span{
          font-size: 0.125rem;
          color: #999999;
          letter-spacing: 0;
          line-height: 0.24rem;
        }
        p{
          margin:0.1rem 0;
          font-size: 0.14rem;
        }
      }
      .item-middle{
        .item-coupon{
          font-size: 0.12rem;
          color: #111111;
          letter-spacing: 0;
          line-height:0.16rem;
          margin:0.12rem 0;
          span{
            font-weight: bold;
            margin-right:0.1rem;
          }
          img{
            width:0.2rem;
            height:0.2rem;
            vertical-align: middle;
            cursor: pointer;
          }
          button{padding:0 0;}
        }
        .detail-title{
          i{color:#999e;}
          .isfold{
            transform:rotate(180deg);
          }
          margin-bottom:0.1rem;
        }
        .detail-text{
          font-size: 0.12rem;
          color: #111111;
          letter-spacing: 0;
          line-height: 0.24rem;
          margin-bottom:0.1rem;
        }
      }
    }
  }
}
</style>
