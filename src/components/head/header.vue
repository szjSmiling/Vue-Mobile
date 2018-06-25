<template>
	<div class="header flex space-between" v-if="showHeader">
		<div class="head-ico flex align-items-center" @click="goback">
			<slot name="left"></slot>
		</div>
		<div class="head-title flex align-items-center">
			<slot name="title"></slot>
		</div>
		<div class="user head-ico flex align-items-center content-end">
			<slot name="right"></slot>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      showHeader: true
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
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
    font-size: 0.25rem;
    color: #fff;
  }
  .head-ico {
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
    font-size: 0.25rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #fff;
    margin-left: -0.5rem;
  }
}
</style>