<template>
  <div>
    <div style="font-size:0.16rem;text-align:center">仿点餐demo</div>
    <div class="Box_catering">
      <div class="dalei">
        <div class="detail_list"  v-for="(item,key) of dalei" @click="Bind_list(key)" :key="key" >{{item.name}}</div>
      </div>
      <ul class="Ouli">
        <li v-if="item.id == valueId" v-for="(item,key) of detail" :key="key">
          <img class="detail_img" :src="item.img" alt="">
          <p>{{item.dit}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import child from './child'  //引入child组件

export default {
  name: "HelloWorld",
  data() {
    return {
      list: [
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        },
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        },
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        },
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        },
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        },
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        },
        {
          name: "展会设计师",
          xinzi: "5k-10k",
          img: "",
          detail: "这是一个很重要的岗位"
        }
      ],
      lidt: [],
      // lidt: [
      //   { img: require("../assets/123.jpg") },
      //   { img: require("../assets/123.jpg") },
      //   { img: require("../assets/123.jpg") },
      //   { img: require("../assets/123.jpg") },
      //   { img: require("../assets/123.jpg") },
      //   { img: require("../assets/123.jpg") }
      // ],
      detail: [],
      dalei: [
        { name: "招牌菜", id: "111", color: "false" },
        { name: "面试", id: "112", color: "false" },
        { name: "小吃", id: "113", color: "false" },
        { name: "甜品", id: "114", color: "false" },
        { name: "饮品", id: "115", color: "false" }
      ],
      bb: "",
      sess: "123",
      valueId: ""
    };
  },
  //  components: {
  //           child
  //       },
  created() {
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r) {
    //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //     console.log("您的位置：" + r.point.lng + "," + r.point.lat);
    //   } else {
    //     alert("failed" + this.getStatus());
    //   }
    // });

    window.onscroll = function() {
      //  console.log(window.innerHeight)
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        console.log("下拉加载区域");
      }
    };
  },
  mounted() {
    this.Ajax();
  },
  methods: {
    Ajax() {
      // this.$axios.get("").then(res => {
      //   console.log(res);
      // });
    },
    dianji(id) {
      var that = this;
      that.$router.push({ path: "/index", query: { id: id } });
      console.log(this.sess);
      // sessionStorage用法
      //  sessionStorage.setItem("key", this.sess)
    },
    Bind_list(id) {
      $(".dalei div").eq(id).addClass("active").siblings().removeClass("active");
    }
  }
};
</script>

<style scoped lang="less">
.dalei {
  font-size: 0.18rem;
  .active {
    color: #f00;
  }
}
</style>
