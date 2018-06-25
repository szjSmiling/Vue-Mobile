<template>
  <div id="gameIntroduce">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back" ></i>
      <p slot="title">Details</p>
    </head-top>
    <div class="content" v-show="isShow">
      <section>
        <h5>Play the lottery and stand the chance to win amazing prize.</h5>
        <ol class="prizeType">Lottery Prize:
          <li><span>1st Prize:</span>Xiao Mi, IPhone, Red Note or Vivo?</li>
          <li><span>2nd Prize:</span>Hotel Voucher of 2-Night stay in 5-star hotel</li>
          <li><span>3rd Prize:</span>Free Flight Tickets</li>
          <li><span>4th Prize:</span>Voucher of Rs.500</li>
          <li><span>5th Prize:</span>Gifts from our Bd partners</li>
        </ol>
        <ul class="getChances">
          You can earn more chances to play lottery by:
          <li><span>·</span>Book a flight during anniversary campaign and you’ll get 3 chances to participate in Lottery.</li>
          <li><span>·</span>Open and sign in HEG App once a day, you’ll get 1 chance to participate in the lottery. Open & sign in HEG app regularly for 7 days and you‘ll definitely win HEG gift.</li>
          <li><span>·</span>Synchronize your contacts on HEG App and you will get 2 chances to participate in the lottery. </li>
          <li><span>·</span>Refer your friends to sign up HEG app, you will get 1 chance to participate once your friend completes to download and register on HEG app.</li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
import {Toast,Indicator} from 'mint-ui';
export default {
  components:{
    headTop,
  },
  data(){
    return{
      isShow:true,
    }
  },
  created(){
    this.getInfo();
  },
  methods:{
    getInfo(){
      this.isShow = false;
      setTimeout(()=>{
        this.isShow = true;
        Indicator.close();
      },500)
    }
  } 
}
</script>
<style lang="less" scoped>
#gameIntroduce{
  .header {
    background: #0b9d78;
    p{margin-left:-0.5rem;}
  }
  .content{
    padding:0.7rem 0.15rem 0.5rem;
    text-align: left;
    ol{list-style-type: none;}
    ul{list-style-type: disc;}
    h5{
      font-size:0.18rem;
      font-weight:bold;
      line-height:0.2rem;
    }
    .prizeType{
      font-size:0.16rem;
      padding:0.15rem 0;
      li{
        line-height: 0.25rem;
        span{margin-right:0.05rem;}
      }
      li:nth-child(1){margin-top:0.15rem;}
    }
    .getChances{
      font-size:0.16rem;
      li span{display:none;}
      li{
        margin-left:0.15rem;
        margin-top:0.15rem;
        line-height: 0.2rem;
      }
    }
  }
}
</style>
