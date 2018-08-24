<template>
  <div id="mt_rewards">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Registration Reward</span>
      <i slot="right" class="icon-right fa fa-trophy"></i>
    </head-top>
    <div class="content">
      <div class="title-top"></div>
      <div class="top-banner">
        <img :src="bannerImg" alt="" name="">
      </div>
      <div class="section1">
        <h3>Are you ready to earn some cash?</h3>
        <p>HappyEasyGo is offering up to 3000 e-cash to its new customers. If you have not signed up with HappyEasyGo yet, then register right away and get instant Happy Silver in your Happy Wallet. You can use this Happy Silver to enjoy great discounts on your flight ticket booking.</p>
      </div>
      <div class="section2 flex space-between">
        <div class="s2-left">
          <p>Register on the HappyEasyGo app:</p>
          <p>Win <span>3000</span> Happy Silver</p>
          <p>Download our mobile App</p>
          <div class="download flex">
            <a target="_blank" class="android_load" href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online">
              <img :src='require("../../assets/images/H5pages/android_load.png")' alt="" name="">
            </a>
            <a target="_blank" class="apple_load" href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online">
              <img :src='require("../../assets/images/H5pages/apple_load.png")' alt="" name="">
            </a>
          </div>
        </div>
        <div class="s2-right">
          <img :src="require('../../assets/images/H5pages/icon-mobile.png')" alt="">
        </div>
      </div>
      <div class="section3">
        <div class="s3-div1 flex space-between">
          <div class="s2-left">
            <p>Register on the desktop or mobile site:</p>
            <p>Win <span>2000</span> Happy Silver</p>
          </div>
          <div class="s2-right">
            <img :src="require('../../assets/images/H5pages/icon-pc.png')" alt="">
          </div>
        </div>
        <mt-button type="default" @click="$router.push('/')">Register Now</mt-button>
      </div>
      <div class="section4">
        <p>Don’t think it is going to be enough for you to satiate your wanderlust? Worry not because you can keep on earning Happy Silver and Happy Gold with HappyEasyGo’s <a @click="$router.push('/')">Refer and Earn</a> programme.</p>
        <p>Valid for a period of three months from the date of issue, Happy Silver in Happy Wallet can be used to enjoy discounts on flight bookings. Pay a part of your ticket price using Happy Silver and the rest directly. Wondering how much of your flight ticket price can be paid using Happy Silver? Find out <a @click="$router.push('/')">here</a>.</p>
      </div>
      <div class="section5">
        <p>So,what are you waiting for?</p>
        <a @click="$router.push('/')">Register right now</a>
        <p>and start planning an adventure!</p>
      </div>
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
      bannerImg:require('../../assets/images/H5pages/banner.png'),
    }
  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
#mt_rewards{
  .title-top{padding-top: 0.5rem}
  .top-banner{
    img{width: 100%;}
  }
  .content{text-align:left;padding-bottom:0.5rem;}
  .section1{
    padding:0 0.15rem 0.2rem;
    h3{
      font-size: 0.18rem;
      color:#333;
      padding:0.2rem 0 0.05rem;
      text-align:center;
    }
    p{
      font-size: 0.13rem;
      color:#666;
      line-height:0.2rem;
    }
  }
  .section2{
    background:#f9fbfb;
    padding:0.18rem 0.15rem;
    .s2-left{
      p{font-size:0.13rem;}
      p:nth-of-type(2){
        font-size:0.18rem;
        font-weight: bold;
        margin:0.1rem 0 0.2rem;
        span{color:#f00;}
      }
      .download{
        margin-top:0.1rem;
        a{height:0.25rem;}
        img{
          width:0.85rem;
        }
        a:last-child img{
          margin-left:0.1rem;
        }
      }
    }
    .s2-right img{
        width: 0.3rem;
    }
  }
  .section3{
    background:#f9fbfb;
    padding:0.18rem 0.15rem 0.2rem;
    margin:0.1rem 0 0;
    .s3-div1{height:0.6rem;}
    .s2-left{
      p{font-size:0.13rem;}
      p:nth-of-type(2){
        font-size:0.18rem;
        font-weight: bold;
        margin:0.1rem 0 0.2rem;
        span{color:#f00;}
      }
    }
    .s2-right img{
        width: 0.4rem;
    }
    .mint-button--default{
      width: 2rem;
      height: 0.4rem;
      color:#fff;
      background:#ffa000;
      vertical-align: top;
      display: block;
      margin: 0 auto;
    }
  }
  .section4{
    padding:0.2rem 0.15rem;
    p{
      font-size: 0.13rem;
      line-height:0.2rem;
      color:#999;
      a{
        display: inline-block;
        color:#0c9d77;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .section5{
    text-align:center;
    p{
      font-size:0.13rem;
      color:#999;
      line-height:0.25rem;
    }
    a{
      color:#ffa033;
      font-size:0.2rem;
      text-decoration: underline;
      font-weight: bold;
    }
  }
}
</style>
