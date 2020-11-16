<template>
	<div class="new-header flex space-between" v-if="showHeader">
		<div class="new-header_left" @click="navigate">
      <slot name="left"></slot>
    </div>
    <div class="new-header_title" @click="navigate1">
      <slot name="title"></slot>
    </div>
    <div class="new-header_right">
      <slot name="right"></slot>
    </div>
	</div>
</template>
<script>
export default {
  props: {
    operate: {
      type: [Function, Object],
      default: null
    },
    operate1: {
      type: [Function, Object],
      default: null
    },
  },
  data() {
    return {
      timer:null,
      showHeader: true,
      navigate: null,
      navigate1: null,
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    backTop(){
      let that = this;
      cancelAnimationFrame(this.timer);
      this.timer = requestAnimationFrame(function fn() {
        let oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        let oHeight = document.getElementById("header").clientHeight;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - oHeight;
          that.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(that.timer);
        }
      });
    }
  },
  created() {
    this.navigate = this.operate || this.goback;
    this.navigate1 = this.operate1 || this.backTop;
  },
};
</script>
<style lang='less' scoped>
.new-header{
  box-sizing: border-box;
  width: 100%;
  color: #111;
  height: 2.4rem;
  line-height: 2.4rem;
  background: #fff;
  box-shadow: 1px 0 5px rgba(0,0,0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
.new-header_title{
  width: 100%;
  text-align: center;
}

.newHeaderSide () {
  padding: 0 1rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.new-header_left{
  .newHeaderSide();
  left: 0;
}
.new-header_right{
  .newHeaderSide();
  right: 0;
}
</style>