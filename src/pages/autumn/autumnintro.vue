<template>
  <div id="heg-autumnintro">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title">Amazing Prizes</p>
    </head-top>
    <div class="content">
      <div class="appTop"></div>
      <ul class="prize-intro">
        <li v-for="(item,index) in lists" :key="index">
          <div class="item-icon">
            <img :src="item.icon" alt="">
            <i class="iconfont icon-doubledown" :class="{isfold:item.flag}" @click="openDetail(item.id)"></i>
          </div> 
          <div class="item-detail" :class="{hasDetail:item.detail}" v-show="item.flag" v-html="item.detail">
            {{item.detail}}
          </div>
        </li>
      </ul>
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
      lists:[
        {id:0,icon:require('../../assets/images/autumn/prize1.png'),title:"Zoomcar Coupon",
          flag:true,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:1,icon:require('../../assets/images/autumn/Group 6 Copy 2.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:2,icon:require('../../assets/images/autumn/Group 6 Copy 3.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:3,icon:require('../../assets/images/autumn/Group 6 Copy 4.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:4,icon:require('../../assets/images/autumn/Group 6 Copy 5.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:5,icon:require('../../assets/images/autumn/Group 6 Copy 6.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:6,icon:require('../../assets/images/autumn/Group 6 Copy 7.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:7,icon:require('../../assets/images/autumn/Group 6 Copy 8.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:8,icon:require('../../assets/images/autumn/Group 6 Copy 9.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:9,icon:require('../../assets/images/autumn/Group 6 Copy 10.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:10,icon:require('../../assets/images/autumn/Group 6 Copy 11.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
        {id:11,icon:require('../../assets/images/autumn/Group 6 Copy 12.png'),title:"Zoomcar Coupon",
          flag:false,detail:'Zoomcar coupons can be used on Zoomcar’s official website <a href="https://goo.gl/f4Eyyo" style="display:inline-block;color:#0b9d78;">(https://goo.gl/f4Eyyo)</a> for a maximum discount of ₹1000 or 20 percent of the booking, whichever is lower.'
        },
      ],
    }
  },
  methods:{
    openDetail(who){
      this.lists[who].flag = ! this.lists[who].flag;
    }
  }
}
</script>
<style lang="less" scoped>
#heg-autumnintro{
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{padding-top:0.5rem;}
  .content{
    text-align:left;
  }
  .prize-intro{
    padding:0.15rem;
    li{
      background: #FAFAFA;
      margin-bottom:0.15rem;
    }
    .item-icon{
      margin-bottom:0.15rem;
      position: relative;
      img{width:100%;}
      i{
        width:95%;
        height:0.35rem;
        line-height:0.35rem;
        position: absolute;
        bottom: 0;
        right: 8px;
        color:#fff;
        font-size:0.2rem;
        text-align:right;
      }
      .isfold{
        transform:rotateX(180deg);
      }
    }
    .item-detail{
      font-size: 0.12rem;
      color: #111111;
      letter-spacing: 0;
      line-height: 0.24rem;
      margin-left:0.05rem;
    }
    .hasDetail{padding-bottom:0.07rem;}
  }
}
</style>
