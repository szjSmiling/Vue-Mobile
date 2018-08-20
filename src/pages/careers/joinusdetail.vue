<template>
  <div id="joinus-detail">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="section1"><img :src='require("../../assets/images/joinus/join.jpg")' alt=""></div>
      <div class="section2" v-if='info !={}'>
        <p class="s2-title" ><span class="span1">All jobs</span> &gt; <span class="span2">{{info.position}}</span></p>
        <div class="s2-text">
          <h2>{{info.position}}</h2>
          <div class="s2-div s2-map flex"><img :src='require("../../assets/images/joinus/join-map.png")' alt=""><span>{{info.workPlace}}</span></div>
          <div class="s2-div s2-email flex">
            <div class="flex"><img :src='require("../../assets/images/joinus/join-email.png")' alt=""><a href="mailto:jobs@happyeasygo.com">{{info.contactEmail}}</a></div>
            <span>Posted: {{info.startTime}}</span>
          </div>
        </div>
      </div>
      <div class="section3 flex">
        <a target="_blank" :href="shareHref[0]"><img :src='shareList[0]' alt=""></a>
        <a target="_blank" :href="shareHref[1]" ><img :src='shareList[1]' alt=""></a>
        <a target="_blank" :href="shareHref[2]"><img :src='shareList[2]' alt=""></a>
        <a target="_blank" :href="shareHref" data-action="share/whatsapp/share"><img :src='shareList[3]' alt=""></a>
        <div>
          <img :src='shareList[4]' alt="Copy to clipboard">
          <input id="foo" v-model="text" style="position:absolute;opacity:0;">
          <button id="copyUrl" @click="shareUrl" data-clipboard-target="#foo"></button>
        </div>
      </div>
      <ul class="section4" v-if='info !={}'>
        <li v-html="info.jobDescription">
          {{info.jobDescription}}
        </li>
        <li v-html="info.workRequirements">
          {{info.workRequirements}}
        </li>
      </ul>
      <div class="section5">
        <a href="javascript:;" @click="applyNow">APPLY NOW</a>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
import { Toast, Indicator } from "mint-ui";
// import { CookieUtil } from "Models/utils";
// import { DomainManager } from '../../config/DomainManager';
import Clipboard from 'clipboard';
export default {
  components: {
    headTop
  },
  data(){
    return {
      info:{
        id:1,departmentName:"Product Manager",contactEmail:"878@qq.com",
        createTime:1531366042000,position:"shanghai",workPlace:"minxingqu",
        jobDescription:'Responsible for collecting data,checkingerrors & reports defects to management.',
        workRequirements:'2 yrs-6 yrs exp in related industry.',
      },
      text:'',
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      shareList:[
        require("../../assets/images/joinus/share-f.png"),
        require("../../assets/images/joinus/share-b.png"),
        require("../../assets/images/joinus/share-in.png"),
        require("../../assets/images/joinus/share-w.png"),
        require("../../assets/images/joinus/share-l.png")
      ],
      shareHref:[
        'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent('HappyEasyGo is recruiting now. Lots of positions await for you.'),
        'https://twitter.com/home?status='.concat(encodeURIComponent(location.href)).concat(' ') .concat(encodeURIComponent('title=HappyEasyGo is recruiting now. Lots of positions await for you.')),
        'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(location.href)+'&title=HappyEasyGo is recruiting now. Lots of positions await for you.',
        'whatsapp://send?url='+location.href+'&text=HappyEasyGo is recruiting now. Lots of positions await for you.',
      ],
    }
  },
  created() {
    let timer1 = new Date(this.info.createTime);
    let startTime = this.addZero(timer1.getDate())+' '+ this.months[timer1.getMonth()]+','+ timer1.getFullYear();
    this.$set(this.info,'startTime',startTime);
    // this.getListsInfo();
  },
  mounted() {
    this.text = location.href;
  },
  methods:{
    applyNow(){
      this.$router.push("/careers");
    },
    shareUrl(){
      let clipboard = new Clipboard('#copyUrl');
      clipboard.on('success', function(e) {
          Toast({
            message:"Successfully copied to the Clipboard! ",
            duration:1200
          });
          e.clearSelection();
      });
      clipboard.on('error', function(e) {
          Toast({
            message:"Copy failed, please select Copy manually! ",
            duration:1200
          });
      });
    },
    getListsInfo(){
      Indicator.open({spinnerType: "fading-circle"});
      let id = this.$route.query.id;
      // let url = DomainManager.getCareerDetail() +'?id='+ id;
      this.$axios.get(url).then(res=>{
        if(res.succ){
          Indicator.close();
          this.info = res.data;
          let timer1 = new Date(res.data.createTime);
          let startTime = this.addZero(timer1.getDate())+' '+ this.months[timer1.getMonth()]+','+ timer1.getFullYear();
          this.$set(this.info,'startTime',startTime);
        }
      }).catch(err =>{
        console.log(err)
      })
    },
    addZero(time){
      if(time < 10){
        return '0'+time;
      }else{
        return time;
      }
    }
  }
}
</script>
<style lang="less" scoped>
#joinus-detail{
  #header {
    background: #0b9d78;
    .title {
      color: #fff;
      font-size: 0.768rem;
    }
    .sp {
      opacity: 0;
    }
  }
  .content{
    padding:0.5rem 0 0.2rem;
    .section1{
      img{
        width: 100%;
        height:100%;
      }
    }
    .section2{
      padding:0 0.2rem;
      text-align: left;
      .s2-title{
        padding:0.12rem 0 0.23rem;
        color:#333;
        font-size:0.14rem;
        .span1{color:#0b9d78;}
      }
      .s2-text{padding-bottom:0.12rem;}
      .s2-text h2{font-size:0.18rem;color:#333;padding-bottom:0.12rem;}
      .s2-div{
        align-items: center;
        font-size:0.14rem;
        color:#999;
        padding-bottom:0.07rem;
        img{vertical-align: middle;}
      }
      .s2-map img{
        width: 0.14rem;
        height:0.17rem;
        margin-right:0.13rem;
      }
      .s2-email{
        justify-content: space-between;
        div a{color:#0c9d77;}
        span{color:#333;}
      }
      .s2-email img{
        width:0.17rem;
        height: 0.14rem;
        margin-right: 0.1rem;
      }
    }
    .section3{
      padding:0.25rem 0;
      margin:0 0.2rem;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      a{
        margin-right:0.15rem;
        font-size: 0;
        img{
          width:0.37rem;
          height:0.4rem;
        }
      }
      div{
        position: relative;
        font-size: 0;
        img{
          width:0.37rem;
          height:0.4rem;
        }
        button{
          width:0.37rem;
          height:0.4rem;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          z-index: 5;
        }
      }
    }
    .section4{
      padding:0 0.2rem;
      li{
        padding:0.23rem 0 0.05rem;
        text-align: left;
        font-size:0.14rem;
        color:#999;
      }
      li:nth-child(2){padding-top:0.12rem;}
    }
    .section5{
      a{
        width:3rem;
        padding:0.1rem 0;
        font-size:0.16rem;
        background:#0c9d77;
        color:#fff;
        margin:0.23rem auto 0;
        border-radius:3px;
      }
    }
  }
}
</style>
