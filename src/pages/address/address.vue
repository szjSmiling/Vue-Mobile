<template>
  <div id="user-address">
    <head-top id="header" v-show="address.show">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa fa-pencil-square-o" @click="edit"></i>
    </head-top>
    <div class="ad-con" v-show="address.show">
      <div class="ad-detail">
        <div class="ad-left" v-show="datePicker">
          <mt-picker :showToolbar="true" :slots="slots" @change="onValuesChange">吃饭时间</mt-picker>
        </div>
        <div class="ad-center">
          <div class="file-info">
            <div class="file-title flex space-between align-items-center">
              <span>name</span><span>size</span><span>active</span><span>process</span>
            </div>
            <div class="file-text">
              <div class="flex space-between align-items-center" v-for="(item,index) in (files.length > 0?files:file)" :key="index" >
                <span>{{item.name?item.name:"暂无"}}</span>
                <span>{{(item.size / (1024 * 1024)).toFixed(2)+"M"}}</span>
                <span>{{item.active}}</span><span>{{item.process?item.process+"%":"0%"}}</span>
              </div>
            </div>
          </div>
          <div class="file-input">
            <file-upload
              class="uploadFile"
              ref="upload"
              v-model="files"
              :data="fileData"
              :multiple="true"
              extensions="pdf,doc,docx"
              accept="file/pdf,file/doc,file/docx"
              :post-action="uploadUrl"
              @input-file="inputFile"
              @input-filter="inputFilter"
            >上传文件</file-upload>
            <button class="btn btn1" 
              v-show="!$refs.upload || !$refs.upload.active" 
              @click.prevent="$refs.upload.active = true" 
            type="button">开始上传</button>
            <button class="btn btn2" 
              v-show="$refs.upload && $refs.upload.active" 
              @click.prevent="$refs.upload.active = false" 
            type="button">停止上传</button>
          </div>
        </div>
        <div class="ad-right">
          <div class="page-cell">
            <div class="page-title">Cell Swipe</div>
            <mt-cell-swipe v-for="(n,i) in 10" :key="i" :right="rightButtons"
              title="swipe me">
            </mt-cell-swipe>
          </div>
        </div>
      </div>
    </div>
    <ad-edit v-show="!address.show" @selected="defaultAddress" ></ad-edit>
    <mt-popup 
      v-model="cancelOrder" 
      popup-transition="popup-fade" 
      modal="true" 
      closeOnClickModal="false">
      <ad-dialog @cancel="cancelled" ></ad-dialog>
    </mt-popup>
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
import headTop from "Components/head/header.vue";
import adEdit from "Pages/address/child/edit.vue";
import adDialog from "Components/dialog/dialog.vue";
import {appBrower} from 'Models/apptype.js';// 判断app的浏览器是android 还是 ios
export default {
  components: {
    headTop,
    adEdit,
    adDialog,
  },
  data() {
    return {
      arr:[],
      files: [],
      datePicker:true,
      cancelOrder:false,
      address:{
        show:true,
      },
      slots: [
        { flex: 1,values: [],className: 'slot1',textAlign: 'center',visibleItemCount:5,}, 
        { divider: true, content: '-',className: 'slot2'},
        { flex: 1, values: [],className: 'slot3',textAlign: 'center',visibleItemCount:5,}
      ],
      file:[{name:"",size:0,active:false}],
      uploadUrl:"/heg_api/join/saveCareer.do",
      fileData:{
        name:"",email:"",mobile:"",location:"",joinReason:"",
        linkedinUrl:"",departmentId:"",positionId:"",file:""
      },
      rightButtons:[// 定义按钮内容和数量
        {
          content: 'Mark',
          style: { background: 'lightgray', color: '#fff' }
        },
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => Toast('delete')
        }
      ],
    }
  },
  created() {
    if(appBrower.versions.android){
      console.log("安卓系统--安卓机,浏览器内核? webkit = "+appBrower.versions.webKit);
    }else if(appBrower.versions.ios){
      console.log("苹果系统--苹果机,浏览器内核? webkit = "+appBrower.versions.webKit);
    }
    for (let i = 1976; i <= Number(new Date().getFullYear());i++) {
      this.arr.push(i);
    }
    // console.log("base64: "+this.$Base64.encode("123156102313"));
    // console.log("md5: "+this.$md5("123156102313"));
    let arr = this.arr.reverse();
    this.slots[0].values = arr;
    this.slots[2].values = arr;
  },
  methods: {
    inputFile(newFile, oldFile) {
      this.file = newFile;
      if(newFile.name.split("").length >= 10){
        let name = newFile.name.substr(0,5)+"***"+newFile.name.substr(-4);
        this.$set(this.file,"name",name);
      }else{
        this.$set(this.file,"name",newFile.name);
      }
      /**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
      // if (newFile && oldFile && !newFile.active && oldFile.active) {
      //   // 获得相应数据
      //   console.log('response', newFile.response)
      //   if (newFile.xhr) {
      //     //  获得响应状态码
      //     console.log('status', newFile.xhr.status)
      //   }
      // }
      if (newFile && !oldFile) {// 添加文件
        console.log(newFile.active)
        if (newFile.active) {// 开始上传
          console.log('Start upload', newFile)
          // 限定最小字节
          if (newFile.size >= 0 && newFile.size < 100 * 1024) {
            newFile = this.$refs.upload.update(newFile, {error: 'size'})
          }
        }
      }

    },
    inputFilter(newFile, oldFile, prevent) {
      /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        // if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
        //   return prevent()
        // }
        if (!/\.(pdf|doc|docx)$/i.test(newFile.name)) {
          Toast({
            message:"抱歉,暂不支持改格式类型的文件!",
            position:"top",
            duration:1500
          });
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    edit(){
      this.address.show = false;
    },
    defaultAddress(who){
      this.address.show = true;
      this.cancelOrder = true;
    },
    cancelled(){
      this.cancelOrder = false;
    },
    leftButtonHandler(evt) {
      console.log(123);
    }
  },
}
</script>
<style lang="less" scoped>
#user-address{
  .mint-popup{
    width: 75%;
  }
  .ad-con{
    padding-top:0.5rem;
    .ad-center{
      border-top:1px dashed #999;
      border-bottom:1px dashed #999;
      .file-info{
        font-size: 0.18rem;
        .file-title,.file-text{
          span{padding:0.05rem 0;}
          span:first-child{
            flex:1;
          }
          span:nth-child(n+2){
            display: block;
            width: 20%;
            border-left:1px solid #bbb;
          }
        }
        .file-text{
          div{border-bottom:1px solid #bbb;}
          span:first-child{font-size: 0.15rem}
          border-top:1px solid #bbb;
          span:nth-child(2){color:#0f0;}
          span:nth-child(3){color:#f00;}
          span:last-child{color:#0b9d78;}
        }
      }
      .file-input{
        padding:0.1rem 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .uploadFile{
          font-size:0.18rem;
        }
        .btn{
          background:#999;
          color:#fff;
          border-radius:4px;
          padding:0.06rem 0.2rem;
        }
        .btn2{background:#ffa000;}
      }
    }
    .ad-right{
      .page-cell{font-size:18px;}
    }
  }
}
</style>
