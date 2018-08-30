<template>
  <div id="PDF">
    <div class="pdfBtn" v-show="!PDFShow">
      <head-top id="header">
        <i slot="left" class="iconfont icon-back"></i>
        <span slot="title">szjSmiling</span>
        <i slot="right" class="iconfont icon-file" @click="$router.push('/activity')"></i>
      </head-top>
      <div><img src="../../assets/images/logo.png"></div>
      <mt-button @click.native="handleClick" type="danger">
        <i class="iconfont icon-wenjian"></i>
        跳转到PDF
      </mt-button>
      <!-- <foot-end></foot-end> -->
    </div>
    <pdf v-show="PDFShow" @close="closeBox"></pdf>
    <pagination v-if="orderList.length != 0" :pagination="pagination" @currentPageData="currentPageData"></pagination>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import footEnd from "@/components/foot/footer.vue";
import pdf from "@/components/pdf.vue";
import pagination from "@/components/pagination/pagination.vue";
import { Indicator,Toast } from "mint-ui";
export default {
  components: {
    headTop,
    footEnd,
    pdf,
    pagination,
  },
  data() {
    return {
      orderList:[],
      pagination:{},
      PDFShow: false,
      orderObj:{
        status:'To be paid',
        pageNum:1,
        pageSize:8,
      },
      loadType: ["fading-circle", "snake", "double-bounce", "triple-bounce"]
    };
  },
  created() {},
  mounted() {
    this.pages();
  },
  methods: {
    pages(){
      this.orderList = [{id:1}];
      this.pagination = Object.assign({}, this.pagination, {//   添加多个属性方法
        totalSize: 15,
        pageSize:2
      });
    },
    handleClick() {
      let type = Math.floor(Math.random()*4);
      Indicator.open({
        text: "加载中...",
        spinnerType: this.loadType[type]
      });
      setTimeout(() => {
        Indicator.close();
        this.PDFShow = true;
      }, 1000);
    },
    closeBox(data) {
      this.PDFShow = data;
    },
    currentPageData(data){
      this.orderObj.pageNum = data;
      console.log(data);
    },
  }
};
</script>
<style lang="less" scoped>
#PDF {
  background: #eee;
  .pdfBtn{
    padding-top:0.5rem;
  }
}
</style>
