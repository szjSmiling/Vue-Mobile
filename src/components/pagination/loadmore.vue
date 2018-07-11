<template>
<div>
<section class="listMenu">
<section v-show='nodata' class="reportList" ref="reportList">
<v-loadmore
:bottom-method="loadBottom"
:top-method="loadTop"
:bottom-all-loaded="allLoaded"
:bottomPullText='bottomPullTextVal'
:bottomDropText='bottomDropTextVal'
:bottomLoadingText='bottomLoadingTextVal'
:topPullText='topPullTextVal'
:topDropText='topDropTextVal'
:topLoadingText='topLoadingTextVal'
:autoFill="false"
@bottom-status-change="handleBottomChange"
@top-status-change="handleTopChange"
ref="loadmore">
<ul class='ulcont' ref="reportList">
<li v-for="(item,index) in reportList" v-cloak :key="index">

</li>
</ul>
</v-loadmore>
</section>
</section>
</div>

</template>



<script>
import { Loadmore } from "mint-ui";
export default {
  name: "",
  data() {
    return {
      nodata:true,
      listDetailHos: [],
      reportList:[],
      searchCondition: {
        pageVal: "0",
        pageSize: "10"
      },
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉
      status: "",
      bottomPullTextVal: "上划加载更多数据",
      bottomDropTextVal: "释放更新",
      bottomLoadingTextVal: "加载中...",
      topPullTextVal: "下拉加载更多数据",
      topDropTextVal: "释放更新",
      topLoadingTextVal: "加载中...",
      topStatus: "",
      bottomStatus: ""
    };
  },
  components: {
    "v-loadmore": Loadmore
  },
  mounted() {
    this.$nextTick(() => {
      let h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.$refs.reportList.style.height = h + "px";
    });
  },
  methods: {
    //获取报告列表
    GetList() {
      //报告列表
      if (this.searchCondition.pageVal == 0) {
        //加载报告列表
        this.$http.post(url,{
              Pageindex: this.searchCondition.pageVal,
              PageSize: this.searchCondition.pageSize
            },
            { emulateJSON: true, headers: {} }
        ).then(data => {
              if (data.body.Data.length == 0) {
                this.nodata = false;
              } else if (
                data.body.Data.length == this.searchCondition.pageSize
              ) {
                this.reportList = data.body.Data;
              } else {
                this.reportList = data.body.Data;
                this.allLoaded = true;
              }
            },err => {
              console.log("error" + err);
            }
          );
      } else {
        //加载报告列表
        this.$http.post(url,
            {
              Pageindex: this.searchCondition.pageVal,
              PageSize: this.searchCondition.pageSize
            },
            { emulateJSON: true, headers: {} }
          )
          .then(
            data => {
              if (data.body.Data.length == this.searchCondition.pageSize) {
                for (var i = 0; i < this.searchCondition.pageSize; i++) {
                  this.reportList.push(data.body.Data[i]);
                }
              } else {
                for (var i = 0; i < data.body.Data.length; i++) {
                  this.reportList.push(data.body.Data[i]);
                }
                this.allLoaded = true;
              }
            },
            err => {
              console.log("error" + err);
            }
          );
      }
    },
    //上拉加载
    loadBottom() {
      this.searchCondition.pageVal++;
      this.$refs.loadmore.onBottomLoaded();
      this.GetList();
    },
    //下拉刷新
    loadTop() {
      this.allLoaded = false;
      this.searchCondition.pageVal = 0;
      this.$http
        .post(
          url,
          {
            Pageindex: this.searchCondition.pageVal,
            PageSize: this.searchCondition.pageSize
          },
          { emulateJSON: true, headers: {} }
        )
        .then(
          data => {
            this.reportList = data.body.Data;
            this.$refs.loadmore.onTopLoaded();
          },
          err => {
            console.log("error" + err);
          }
        );
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    }
  }
};
</script>
<style scoped lang='less'>
</style>