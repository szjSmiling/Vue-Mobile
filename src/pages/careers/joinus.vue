<template>
  <div id="joinus">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="section1"><img :src='require("../../assets/images/joinus/join.jpg")' alt=""></div>
      <div class="section2" v-for="item in text" :key="item.cid">
        <h2>{{item.class}}</h2>
        <p v-for="(i,j) in item.content" :key="j" v-html="i.content">{{i.content}}</p>
      </div>
      <div class="section3">
        <div class="s3-box" ref="s3Box" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' >
          <div><img :src='require("../../assets/images/joinus/heg-1.png")' alt=""></div>
          <div><img :src='require("../../assets/images/joinus/heg-2.png")' alt=""></div>
          <div><img :src='require("../../assets/images/joinus/heg-3.png")' alt=""></div>
        </div>
      </div>
      <div class="section4">
        <div v-for="item in lists" :key="item.id">
          <h3>{{item.departmentName}}</h3>
          <div v-for="i in item.joinUsMessages" :key="i.id" @click="jumpDetail(i.position,i.id)">
            <p>{{i.position}}</p>
            <p>{{i.workPlace}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
import { Toast, Indicator } from "mint-ui";
// import { DomainManager } from "../../config/DomainManager";
export default {
  components: {
    headTop,
  },
  data() {
    return {
      startX: 0, //开始触摸的位置
      moveX: 0, //滑动时的位置
      endX: 0, //结束触摸的位置
      disX: 0,//移动距离
      left:30,
      text: [
        {cid:119,class:"Join the craziness with HappyEasyGo",content:[
          {content:"In the history of From going to the Travel Shop for Air Tickets, Hotel Booking & Travel Package to the days of making enquiry on the land line phone or a mobile phone to a travel shop and moving to the fax era & finally, landing on the internet platform. Travel industry has gone through a tremendous technical advance. We developed Happy Easy Go, because we are just like you who have long become online shoppers and always enjoyed discounting."},
          {content:"Go is dedicate to provide the best fares available in the marketplace. Our team consists of the most experienced and customer centric travel experts that will ensure a happy and easy experience for our customers."},
        ]},
      ],
      lists: [
        {id:1,departmentName:"Product Manager",joinUsMessages:[
          {id:11,position:"shanghai",workPlace:"minxingqu",}
        ]},
        {id:2,departmentName:"Front-End Technician",joinUsMessages:[
          {id:12,position:"shanghai",workPlace:"baoshanqu",}
        ]},
        {id:3,departmentName:"Java Development",joinUsMessages:[
          {id:13,position:"shanghai",workPlace:"yangpuqu",}
        ]},
      ],
    };
  },
  created() {
    this.getTextInfo().then(res => {
      // this.getListsInfo();
    });
  },
  methods: {
    touchStart: function(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.touches.length == 1) {
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = ev.touches[0].clientX; // 记录开始位置
      }
    },
    touchMove(ev) {
      ev = ev || event;
      if (ev.touches.length == 1) {
        //滑动时距离浏览器左侧的距离
        this.moveX = ev.touches[0].clientX;
        //实时的滑动的距离-起始位置=实时移动的位置
        this.disX = this.moveX - this.startX;
        if(this.disX > 0 ){
          this.left -= 4;
          if(this.left <= 0){
            this.left = 0;
          }
          this.$refs.s3Box.style.left = -this.left+'%';
        }
      }
    },
    touchEnd: function(ev) {
      ev = ev || event;
    },
    jumpDetail(type, id) {
      // this.$router.push({ path: "/joinus/careersdetail", query: { id: id } });
      this.$router.push({ path: "/careersdetail", query: { id: id } });
    },
    getListsInfo() {
      // let url = DomainManager.getCareerList();
      this.$axios.get(url).then(res => {
        if (res.succ) {
          this.lists = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    async getTextInfo() {
      await new Promise((resolve, reject) => {
        // let url = DomainManager.getFlightFAQS() + "?cId=117";
        // this.$axios.get(url).then(res => {
        //   if (res.success) {
        //     this.text = res.list[0].node;
        //     resolve(res.success);
        //   } else {
        //     reject(res.success);
        //   }
        // }).catch(err => {
        //   console.log(err);
        // });
      });
      return;
    }
  }
};
</script>
<style lang="less" scoped>
#joinus {
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
  .content {
    padding: 0.5rem 0 0.5rem;
    .section1 {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .section2 {
      padding: 0 0.2rem;
      h2 {
        padding: .2rem 0;
        color: #333;
        font-size: 0.18rem;
      }
      p {
        text-align: left;
        color: #666;
        font-size: 0.14rem;
        line-height: .2rem;
      }
      p:last-child {
        padding: 0.15rem 0;
      }
    }
    .section3 {
      width: 100%;
      height: 1.25rem;
      position: relative;
      overflow-x:scroll;background: #eee;
      .s3-box {
        width: 6rem;
        position: absolute;
        display: flex;
        left: -30%;
        div {
          width: 1.95rem;
          font-size: 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        div:nth-child(2) {
          margin: 0 0.1rem;
        }
      }
    }
    .section4 {
      text-align: left;
      padding: 0 0.2rem;
      h3 {
        font-size: 0.18rem;
        color: #333;
        padding: 0.23rem 0 0.11rem;
        border-bottom: 1px solid #ddd;
      }
      p:nth-of-type(n + 1) {
        padding-top: 0.15rem;
        font-size: 0.15rem;
        color: #666;
      }
      p:nth-of-type(odd) {
        color: #0b9d78;
      }
    }
  }
}
</style>
