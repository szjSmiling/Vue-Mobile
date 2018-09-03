<template>
  <div id="shoplist4">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Shopping</span>
      <i slot="right" class="iconfont icon-cart" ></i>
    </head-top>
    <div class="shop-content">
      <div class="projectTitle">
        <div class="selectDiv">
          <div v-for="(v,i) in selectText" :key="i" :class="[i==selectIndex ? 'selectItem selected' : 'selectItem']" @click="changeNavigation(i)">
            <span>{{v}}</span>
            <i class="icon iconfont icon-down"></i>
          </div>
        </div>
      </div>
      <div class="ulDiv" >
        <ul class="projectUl"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          :infinite-scroll-immediate-check="true"
          infinite-scroll-distance="10">
          <li class="projectLi" v-for="(v,i) in list" :key="i" @click="toProjectDetail(v)">
            <div class="liDes">
              <p class="title">{{v.contract_name}}</p>
              <p class="titleDes">描述信息</p>
            </div>
            <i class="icon iconfont icon-jiantou"></i>
          </li>
        </ul>
        <!--显示加载中转菊花-->
        <div class="loading-box tc" v-if="isLoading">
          <mt-spinner type="fading-circle" class="loading-more"></mt-spinner>
          <span class="loading-more-txt">加载中</span>
        </div>
        <div class="no-more" v-if="noMore">没有更多了~</div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from 'Components/head/header.vue';
import { Toast } from "mint-ui";
export default {
  name: "Project",
  components: {
    headTop,
  },
  data() {
    return {
      selectText: ["待施工", "施工中", "已完工"],
      selectIndex: 0, // 默认施工中
      list: [],
      isLoading: false, // 加载中转菊花
      isMoreLoading: true, // 加载更多中
      noMore: false, // 是否还有更多
      pageInfo: {
        // 分页信息
        page: 1,
        page_size: 15,
        total: 0, // 总条数
        totalPage: 1 // 总分页数
      }
    };
  },
  mounted() {
    this.getProjectInfo();
  },
  methods: {
    toProjectDetail(who) {
      // 跳转项目详情页
      console.log(who);
    },
    changeNavigation(index) {
      // 切换标签页
      this.isMoreLoading = true;
      this.selectIndex = index;
      this.pageInfo.page = 1; // 初始化
      this.pageInfo.totalPage = 1;
      this.list = [];
      this.noMore = false;
      this.getProjectInfo();
    },
    getProjectInfo(type) {
      // 获取项目列表
      let _this = this;
      this.isLoading = true;
      // this.$http.get("/api/steward/projects", {
      //   params: {
      //     status: _this.selectIndex,
      //     current_page: _this.pageInfo.page,
      //     per_page: _this.pageInfo.page_size
      //   }
      // })
      // .then(res => {
      //   let datas = res.data;
      //   if (datas.code === 0) {
      //     if (type === "loadMore") {
      //       this.list = this.list.concat(datas.data.data);
      //     } else {
      //       this.list = datas.data.data;
      //     }
      //     // 设置分页
      //     this.pageInfo.total = datas.data.total;
      //     this.pageInfo.totalPage = Math.ceil(
      //       this.pageInfo.total / this.pageInfo.page_size
      //     );
      //     console.log(
      //       "总页数",
      //       Math.ceil(this.pageInfo.total / this.pageInfo.page_size)
      //     );
      //   } else {
      //     Toast({
      //       message: datas.msg,
      //       duration: 2000
      //     });
      //   }
      //   this.isLoading = false;
      //   this.isMoreLoading = false;
      // });
    },
    loadMore() {
      // 加载更多
      this.pageInfo.page += 1; // 增加分页
      this.isMoreLoading = true; // 设置加载更多中
      this.isLoading = true; // 加载中
      console.log(this.pageInfo.page, this.pageInfo.totalPage);
      if (this.pageInfo.page > this.pageInfo.totalPage) {
        // 超过了分页
        this.noMore = true; // 显示没有更多了
        this.isLoading = false; // 关闭加载中
        return false;
      }
      // 做个缓冲
      setTimeout(() => {
        this.getProjectInfo("loadMore");
      }, 100);
    },
    
  }
};
</script>
<style lang="less" scoped>
#shoplist4 {
  .shop-content{padding-top: 0.5rem;}
  .projectTitle {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
    background-color: #ffffff;
    border-bottom: 1px solid #dddddd;
    .selectDiv {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .selectItem {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-direction: column;
        // box-sizing: border-box;
        &:nth-child(1) {
          width: 33.5%;
          border-right: 1px solid #dddddd;
        }
        &:nth-child(2) {
          width: 33.5%;
          border-right: 1px solid #dddddd;
        }
        &:nth-child(3) {
          width: 33%;
        }
        .iconfont {
          
        }
      }
      .selected {
        color: #c6af6c;
      }
    }
  }
  .ulDiv {
    padding: 0.5rem 0 0.94rem 0;
    .projectUl {
      padding: 0 0 0 0.4rem;
      .projectLi {
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:not(:last-child) {
          border-bottom: 0.01rem solid #dddddd;
        }
        .liDes {
          width: 90%;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .title {
            color: #000000;
            line-height: 0.4rem;
            font-size: 0.18rem;
          }
          .titleDes {
            color: #999999;
            line-height: 0.4rem;
            font-size: 0.18rem;
          }
        }
        .iconfont {
          font-size:0.18;
          color: #999999;
        }
      }
    }
    // 加载中。。。
    .loading-box {
      padding: 0.1rem 0;
      .loading-more {
        vertical-align: middle;
      }
      .loading-more-txt {
        vertical-align: middle;
        font-size: 0.18rem;
      }
      .loading-more-txt::after{
        display: inline-block;
        content:"...";
        transform: translateY(-0.05rem);
      }
    }
    .no-more {
      color: #f00;
      font-size: 0.16rem;
      padding: 0.1rem 0 0.2rem;
    }
  }
}
</style>
