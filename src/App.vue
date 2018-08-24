<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  created: function() {
    console.log("the hook of created is done!");
  },
  mounted: function() {
    console.log("the hook of mounted is done!");
  },
  activated: function() {
    console.log("the hook of activated is done!");
  },
  deactivated: function() {
    console.log("the hook of deactivated is done!");
  }
};
</script>
<style lang="less">
@import "./assets/css/common.css";
@import "./assets/css/reset.css";

#app {
  font-family: Helvetica, Arial, sans-serif, "Avenir";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // height: inherit;
}

@font-face {
  font-family: "WebRupee";
  src: url("./assets/font/WebRupee.V2.0.ttf");
}

#app,#app > div {
  height: 100%;
}

.rs {
  font-family: "WebRupee";
  font-weight: normal;
  margin-right: 0.2em;
}
img{vertical-align: top;}
h1,
h2 {
  font-weight: normal;
  font-size:0.2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

input,
select {
  border: none;
  border-radius: 4px;
}
.picker-toolbar{
  font-size:0.2rem;
  height:0.3rem;
  line-height:0.3rem;
  color: #f655f6;
}
.mt-range-progress {
  background-color: #ffad3d !important;
}
.mint-indicator-wrapper{
  line-height: 0;
}
.mint-indicator-text {
  color: #ffad3d !important;
  font-size: 0.16rem !important;
  line-height:0.2rem;
}

.mint-popup {
  border-radius: 0.04rem;
  font-size: 0.18rem;
  padding: 0.1rem;
  border: 1px solid #eee;
}

.mint-indicator {
  position: fixed;
  z-index: 20;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.mint-radio-input:checked + .mint-radio-core {
  background-color: #fff !important;
  border-color: #ccc !important;
}

.mint-radio-input:checked + .mint-radio-core::after {
  background-color: #ffa033 !important;
}

.mint-radiolist,
.mint-cell-wrapper,
.mint-radiolist-label {
  padding: 0 !important;
}

.mint-radio-label {
  font-size: 0.16rem;
}

.swiper-slide {
  width: 100% !important;
}

.mint-loadmore{
  .mint-loadmore-top{
    font-size:0.2rem;
  }
  .mint-loadmore-bottom{
    font-size:0.2rem;
  }
}

</style>
