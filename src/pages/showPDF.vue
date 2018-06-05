<template>
  <div id="PDF">
    <div>
      <h2>PDF文件的预览</h2>
    </div>
    <div><img src="../assets/logo.png"></div>
    <mt-button @click.native="handleClick">跳转到PDF</mt-button>
    <pdf v-show="PDFShow"></pdf>
  </div>
</template>
<script>
import pdf from '@/components/pdf.vue';
export default {
  components: {
		pdf,
	},
	data () {  
    return {  
      PDFShow:false,
    }
	}, 
	created() {  
  	let pdfUrl = window.location.href
    if(pdfUrl.indexOf('/agreement') == -1){
      this.PDFShow = false;
    }else{
      this.PDFShow = true;
    }
	}, 
  methods:{

  }
}
</script>
<style lang="less" scoped>

</style>
