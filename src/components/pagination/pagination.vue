<template>
  <div id="page-bar">
    <ul>
      <li class="pre" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
      <li class="pre" v-if="cur==1"><a class="banclick">上一页</a></li>
      <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}" :key="index.active">
          <a v-on:click="btnClick(index)">{{ index }}</a>
      </li>
      <li class="next" v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
      <li class="next" v-if="cur == all"><a class="banclick">下一页</a></li>
      <li class="total"><a>共<i>{{all}}</i>页</a></li>
    </ul>
</div>
</template>
<script>
export default {
  props:["pagination"],
  data() {
    return {
      all: 1, //总页数
      cur: 1 //当前页码
    };
  },
  watch: {
    cur: function(oldValue, newValue) {
      // console.log(arguments);
      // console.log(this.pagination)
    }
  },
  methods: {
    btnClick: function(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      this.$emit('currentPageData',this.cur);
    },
    pageClick: function() {
      this.$emit('currentPageData',this.cur);
    }
  },
  updated() {
    
    
  },
  mounted () {
    console.log(this.pagination)
    this.all = Math.ceil(this.pagination.totalSize / this.pagination.pageSize);
  },
  computed: {
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  }
};
</script>
<style lang="less" scoped>
#page-bar {
  width: 100%;
  height: 0.5rem;
  background: #fff;
  position: fixed !important;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
  ul {
    margin-top:0.11rem;
    display:flex;
    align-items: center;
    justify-content: center;
    li:first-child > a {
      margin-left: 0px;
    }
    a {
      border: 1px solid #ddd;
      text-decoration: none;
      position: relative;
      float: left;
      width: 0.35rem;
      padding:0.05rem 0;
      color: #337ab7;
      font-size:0.16rem;
      cursor: pointer;
    }
    li.pre a,li.next a,li.total a{
      width:auto;
      height:auto;
      padding:0.05rem 0.05rem;
    }
    a:hover {
      background-color: #eee;
    }
    li:last-child a{background: #fff;}
    a.banclick {
      cursor: not-allowed;
    }
    .active a {
      color: #fff;
      cursor: default;
      background-color: #337ab7;
      border-color: #337ab7;
    }
    i {
      font-style: normal;
      color: #d44950;
      margin: 0px 4px;
      font-size: 12px;
    }
  }
}
</style>
