<template>
  <div id="my-dialog">
    <div class="shareCover" v-show="upDataDialog" @click="clickOut"></div>
    <div class="upDataDiaplog" v-show="upDataDialog">
      <p class="up-p1"><span>The Autumn Season Sale</span> is <span>LIVE</span> on the new version of HEG App!!! </p>
      <p class="up-p2">Update Now and <span>shake</span> your phone to Win <span>EXCLUSIVE Prizes</span>!</p>
      <a :href="device.href" target="_blank" @click="upDateApp">update</a>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      upDataDialog:false,
      device:{href:'javascript:;'},
    }
  },
  methods: {
    clickOut(){
      this.upDataDialog = false;
    },
    upDateApp(){
      this.upDataDialog = false;
    },
  }
}
</script>

<style lang="less" scoped>
#my-dialog{
  .shareCover{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    background: rgba(0,0,0,0.5);
  }
  .upDataDiaplog{
    width:11rem;
    height:8rem;
    background: #FAFAFA;
    border-radius: 3px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    z-index: 12;
    padding:2rem 1rem 1rem;
    p{
      color:#333;
      font-size:0.68rem;
      line-height:1rem;
      span{
        font-weight:bold;
      }
    }
    .up-p1{font-style:italic;}
    .up-p2{
      margin:1rem 0 0;
      padding-bottom:1rem;
      border-bottom:1px solid #999;
    }
    a{
      color:#fff;
      background:#ffad3d;
      font-size:0.68rem;
      width:8rem;
      height:1.3rem;
      line-height:1.3rem;
      border-radius: 3px;
      margin-top:0.5rem;
    }
  }
}
</style>
