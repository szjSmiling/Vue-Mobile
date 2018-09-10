<template>
  <div id="heg-autumnrules">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title">Game Rules</p>
    </head-top>
    <div class="content">
      <div class="appTop"></div>
      <div class="part part-top">
        <h4>Game Rules:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
      </div>
      <div class="part part-middle">
        <h4>Terms &amp; Conditions:</h4>
        <ul>
          <li>HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</li>
          <li>Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '../../components/head/header.vue';
export default {
  components:{
    headTop,
  },
  data(){
    return{

    }
  },
  methods:{}
}
</script>
<style lang="less" scoped>
#heg-autumnrules{
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{padding-top:0.5rem;}
  text-align:left;
  .content{
    background:#eee;
  }
  h4{
    font-size:0.16rem;
    color: #111111;
    letter-spacing: 0;
    line-height:0.24rem;
    padding-bottom:0.1rem;
    border-bottom:1px solid #eee;
  }
  .part{
    background:#fff;
    padding:0.15rem 0.15rem 0;
    p,li{
      font-size: 0.14rem;
      color: #111111;
      letter-spacing: 0;
      line-height: 0.24rem;
    }
  }
  .part-top p{padding:0.15rem 0;}
  .part-middle{
    margin-top:0.15rem;
    li{
      padding:0.2rem 0 0;
      list-style-type:disc;
      margin-left:0.15rem;
    }
  }
}
</style>
