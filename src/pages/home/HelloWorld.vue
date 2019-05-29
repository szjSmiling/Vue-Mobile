<template>
  <div id="hello">
    <head-top id="header" :operate="showMenu" >
      <i slot="left" class="iconfont icon-items"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa fa-map-marker" @click='$router.push("/address")'></i>
    </head-top>
    <div style="font-size:18px;position:relative;">
      <img class="icon_shake" @click="$router.push('/autumnshake')" :src="require('../../assets/images/autumn/icon_shake.png')" alt="">
      <img class="icon_careers" @click="$router.push('/joinus')" :src="require('../../assets/images/joinus/join-character.png')" alt="">
      <img :src="img" alt="" @click="$router.push('/')">
      <img class="icon_vuex" @click="$router.push('/vuex-test')" :src="require('../../assets/images/vuex/vuex.png')" alt="">
      <span class="icon_class" @click="$router.push('/es6')">封装Class</span>
      <span class="icon_class1" @click="$router.push('/es6-class')">封装Class1</span>
      <span class="icon_class2" @click="$router.push('/es6-class')">封装Class2</span>
      <span class="icon_class3" @click="$router.push('/es6-class')">封装Class3</span>
      <span class="icon_class4" @click="$router.push('/es6-class')">封装Class4</span>
      <p>房租到期印度时间还剩<i class="s-icon s-icon-calendar"></i></p>
      <div class="count-down">
        <span class="child child0" :style="timeBg">{{time.day1}}</span>
        <span class="child child00" :style="timeBg">{{time.day2}}</span>
        <!-- <i>H</i> -->:
        <span class="child child1" :style="timeBg">{{time.hour1}}</span>
        <span class="child child2" :style="timeBg">{{time.hour2}}</span>
        <!-- <i>M</i> -->:
        <span class="child child3" :style="timeBg">{{time.min1}}</span>
        <span class="child child4" :style="timeBg">{{time.min2}}</span>
        <!-- <i>S</i> -->:
        <span class="child child5" :style="timeBg">{{time.sec1}}</span>
        <span class="child child6" :style="timeBg">{{time.sec2}}</span>
      </div>
      <h1>{{ msg }}</h1>
      <h2>测试mint-ui的使用</h2>
      <i class="iconfont icon-mobile"></i>
      <i class="iconfont icon-credit"></i>
      <i class="iconfont icon-pay7zhifu"></i>
      <i class="iconfont icon-creditcardalt"></i>
      <i class="iconfont icon-bank"></i>
      <i class="iconfont icon-cc-paypal"></i>
    </div>
    <div style="font-size:18px;">
      <i class="fa fa-university"></i>
      <span style="font-size:18px;">Font Awesome 5icon图标库的使用</span>
    </div>
    <ul class="btnGroup">
      <li style="position:relative;">
        <input type="text" id="success_form_input" readonly="readonly" v-model="link" style="position:absolute;top:0;left:0;opacity:0;" />
        <mt-button type="primary" @click="handleClick">Hello按钮</mt-button>
        <mt-popup :modal="false" v-model="popupVisible" position="top" >Today is {{date}}.</mt-popup>
        <button class="copy" ref="copy" id="copyBtn" @click="copyClick" data-clipboard-target="#success_form_input">复制粘贴</button>
      </li>
      <li @click="PDFLoad">
        <mt-button>
          <img 
          src="../../assets/images/dog.gif" 
          type="primary" 
          size="large" 
          height="20" width="20" slot="icon">
          PDF文件的预览
        </mt-button>
      </li>
    </ul>
    <ul class="child-list flex content-start align-items-center">
      <li @click="$router.push('/swiper')">swiper</li>
      <li @click="$router.push('/minxin')">minxin</li>
      <li>swiper</li>
      <li>swiper</li>
      <li>swiper</li>
      <li>swiper</li>
      <li>swiper</li>
      <li>swiper</li>
      <li>swiper</li>
      <li>swiper</li>
    </ul>
    <div class="content"></div>
    <foot-end></foot-end>
  </div>
</template>
<script> 
import headTop from "@/components/head/header.vue";
import footEnd from "@/components/foot/footer.vue";
import { Indicator, Toast, Swipe, SwipeItem } from "mint-ui";
export default {
  name: "HelloWorld",
  components: {
    headTop,
    footEnd,
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  data() {
    return {
      link:'',
      timer:null,
      date:"Sunning",
      popupVisible:false,
      img: require("../../assets/images/logo.png"),
      msg: "Welcome to Your Vue.js App",
      time:{
        hour1:0, hour2:0,min1:0,
        min2:0,sec1:0,sec2:0,day1:0,day2:0
      },
      timeBg:{
        "background-image":'url('+require('Assets/images/time-bg.png')+')',
        "background-size":"100% 100%",
        "background:;-repeat":"no-repeat",
      }
    };
  },
  mounted() {
    this.link = location.href;
  },
  methods: {
    showMenu(){
      Toast({
        message:"个人信息",
        duration:1200,
        position:'top'
      });
    },
    PDFLoad() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(() => {
        Indicator.close();
        this.$router.push("/PDF");
      }, 1000);
    },
    handleClick() {
      this.popupVisible = true;
      Toast({
        message: "Hello world!",
        position: "bottom",
        duration: 1200
      });
      setTimeout(()=>{
        this.popupVisible = false;
      },1200);
    },
    copyClick(){
      let copyBtn = new this.$clipboard('#copyBtn');
      copyBtn.on('success', function(e) {
        Toast({
          message: "复制成功！",
          duration: 1200
        });
        e.clearSelection();
      });
      copyBtn.on('error', function(e) {
        Toast({
          message: "复制失败，请手动选择复制！",
          duration: 1200
        });
      });
    },
	  datetime_to_unix(){//将指定时间转化成时间戳
      var date='2019-10-01 00:00:00';//设置到期时间
      date = new Date(Date.parse(date.replace(/-/g, '/')));
      date = date.getTime();
      return parseInt(date/1000);
    },
    getGMTtime(){
      let d = new Date();
      let loaclTime = d.getTime();//获得当地时间
      // console.log(loaclTime);
      //通过Data()对象的getTimezoneOffset()方法来找出当地时间偏移值
      let localOffset = d.getTimezoneOffset() * 60000;
      //getTimezoneOffset()方法的负返回值表示当地时间在全球标准时间（UTC）之前，而正返回值则表示当地时间在全球标准时间（UTC）之后。
      // console.log(d.getTimezoneOffset());
      //将本地时间与本地时区偏移值相加得到当前国际标准时间（UTC）。
      let utc = loaclTime + localOffset;
      // console.log(utc)
      //得到国际标准时间（UTC）后，再获得目标城市的国际标准时间（UTC）小时偏移值，把它转换成毫秒，再加上国际标准时间（UTC）。
      let offset = 5.5;
      let bombay = utc + (3600000*offset);//变量bombay包含印度孟买城的当地时间
      //通过初始化一个新的Data()对象，并调用此对象的toLocalString()方法，我们将前一步中计算得到的时间值转换成一个大家可以看得懂的日期/时间字符串
      // let nd = new Date(bombay);// 印度时间
      // console.log(nd);
      return parseInt(bombay/1000);
    },
    GetRTime(){
      //当前时间戳
      let timestamp = this.getGMTtime();
      //设定时间的时间戳
      var timestamp_set = this.datetime_to_unix();
      //时间戳差
      var cha_timestamp = timestamp_set-timestamp;
      if(cha_timestamp <= 0){
        cha_timestamp = 0;
        this.text = this.text1;
        clearTimeout(this.timer);
      }else{
        this.text = this.text0;
      }
      //剩余天数
      var sy_day = parseInt(cha_timestamp/(3600*24));
      var sy_day = sy_day > 9 ?sy_day:'0'+sy_day;
      //剩余小时
      var sy1_hour = parseInt(cha_timestamp/(3600)) - sy_day * 24;
      var sy2_hour = sy1_hour > 9 ? sy1_hour : '0' + sy1_hour;
      var sy_hour = parseInt((cha_timestamp-sy_day*3600*24)/3600);
      //剩余分钟
      var sy_min = parseInt((cha_timestamp-sy_hour*3600-sy_day*24*3600)/60);
      var sy2_min = sy_min > 9 ? sy_min : '0' + sy_min;
      //剩余秒数
      var sy_miao = cha_timestamp-sy_day*3600*24-sy_hour*3600-sy_min*60;
      var sy2_miao = sy_miao > 9 ? sy_miao : '0' + sy_miao;
       
      this.time.day1 = ((sy_day+'').substr(0, 1));
      this.time.day2 = ((sy_day+'').substr(1, 1));
      this.time.hour1 = ((sy2_hour+'').substr(0, 1));
      this.time.hour2 = ((sy2_hour+'').substr(1, 1));
      this.time.min1 = ((sy2_min+'').substr(0, 1));
      this.time.min2 = ((sy2_min+'').substr(1, 1));
      this.time.sec1 = ((sy2_miao+'').substr(0, 1));
      this.time.sec2 = ((sy2_miao+'').substr(1, 1));
      this.timer = setTimeout(this.GetRTime, 1000);
    },
  },
  created() {
    this.GetRTime();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#hello {
  padding:0.5rem 0 0.58rem;
  #header{
    .icon-right{
      font-size: 0.25rem;
    }
  }
  h2 {
    padding: 0.1rem 0;
  }
  ul,li {
    list-style-type: none;
  }
  .count-down{
    margin-bottom:0.1rem;
    font-size:0.16rem;
    color:#333;
    span{
      width: 0.3rem;
      height: 0.4rem;
      line-height:0.4rem;
      font-size:0.3rem;
      color:#f00;
    }
    i{vertical-align:bottom}
    .child1,.child3,.child5{margin:0 0.05rem 0 0.05rem;}
    .child2,.child4{margin-right:0.01rem;}
  }
  .btnGroup {
    padding: 0 0 0.1rem;
    display:flex;
    justify-content: space-around;
    li:first-child{display:flex;}
    li {
      .mint-button--normal{
        display: block;
        padding:0 10px;
      }
      input{opacity:0;width:1px;height:41px;}
      .copy{
        height: 41px;
        border-radius: 4px;
        background: #ef4f4f;
        color:#fff;
        margin-left:0.1rem;
      }
    }
  }
  a {
    color: #42b983;
  }
  .content {
    padding: 0 0.15rem 1rem;
    background: #eee;
    border-radius: 3px;
    .cont-ol {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem 0;
        font-size: 0.16rem;
        font-family: Arial, Helvetica, sans-serif;
        border-bottom: 1px solid #ddd;
        .close {
          height: auto;
          padding: 0.05rem 0.15rem;
        }
      }
    }
  }
  .icon_shake{
    position: absolute;
    left: 0.2rem;
    top:0.1rem;
    cursor: pointer;
  }
  .icon_careers{
    width:0.6rem;
    position: absolute;
    right: 0.2rem;
    top:0.1rem;
    cursor: pointer;
  }
  .icon_vuex{
    width:0.6rem;
    position: absolute;
    left: 0.2rem;
    top:0.8rem;
    cursor: pointer;
  }
  .icon_class{
    position: absolute;
    left: 0.2rem;
    top:1.3rem;
    cursor: pointer;
    color:#0f0;
  }
  .icon_class1{
    position: absolute;
    right: 0.2rem;
    top:1rem;
    cursor: pointer;
    color:#0f0;
  }
  .icon_class2{
    position: absolute;
    left: 0.2rem;
    top:1.6rem;
    cursor: pointer;
    color:#00f;
  }
  .icon_class3{
    position: absolute;
    right: 0.2rem;
    top:1.3rem;
    cursor: pointer;
    color:#f00;
  }
  .icon_class4{
    position: absolute;
    right: 0.2rem;
    top:1.6rem;
    cursor: pointer;
    color:#0b9d78;
  }

  .child-list{
    flex-wrap: wrap;
    margin:0 0 0.1rem;
    li{
      width:0.8rem;
      height:0.4rem;
      line-height:0.4rem;
      font-size: 0.2rem;
      color:#f00;
      text-align:center;
      background: #eee;
      border-radius:4px;
      cursor: pointer;
      margin-right:0.11rem;
      margin-bottom:0.1rem;
    }
    li:nth-child(4n+1){ margin-left:0.1rem; }
    li:nth-child(4n){ margin-right:0; }
    li:active{
      color:#fff;
      background: #0b9d78;
    }
  }
  
}
</style>
