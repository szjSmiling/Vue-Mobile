<template>
  <div id="PDF">
    <div v-show="!PDFShow">
      <div class="header">
        <mt-button icon="back" @click="($router.go(-1))"></mt-button><mt-button icon="more"></mt-button>
      </div>
      <div><img src="../assets/logo.png"></div>
      <mt-button @click.native="handleClick" type="danger">
        <i class="iconfont icon-wenjian"></i>
        跳转到PDF</mt-button>
    </div>
    <pdf v-show="PDFShow" @close="closeBox"></pdf>
  </div>
</template>
<script>
import {Indicator} from 'mint-ui';
import pdf from '@/components/pdf.vue';
export default {
  components: {
		pdf,
	},
	data () {  
    return {  
      PDFShow:false,
      type:'fading-circle',
      typelist:['fading-circle','snake','double-bounce','triple-bounce']
    }
	}, 
	created() {  
  	
	}, 
  methods:{
    handleClick(){
      Indicator.open({
        text:"加载中...",
        spinnerType:this.typelist[Math.random(0,3)]
      });
      setTimeout(()=>{
        Indicator.close();
        this.PDFShow = true;
      },1000);
    },
    closeBox(data){
      this.PDFShow = data;
    },
  }
}
</script>
<style lang="less" scoped>
#PDF{
  .header{
    display:flex;
    justify-content: space-between;
  }
}
</style>
