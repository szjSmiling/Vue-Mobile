<template>
	<div class="header flex space-between" v-if="showHeader">
		<div class="head-ico head-ico1 flex align-items-center" @click="navigate">
			<slot name="left"></slot>
		</div>
		<div class="head-title flex align-items-center" @click="navigate1">
			<slot name="title"></slot>
		</div>
		<div class="user head-ico flex align-items-center content-end">
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
.header {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  position: fixed;
  top: 0;
  z-index: 10;
  background: #0b9d78;
  .title {
    color: #fff;
  }
  .head-ico {
    width: 0.6rem;
    i {
      padding: 0 0.2rem;
      color: #fff;
      display: block;
      font-size: 0.2rem;
      line-height: 0.5rem;
    }
  }
  .user {
    line-height:0.5rem;
    i {
      padding: 0 0.2rem;

      color: #fff;
    }
    img {
      padding: 0.2rem;
      width: 0.8rem;
      flex: 0 0 0.5rem;
      display: block;
    }
  }
  .head-title {
    font-size: 0.22rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #fff;
    // margin-left: -0.5rem;
  }
}
</style>