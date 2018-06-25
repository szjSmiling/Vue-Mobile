<template>
  <div id="anniversary">
    <div v-show="showActivity" style="height:100%;">
      <head-top id="header">
        <i slot="left" class="iconfont icon-back"></i>
        <p slot="title">axtivity</p>
        <!-- <i slot="right" class="iconfont icon-home"></i> -->
      </head-top>
      <div class="content" >
        <section class="section0"></section>
        <section class="section1" :style="bgStyle">
          <ul class="game">
            <li class="gameImg gameImg1">
              <img :src="imgGroup[0]" alt="">
              <img class="gameImg2" v-if="!isStart" :src="imgGroup[1]" alt="">
              <img class="gameImg22" v-else :src="actived[1]" alt="">
              <div class="row" :class="{row1:index == 0?true:false,row2:index == 1?true:false,row3:index == 2?true:false}" ref='slots' v-for="(slot,index) in slots" :key="index">
                <div class='slot__wrap'>
                  <div class='slot__item' v-for='(opt,index2) in slot.items' :key="index2"><img :src="opt"></div>
                  <div class='slot__item slot__item--copy'><img  :src="slot.items[0]"></div>
                </div>
              </div>
            </li>
            <li class="gameUser">
              <p><span>{{userInfo.userName}}</span> : {{userInfo.chances}} chances</p>
              <p @click="HowToGetChances">How to earn more chances?</p>
            </li>
            <li class="gameImg gameImg3">
              <button v-if="!isStart" :disabled="canClick" @click.stop.prevent="startBtn($event)"><img :src="imgGroup[2]" alt="" ></button>
              <button v-else :disabled="canClick" @click.stop.prevent="startBtn($event)"><img :src="actived[2]" alt=""></button>
            </li>
            <li class="gameImg gameImg4 flex space-between">
              <span @click="goDetails">Details</span>
              <span @click="goPrize">My Prize</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div class="dialog" v-show="showDialog">
      <div class="icon0" @click="closeDialog"><img :src="imgGroup[3]" alt=""></div>
      <ul class="alertPrize alertPrize0" v-if="whichDialog==0">
        <li>What a pity!</li>
        <li><img :src='require("../../assets/images/anniversary/ani-cry.png")' alt=""></li>
        <li>just need a little luck</li>
        <li><button @click="Confirm">Confirm</button></li>
      </ul>
      <ul class="alertPrize alertPrize1" v-else-if="whichDialog==1">
        <li>Congratulation</li>
        <li><img :src='require("../../assets/images/anniversary/ani-icon-bus.png")' alt=""></li>
        <li>you’ve won <span>First Prize</span></li>
        <li><button @click="Confirm">Confirm</button></li>
      </ul>
      <div class="alertPrize2" v-else-if="whichDialog==2">
        <p class="p2-title">How to earn more chances？</p>
        <ul class="chances">
          <li><span>·</span>Daily sign in +1</li>
          <li><span>·</span>New registered users +1 </li>
          <li><span>·</span>Install in a new decive +1</li>
          <li><span>·</span>Sync your contact +1</li>
          <li><span>·</span>Invite your friends to registe +1</li>
          <li><span>·</span>Successful pay your order +1</li>
          <li><span>·</span>Referred booking from your friends +1</li>
        </ul>
        <p class="line2"></p>
        <div class="confirm"><button @click="Confirm">Confirm</button></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
import {Toast,Indicator} from 'mint-ui';
import { CookieUtil } from 'Models/utils/CookieUtil';
const next = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame || 
  function(cb) { window.setTimeout(cb, 1000/60) };
export default {
  components:{
    headTop,
  },
  data(){
    return{
      isStart:false,
      showDialog:false,
      canClick:false,
      showActivity:true,
      whichDialog:0,
      dialogType:0,
      userInfo:{
        chances:3,userName:'5537553571@qq.com',isWin:null,prize:null,msg:'',
      },
      prizeImg:[
        require("../../assets/images/anniversary/prize0xx.png"),
        require("../../assets/images/anniversary/prize1xx.png"),
        require("../../assets/images/anniversary/prize2xx.png"),
        require("../../assets/images/anniversary/prize3xx.png"),
        require("../../assets/images/anniversary/prize4xx.png"),
        require("../../assets/images/anniversary/prize5xx.png"),
        require("../../assets/images/anniversary/prize6xx.png"),
        require("../../assets/images/anniversary/prize7xx.png"),
      ],
      bgStyle:{
        background:'url('+require("../../assets/images/anniversary/ani-bg-img.png")+') repeat',
        backgroundSize:'100% 100%',
      },
      imgGroup:[
        require("../../assets/images/anniversary/ani-space.png"),
        require("../../assets/images/anniversary/ani-start-btn-up.png"),
        require("../../assets/images/anniversary/ani-start.png"),
        require("../../assets/images/anniversary/ani-cancel.png"),
      ],
      actived:[
        require("../../assets/images/anniversary/ani-space.png"),
        require("../../assets/images/anniversary/ani-start-btn-down.png"),
        require("../../assets/images/anniversary/ani-start-actived.png"),
      ],
      slots: [
        {title: "yesterday",items: [
          require("../../assets/images/anniversary/prize0.png"),
          require("../../assets/images/anniversary/prize1.png"),
          require("../../assets/images/anniversary/prize2.png"),
          require("../../assets/images/anniversary/prize3.png"),
          require("../../assets/images/anniversary/prize4.png"),
          require("../../assets/images/anniversary/prize5.png"),
          require("../../assets/images/anniversary/prize6.png"),
          require("../../assets/images/anniversary/prize7.png"),
        ]},
        {title: "today",items: [
          require("../../assets/images/anniversary/prize0.png"),
          require("../../assets/images/anniversary/prize1.png"),
          require("../../assets/images/anniversary/prize2.png"),
          require("../../assets/images/anniversary/prize3.png"),
          require("../../assets/images/anniversary/prize4.png"),
          require("../../assets/images/anniversary/prize5.png"),
          require("../../assets/images/anniversary/prize6.png"),
          require("../../assets/images/anniversary/prize7.png"),
        ]}, 
        {title: "tomorrow",items: [
          require("../../assets/images/anniversary/prize0.png"),
          require("../../assets/images/anniversary/prize1.png"),
          require("../../assets/images/anniversary/prize2.png"),
          require("../../assets/images/anniversary/prize3.png"),
          require("../../assets/images/anniversary/prize4.png"),
          require("../../assets/images/anniversary/prize5.png"),
          require("../../assets/images/anniversary/prize6.png"),
          require("../../assets/images/anniversary/prize7.png"),
        ]}
      ],
      opts: null,
      startedAt: null,
    }
  },
  created () {
    Indicator.open({
      spinnerType: 'fading-circle'
    });
    setTimeout(()=>{
      Indicator.close();
    },500)
    this.getRemainder();
  },
  beforeRouteEnter: (to, from, next) => {//解决在子路由页面刷新,不显示子路由内容的情况
    next(ve => {
      if (to.path == "/activity" || to.path == "/activity/") {
        ve.showActivity = true;
      } else {
        ve.showActivity = false;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {//解决浏览器上在子路由页面点击后退按钮时,父级路由内容不显示的bug;
    if (to.path == "/activity" || to.path == "/activity/") {
      this.showActivity = true;
    } else {
      this.showActivity = false;
    }
    next();
  },
  methods:{
    getRemainder(){
      // let userName = CookieUtil.getItem("username");
      let userName = this.userInfo.userName;
      let str = userName.substr(0,3)+'****'+userName.substr(userName.lastIndexOf('@'));
      if(userName.split("").length > 11){
        this.userInfo.userName = str;
      }else{
        this.userInfo.userName = userName;
      }
      // let url = DomainManager.getObtainRemainingLottery();
      // this.$axios.get(url).then(res =>{
      //   // console.log(res)
      //   this.userInfo.chances = res.data
      //   Indicator.close();
      // }).catch(err => {
      //   console.log(err);
      // })
    },
    startBtn: function() {
      this.isStart = true;
      this.canClick = true;
      if(this.userInfo.chances <= 0){
        this.userInfo.chances = 0;
        this.isStart = false;
        this.canClick = false;
        Toast({
          message:"you have no chances,please to earn more chances!",
          duration:1000
        });
        return
      }else{
        this.userInfo.chances --;//前端控制抽奖剩余次数,现在不需要,后台控制.
        // this.startGame();
      }
      if (this.opts) {
          return
        }
        let type = [];
        this.opts = this.slots.map( (data, i) => {
          const slot = this.$refs.slots[i];// map(function(){})利用map便利slots的每一个选项组,最终得到return的返回值
          const choice = Math.floor( Math.random() * data.items.length );// 随机生成一个[0,data.items.length]的整数(floor向下取整)
          type.push(choice);
          const opts = {
            el: slot.querySelector('.slot__wrap'),//指向奖项元素的父级;
            finalPos: choice * 54,// 54为每一个奖品滚动标签的高度;
            startOffset:540 + Math.random() * 500 + i * 500,
            height: data.items.length * 54,
            duration: 3000 + i * 700, 
            isFinished: false,
          }
          return opts
        })
        if(type[0] == type[1] && type[0] == type[2] && type[1]  == type[2]){
          this.dialogType = 1
        }else{
          this.dialogType = 0
        }
        console.log(type)
        next( this.animate );
  	},
    animate: function(timestamp) {// timestamp当前的方法持续的毫秒数
      if (this.startedAt == null) {
          this.startedAt = timestamp// 动画初始时间
      }
      const timeDiff = timestamp - this.startedAt//动画持续的时间
      this.opts.forEach( opt => {
        if(opt.isFinished){
          return
        }
        const timeRemaining = Math.max(opt.duration - timeDiff, 0);// 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束
        const power = 2
        const offset = ( Math.pow(timeRemaining, power) / Math.pow(opt.duration, power) ) * opt.startOffset
        const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height)
        opt.el.style.transform = "translateY(" + pos + "px)"   
        if ( timeDiff > opt.duration ) {
          opt.isFinished = true
        }
      })  
      if (this.opts.every( o => o.isFinished )) {
        this.opts = null
        this.startedAt = null
        this.isStart = false;
        this.canClick = false;
        switch (this.dialogType) {
          case 0:
          this.whichDialog = 0;
          break;
          case 1:
            this.whichDialog = 1;
          break;
          default:
            this.whichDialog = 2;
          break;
        }
        Indicator.open({
          text:".....",
          spinnerType:'fading-circle'
        });
        setTimeout(()=>{
          Indicator.close();
          this.showDialog = true;
        },1000);
      } else {
        next( this.animate )
      }
    },
    HowToGetChances(){
      this.whichDialog = 2;
      this.showDialog = true;
    },
    Confirm(){
      this.showDialog = false;
    },
    closeDialog(){
      this.showDialog = false;
    },
    goDetails(){
      this.$router.push('/activity/actDetails');
      this.showActivity = false;
      Indicator.open({
        spinnerType: 'fading-circle'
      });
    },
    goPrize(){
      this.$router.push('/activity/actPrizes');
      this.showActivity = false;
      Indicator.open({
        spinnerType: 'fading-circle'
      });
    },
    startGame(){
      let that = this;
      let url = DomainManager.startLottery();
      this.$axios.get(url).then(res =>{
        // console.log(res.data);
        that.userInfo.chances = res.data.remaining;
        that.userInfo.prize = res.data.prize;
        that.userInfo.isWin = res.data.win;
        that.userInfo.msg = res.data.msg;
        if (this.opts) {
          return
        }
        let type = [],a = [1,2,3];
        this.opts = this.slots.map( (data, i) => {
          const slot = this.$refs.slots[i];// map(function(){})利用map便利slots的每一个选项组,最终得到return的返回值
          // const choice = Math.floor( Math.random() * data.items.length );// 随机生成一个[0,data.items.length]的整数(floor向下取整)
          if(this.userInfo.isWin){
            this.dialogType = 1
            var choice = this.userInfo.prize;
            type.push(choice);
          }else{
            this.dialogType = 0
            var choice = Math.floor( Math.random() * data.items.length );
            type.push(choice);
            if(type[0] == type[1] && type[0] == type[2] && type[1]  == type[2]){
              choice += a[i];
              type = [1,2,3];
            }
          }
          const opts = {
            el: slot.querySelector('.slot__wrap'),//指向奖项元素的父级;
            finalPos: choice * 54,// 54为每一个奖品滚动标签的高度;
            startOffset:540 + Math.random() * 500 + i * 500,
            height: data.items.length * 54,
            duration: 3000 + i * 700, 
            isFinished: false,
          }
          return opts
        })
        console.log(type)
        next( this.animate );
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style lang="less" scoped>
#anniversary{
  .header {
    background: #0b9d78;
    height:0.5rem;
  }
  .content{
    height:100%;
    .section0{
      height:7.2%;
    }
    .section1{
      height:92.8%;
      overflow: hidden;
      .game{
        height:100%;
        margin-top:0.8rem;
      }
      .game::after{
        display:block;
        content:"";
        clear: both;
      }
      img{
        width: 100%;
        height:auto;
      }
      .gameImg{
        margin:auto;
      }
      .gameImg1{
        width:328px;
        position: relative;
        margin:auto;
        .row{
          width:62px;
          height:82px;
          overflow: hidden;
          position: absolute;
          top: 145px;
          left:40px;
          .slot__wrap{font-size:0;}
          .slot__item {
            width:50px;
            height:25px;
            line-height: 25px;
            margin:28px auto 29px;
            padding:0 6px;
            img{
              width:50px;
              height:24px;
            }
          }
          .slot__item--copy {}
        }
        .row2{
          left:114px;
        }
        .row3{
          left:191px;
        }
      }
      .gameImg2{
        width:37.5px;
        position: absolute;
        right:8px;
        top:50px;
        cursor: pointer;
      }
      .gameImg22{
        width:37.5px;
        position: absolute;
        right:8px;
        top:138px;
        cursor: pointer;
      }
      .gameImg3{
        width:2.45rem;
        height:0.45rem;
        button{
          display: block;
          width: 100%;
          cursor: pointer;
          img{
            width: 100%;
            height: 100%;
            vertical-top:0;
          }
        }
      }
      .gameUser{
        p:nth-child(1){
          color:#fff;
          font-size:0.16rem;
          line-height:0.18rem;
          padding:0.3rem 0 0.09rem;
          span{
            font-size:0.14rem;
          }
        }
        p:last-child{
          color:#fff;
          font-size:0.14rem;
          line-height:0.16rem;
          opacity: 0.5;
          padding-bottom:0.14rem;
          cursor: pointer;
        }
      }
      .gameImg4{
        width: 2.35rem;
        padding:0.118rem 0.1rem 0;
        span{
          color:#fff;
          font-size:0.2rem;
          letter-spacing: 1.2px;
          line-height: 0.25rem;
          cursor: pointer;
        }
      }
    }
  }
  .dialog{
    width: 100%;
    height:100%;
    position: absolute;
    background: rgba(0,0,0,0.5);
    top:0;
    left: 0;
    .icon0{
      width:0.25rem;
      height:0.25rem;
      display:none;
      position: absolute;
      top:2%;
      right:5%;
      cursor: pointer;
      img{
        width: 100%;
        height:100%;
      }
    }
    .alertPrize{
      padding:0 0.28rem;
      position: absolute;
      background: #FAFAFA;
      border-radius: 7px;
      width: 62%;
      height:54%;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin:auto;
      li{margin:0.22rem auto 0;}
      li:nth-child(1){
        color: #CC2232;
        letter-spacing: 0;
        font-size: 0.18rem;
        font-weight: bolder;
        line-height: 1;
      }
      li:nth-child(2){
        width:1.39rem;
        height:1.39rem;
        padding:0.118rem;
        border:1px solid #ccc;
        border-radius:3px;
        img{
          width:100%;
          height:100%;
        }
      }
      li:nth-child(3){
        font-size: 0.14rem;
        color: #333333;
        border-bottom:1px solid #ddd;
        margin:0;
        padding:0.218rem 0;
      }
      li:last-child{
        width: 85%;
        height:0.34rem;
        line-height:0.34rem;
        background: #CC2232;
        border-radius: 3px;
        button{
          font-size:0.15rem;
          color: #FFFFFF;
          width: 100%;
          height:100%;
        }
      }
      
    }
    .alertPrize0{
      li:nth-child(1){
        color:#000;
      }
      li:nth-child(2){
        border:none;
      }
    }
    .alertPrize2{
      padding:0 0.1rem;
      position: absolute;
      background: #FAFAFA;
      border-radius: 7px;
      text-align: left;
      width: 71%;
      height:54%;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin:auto;
      .p2-title{
        letter-spacing: 0;
        font-size: 0.18rem;
        font-weight: bolder;
        padding:0.2rem 0 0.118rem;
      }
      .chances{
        li{
          font-size:0.14rem;
          line-height: 0.3rem;
          letter-spacing: .5px;
        }
      }
      .line2{
        width: 95%;
        border-bottom:1px solid #ddd;
        margin:0 auto;
        padding:0.1rem 0;
      }
      .confirm{
        width: 85%;
        height:0.34rem;
        line-height:0.34rem;
        background: #CC2232;
        border-radius: 3px;
        margin:0.15rem auto 0;
        text-align: center;
        button{
          font-size:0.15rem;
          color: #FFFFFF;
          width: 100%;
          height:100%;
        }
      }
    }
  }
}
</style>
