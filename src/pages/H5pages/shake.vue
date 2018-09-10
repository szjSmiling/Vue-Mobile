<template>
  <div id="my-shake">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Autum </span>
      <i slot="right" class="icon-right"></i>
    </head-top>
    <div class="content">
      <div class="title-top"></div>
      <h4>手机摇一摇的功能</h4>
      <audio src="http://sc1.111ttt.cn/2015/1/06/27/99271140073.mp3"  ref="shakeAudio">
        您的浏览器不支持 audio 标签。
      </audio>
      <p></p>
    </div>  
  </div>
</template>
<script>
import Shake from 'shake.js';
import { Indicator, Toast } from "mint-ui";
import headTop from "Components/head/header.vue";
export default {
  components:{
    headTop,
  },
  data(){
    return{
      msg:"Welcome to your shake"
    }
  },
  mounted() {
    let myShakeEvent = new Shake({
      threshold:12,
      timeout:500
    });
    myShakeEvent.start();
    window.addEventListener('shake',this.shakeEventDidOccur,false);
  },
  methods:{
    shakeEventDidOccur(){
      let audio = this.$refs.shakeAudio;
      if(window.navigator.vibrate){
        navigator.vibrate(500);
      }
      audio.play();
    },
  }
}
</script>
<style lang="less" scoped>
#my-shake{
  .title-top{padding-top: 0.5rem}
  font-size: 0.2rem;
}
</style>
