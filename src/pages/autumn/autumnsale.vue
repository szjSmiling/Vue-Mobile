<template>
  <div id="heg-autumnsale">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title" >Autumn Sale</p>
    </head-top>
    <div class="content">
      <div class="appTop"></div>
      <div class="top-banner">
        <img :src="icons.banner" alt="" name="">
        <div class="top-cover">
          <p><span>Campaign Starts In :</span> {{saleTime}}</p>
          <p>Sept 13th,00:00:00 -- Sept 30th,23:59:59</p>
        </div>
      </div>
      <div class="part-mobile flex space-between align-items-center">
        <div class="part-left">
          <img class="left-mobile" :src="icons.mobile" alt="">
          <p class="left-p1">Discount on App</p>
          <a href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online" target="_blank"><img class="left-google" :src="icons.google" alt=""></a>
          <a href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online" target="_blank"><img class="left-app" :src="icons.app" alt=""></a>
          <p>Download</p>
          <p style="letter-spacing: -0.5px;">our mobile App</p>
        </div>
        <div class="part-right">
          <ul>
            <li class="item-li flex space-between align-items-center" v-for="(item,index) in coupons1" :key="index">
              <div class="item-left">
                <p>Save <span>RS.{{item.amount | formatDate}}</span></p>
                <p>Order Amount <span v-show="index == 0">&lt;</span><span>{{item.min | formatDate}}</span><span v-show="index == 1 || index == 2">-</span><span v-show="index == 3">K+</span><span>{{item.max | formatDate}}</span></p>
              </div>
              <div class="item-middle">
                <p>USE CODE:</p>
                <p>{{item.code}}</p>
              </div>
              <div class="item-right">
                <input v-model="item.code" style="width:1px;position:absolute;left:0;opacity:0;">
                <button class="copy" :id="'copyUrl1'+[index]" @click="copyCode1(item.id)" >
                  <img :src="icons.copy" alt="copy" title="copy the code">
                </button>
              </div>
            </li>
            <li class="item-text">
              ON DOMESTIC &amp; INTERNATIONAL FLIGHTS
            </li>
          </ul>
        </div>
      </div>
      <div class="part-pc flex space-between align-items-center">
        <div class="part-left">
          <img class="left-pc" :src="icons.pc" alt="">
          <p class="left-p1">Discount on PC &amp; Mobile Site</p>
          <button class="SignIn" v-show="!isLogin" @click="SignIn" >Sign In</button>
          <p class="left-p2">Have no account?</p>
          <button class="SignUp" @click="SignUp" >Sign Up</button>
        </div>
        <div class="part-right">
          <ul>
            <li class="item-li flex space-between align-items-center" v-for="(item,index) in coupons2" :key="index">
              <div class="item-left">
                <p>Save <span>RS.{{item.amount | formatDate}}</span></p>
                <p>Order Amount <span v-show="index == 0">&lt;</span><span>{{item.min | formatDate}}</span><span v-show="index == 1 || index == 2">-</span><span v-show="index == 3">K+</span><span>{{item.max | formatDate}}</span></p>
              </div>
              <div class="item-middle">
                <p>USE CODE:</p>
                <p>{{item.code}}</p>
              </div>
              <div class="item-right">
                <input id="foo2" v-model="item.code" style="width:1px;position:absolute;left:0;opacity:0;">
                <button class="copy" :id="'copyUrl2'+[index]" @click="copyCode2(item.id)" ><img :src="icons.copy" alt="copy" title="copy the code"></button>
              </div>
            </li>
            <li class="item-text">
              ON DOMESTIC &amp; INTERNATIONAL FLIGHTS
            </li>
          </ul>
        </div>
      </div>
      <div class="part-book">
        <button @click="jumpHome" >Book Now</button>
      </div>
      <div class="part-shake">
        <div class="shake-top">
          <img :src="icons.shake" alt="">
          <span>Shake &amp; Win</span>
        </div>
        <p class="shake-p1"><span>SHAKE</span> your phone to win <span>AMAZING PRIZES!</span></p>
        <mt-swipe class="s1-banner" :show-indicators="false" :auto="4000">
          <mt-swipe-item v-for="(item,index) in s1Banners" :key="index">
            <div class="banner-box">
              <img :src="item.url" alt="" @click="jumpDetails(item.prizeName)">
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <div class="part-book">
          <button v-if="!isApp" @click="goForDetail">Go for Details</button>
          <button v-if="isApp" @click="goForDetail">Go to Shake</button>
        </div>
      </div>
      <div class="part-share">
        <p class="share-title">Invite your friends to play now</p>
        <ul class="flex space-around align-items-center">
          <li v-for="(item,index) in sharesApp" :key="index">
            <a v-if="index == 0" :href="(isIos && index == 0)?item.href2:item.href" target="_blank" @click="shareToApp(index)">
              <img :src="item.icon" alt="">
              <p>{{item.name}}</p>
            </a>
            <a v-else :href="item.href" :data-action="index == 1?item.action:''" target="_blank" @click="shareToApp(index)">
              <img :src="item.icon" alt="">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="s3-share">
        <p>Follow us on</p>
        <ul class="share-icon flex">
          <li v-for="(item,index) in s3Shares" :key="index">
            <a :href="item.href" target="_blank" @click="shareTrack(index)">
              <img :src="item.url" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="foot-bottom" v-show="isShowBtn">
        <p>
          <span @click="$router.push('/agreement')">T &amp; C</span>
          <span @click="$router.push('/privacy')">Privacy</span>
          <span @click="$router.push('/about')">About Us</span>
          <span @click="$router.push('/contact')">Contact Us</span>
        </p>
        <p>2016-2018© Happyeasygo Group. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import headTop from '../../components/head/header.vue';
import {Toast,Indicator, Swipe, SwipeItem} from 'mint-ui';
import { CookieUtil } from '../../models/utils/CookieUtil.js';
import { DomainManager } from "../../request/DomainManager.js";
export default {
  components:{
    headTop,
    "mt-swipe":Swipe,
    "mt-swipe-item":SwipeItem
  },
  data(){
    return {
      flag:true,
      isApp:false,
      isIos:false,
      isShowBtn:true,
      saleTime:"01d:03h:21m:34s",
      isLogin:CookieUtil.hasItem('uuid'),
      icons:{
        banner:require('../../assets/images/autumn/topbanner.png'),
        pc:require('../../assets/images/autumn/icon_pc.png'),
        copy:require('../../assets/images/autumn/icon_copy.png'),
        app:require('../../assets/images/autumn/icon_appstore.png'),
        google:require('../../assets/images/autumn/icon_google.png'),
        mobile:require('../../assets/images/autumn/icon_mobile.png'),
        shake:require('../../assets/images/autumn/icon_shake.png'),
        sms:require('../../assets/images/autumn/share_sms.png'),
        whatsapp:require('../../assets/images/autumn/share_whatsapp.png'),
        msg:require('../../assets/images/autumn/share_msg.png'),
        more:require('../../assets/images/autumn/share_more.png'),
      },
      coupons1:[
        {id:0,amount:"300",min:5000,max:"",code:"HEGSEP1"},
        {id:1,amount:"350",min:5000,max:6999,code:"HEGSEP2"},
        {id:2,amount:"550",min:7000,max:9999,code:"HEGSEP3"},
        {id:3,amount:"800",min:10,max:"",code:"HEGSEP4"},
      ],
      coupons2:[
        {id:0,amount:"250",min:5000,max:"",code:"HEGAUT1"},
        {id:1,amount:"300",min:5000,max:6999,code:"HEGAUT2"},
        {id:2,amount:"500",min:7000,max:9999,code:"HEGAUT3"},
        {id:3,amount:"700",min:10,max:"",code:"HEGAUT4"},
      ],
      s1Banners:[
        {prizeName:"ticket",url:require('../../assets/images/autumn/banner-flight-ticket.png')},
        {prizeName:"GAANA",url:require('../../assets/images/autumn/banner-gaana.png')},
        {prizeName:"sliver",url:require('../../assets/images/autumn/banner-happy-sliver.png')},
        {prizeName:"NETMED",url:require('../../assets/images/autumn/banner-netmeds.png')},
        {prizeName:"TREEBO",url:require('../../assets/images/autumn/banner-Treebo.png')},
        {prizeName:"XOXODAY",url:require('../../assets/images/autumn/banner-Xoxoday.png')},
        {prizeName:"ZOOMCAR",url:require('../../assets/images/autumn/banner-zoomcar.png')},
      ],
      sharesApp:[
        {id:0,name:"SMS",href:CookieUtil.hasItem('uuid')?'sms:?body='+CookieUtil.getItem('username')+encodeURIComponent(' invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'):'sms:?body='+encodeURIComponent('HappyEasyGo invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'),
          href2:CookieUtil.hasItem('uuid')?'sms:&body='+CookieUtil.getItem('username')+encodeURIComponent(' invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'):'sms:&body='+encodeURIComponent('HappyEasyGo invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'),icon:require('../../assets/images/autumn/share_sms.png')},
        {id:1,name:"Whatsapp",href:CookieUtil.hasItem('uuid')?'whatsapp://send?text='+CookieUtil.getItem('username')+encodeURIComponent('invites you to Shake & Win with HappyEasyGo. Win FREE FLIGHT TICKET, voucher & e-cash by shaking your phone. https://goo.gl/z4AArY'):'whatsapp://send?text='+encodeURIComponent('HappyEasyGo invites you to Shake & Win with HappyEasyGo. Win FREE FLIGHT TICKET, voucher & e-cash by shaking your phone. https://goo.gl/z4AArY'),action:'share/whatsapp/share',icon:require('../../assets/images/autumn/share_whatsapp.png')},
        {id:2,name:"Messenger",href:'fb-messenger://share/?link='+encodeURIComponent('https://goo.gl/e18H45')+'&app_id=123456789',icon:require('../../assets/images/autumn/share_msg.png')},
        {id:3,name:"More",href:'javascript:;',icon:require('../../assets/images/autumn/share_more.png')},
      ],
      s3Shares:[
        {href:'https://www.facebook.com/happyeasygo/',url:require('../../assets/images/autumn/share-f.png')},
        {href:'https://twitter.com/happyeasygo',url:require('../../assets/images/autumn/share-b.png')},
        {href:'https://www.instagram.com/happyeasygo_india/',url:require('../../assets/images/autumn/share-c.png')},
        {href:'https://www.youtube.com/channel/UCBlph2534GSN1PDJH9E5ylg',url:require('../../assets/images/autumn/share-s.png')},
        {href:'https://plus.google.com/+HappyEasyGoIndia',url:require('../../assets/images/autumn/share-g.png')},
      ],
    }
  },
  methods:{
    jumpHome(){
      try {
        window.heg.goHomePage();
        // window.heg.trackEvent("Ac_App_1stanniversary_book");
      } catch (error) {
        // emitCustomEvent(Anniv_book);
        this.$router.push('/');
      }
    },
    SignIn(){
      if(!this.isLogin){
        try {
          window.heg.nativeSignIn();
        } catch (error) {this.$router.push('/login');}
      }
    },
    SignUp(){
      try {
        window.heg.nativeSignIn();
      } catch (error) {this.$router.push('/register');}
    },
    shareTrack(who){
      switch (who) {
        case 0:
          try {
            // window.heg.trackEvent("Ac_App_1stanniversary_facebook");
          } catch (error) {}
          break;
        case 1:
          try {
            // window.heg.trackEvent("Ac_App_1stanniversary_Twitter");
          } catch (error) {}
          break;
        case 2:
          try {
            // window.heg.trackEvent("Ac_App_1stanniversary_Instagram");
          } catch (error) {}
          break;
        case 3:
          try {
            // window.heg.trackEvent("Ac_App_1stanniversary_youtube");
          } catch (error) {}
          break;
        case 4:
          try {
            // window.heg.trackEvent("Ac_App_1stanniversary_google+");
          } catch (error) {}
          break;
        default:
          break;
      }
    },
    shareToApp(who){
      console.log(who);
    },
    jumpDetails(who){
      console.log(who);
    },
    goForDetail(){
      this.$router.push('/autumnshake');
    },
    copyCode1(who){
      let that = this,clipboard;
      if(this.flag){
        this.flag = false;
        clipboard = new Clipboard('#copyUrl1'+who,{
          text: function() {
            return that.coupons1[who].code;
          }
        });
        clipboard.on('success', function(e) {
          Toast({
            message:"Successfully copied to the Clipboard! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        clipboard.on('error', function(e) {
          Toast({
            message:"Copy failed, please input manually! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        setTimeout(function(){
          that.flag = true;
        },1200);
      }
    },
    copyCode2(who){
      let that = this,clipboard;
      if(this.flag){
        this.flag = false;
        clipboard = new Clipboard('#copyUrl2'+who,{
          text: function() {
            return that.coupons2[who].code;
          }
        });
        clipboard.on('success', function(e) {
          Toast({
            message:"Successfully copied to the Clipboard! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        clipboard.on('error', function(e) {
          Toast({
            message:"Copy failed, please input manually! ",
            duration:1200
          });
          e.clearSelection();
          clipboard.destroy();
        });
        setTimeout(function(){
          that.flag = true;
        },1200);
      }
    },
  },
  created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if(isiOS){
      this.isIos = true;
    }
  },
}
</script>
<style lang="less">
#heg-autumnsale{
  .s1-banner{
    height:3.8rem;
    .mint-swipe-items-wrap{
      width:100%;
      div{
        .banner-box{
          width: 3.2rem;
          left: 0;
          right: 0;
          margin:auto;
          box-shadow:0 2px 10px 1px #666;
          border-radius:4px;
        }
        img{
          width:3.2rem;
          height:3.6rem;
          vertical-align: top;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
#heg-autumnsale{
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{padding-top:0.5rem;}
  .content{
    background:#eee;
    .top-banner{
      position: relative;
      img{width: 100%;}
      .top-cover{
        width: 100%;
        position: absolute;
        bottom: 0;
        background:rgba(0,0,0,0.3);
        padding:0.17rem 0 0.15rem;
        p:first-child{
          margin-bottom:0.075rem;
          color:#fff;
          font-size:0.2rem;
          font-weight: bold;
          span{
            font-size:0.14rem;
            color:#fefdfc;
            font-weight: normal;
            opacity:0.8;
          }
        }
        p:last-child{
          font-size:0.1rem;
          color:#fefdfc;
          opacity:0.6;
        }
      }
    }
  }
  .part-mobile{
    margin:0.11rem 0.15rem;
    background:#fff;
    padding:0.07rem 0;
    border-radius:3px;
    .part-left{
      width:25%;
      padding:0 0.125rem;
      .left-mobile{
        width:0.42rem;
      }
      .left-app,.left-google{
        display:block;
        width:0.65rem;
        margin:auto;
      }
      p{
        color:#333;
        font-size: 0.11rem;
        line-height:0.15rem;
      }
      .left-app{margin:0.075rem auto 0.11rem;}
      .left-p1{margin:0.11rem 0 0.13rem;letter-spacing: -0.5px;}
    }
    .part-right{
      padding-right:0.115rem;
      .item-li{
        padding:0.125rem 0 0;
        border-bottom:1px solid #999;
      }
      .item-left{
        width:56%;
        text-align:left;
        p:first-child{
          font-size:0.16rem;
          color:#333;
          font-weight: bold;
          span{color:#ed8649;}
        }
        p:last-child{
          font-size:10px;
          color:#999;
          span{
            color:#0b9d78;
            font-weight: bold;
            vertical-align: middle;
          }
          margin:0.05rem 0;
          letter-spacing: -0.5px;
        }
      }
      .item-middle{
        width:30%;
        font-size:0.1rem;
        color:#333;
        p:last-child{
          font-weight: bold;
          margin:0.05rem 0;
        }
      }
      .item-right{
        .copy{padding:0 0;}
        img{
          width:0.225rem;
          height:0.2rem;
          cursor: pointer;
          vertical-align:baseline;
        } 
      }
      .item-text{
        font-size:7px;
        color:#333;
        padding:0.15rem 0;
        line-height:0.14rem;
        position: relative;
        letter-spacing: -0.5px;
      }
      .item-text::before,.item-text::after{
        display:block;
        content:"";
        width:0.115rem;
        border-top:1px solid #333;
        position: absolute;
        top:0.2rem;
      }
      .item-text::after{
        right: 0;
      }
    }
  }
  .part-pc{
    margin:0.11rem 0.15rem;
    background:#fff;
    padding:0.075rem 0;
    border-radius:3px;
    .part-left{
      width:25%;
      padding:0 0.125rem;
      .left-pc{
        width:0.42rem;
      }
      p{
        color:#333;
        font-size: 0.11rem;
        line-height:0.15rem;
      }
      .left-p1{
        margin:0.11rem 0 0.125rem;
        letter-spacing: -0.5px;
      }
      button{display:block;cursor: pointer;}
      .left-p2{
        color:#999;
        padding:0.075rem 0 0rem;
        letter-spacing: -1px;
      }
      .SignIn{
        color:#fff;
        width:100%;
        background:#ffad3d;
        padding:0.02rem 0;
        border-radius:2px;
      }
      .SignUp{
        width:100%;
        padding:0 0;
        color:#0b9d78;
        text-align:right;
      }
    }
    .part-right{
      padding-right:0.115rem;
      .item-li{
        padding:0.125rem 0 0;
        border-bottom:1px solid #999;
      }
      .item-left{
        width:56%;
        text-align:left;
        p:first-child{
          font-size:0.16rem;
          color:#333;
          font-weight: bold;
          span{color:#ed8649;}
        }
        p:last-child{
          font-size:10px;
          color:#999;
          span{
            color:#0b9d78;
            font-weight: bold;
            vertical-align: middle;
          }
          margin:0.05rem 0;
          letter-spacing: -0.5px;
        }
      }
      .item-middle{
        width:30%;
        font-size:0.1rem;
        color:#333;
        p:last-child{
          font-weight: bold;
          margin:0.05rem 0;
        }
      }
      .item-right{
        .copy{padding:0 0;}
        img{
          width:0.225rem;
          height:0.2rem;
          cursor: pointer;
          vertical-align:baseline;
        } 
      }
      .item-text{
        font-size:7px;
        color:#333;
        padding:0.15rem 0;
        line-height:0.14rem;
        position: relative;
        letter-spacing: -0.5px;
      }
      .item-text::before,.item-text::after{
        display:block;
        content:"";
        width:0.115rem;
        border-top:1px solid #333;
        position: absolute;
        top:0.2rem;
      }
      .item-text::after{
        right: 0;
      }
    }
  }
  .part-book{
    button{
      width:2.08rem;
      height:0.325rem;
      line-height:0.325rem;
      font-size:0.15rem;
      color:#fff;
      background:#ffad3d;
      border-radius:3px;
      margin:0.175rem auto;
    }
  }
  .part-shake{
    background:#fff;
    padding:0.195rem 0;
    .shake-top{
      font-size:0.12rem;
      img{
        width:0.35rem;
        vertical-align: text-bottom;
      }
      span{
        font-size:0.25rem ;
        color:#ffad3d;
      }
    }
    .shake-p1{
      font-size: 0.15rem;
      padding:0.15rem 0 0.3rem;
      span{
        font-weight: bold;
      }
    }
    .part-book{
      margin:0 0 0.175rem;
    }
  }
  .part-share{
    background:#fff;
    padding:0 0.15rem;
    .share-title{
      font-size:0.14rem;
      color:#333;
    }
    ul{
      padding-bottom:0.35rem;
      border-bottom:1px solid #999;
      li{
        font-size:0.14rem;
        a{color:#333;}
        img{
          width:0.3rem;
          height:0.3rem;
          border-radius:3px;
          margin:0.2rem 0 0.115rem;
        }
      }
    }
  }
  .s3-share{
    background:#fff;
    padding:0.24rem 0.48rem;
    p{font-size:0.12rem;padding-bottom:0.08rem;color:#112645;}
    .share-icon{
      justify-content:space-around;
      li{
        width: 0.4rem;
        height: 0.4rem;
        img{
          width: 100%;
          height:100%;
          border-radius:50%;
          cursor: pointer;
          border:1px solid #eee;
        }
      }
    }
  }
  .foot-bottom {
    vertical-align: middle;
    background:#0b9d78;
    padding: 0.07rem 0 0.115rem;
    p {
      font-size: 0.11rem;
      color: #fff;
      padding: 0.04rem 0 0;
      opacity:0.8;
      span{
        border-right: 1px solid #fff;
        display: inline-block;
        padding: 0 0.04rem;
        cursor: pointer;
      }
      span:last-child{
        border-right: none;
      }
    }
  }
}
</style>
