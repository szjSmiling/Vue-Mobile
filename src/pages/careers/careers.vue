<template>
  <div id="my-careers">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Apply Online</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="form">
        <h3>Customer Car Manager</h3>
        <ul class="form-group">
          <li class="flex info-name">
            <input type="text" placeholder="Name" v-model="applyInfo.name" >
          </li>
          <li class="flex info-email">
            <input type="text" placeholder="Email Address" v-model="applyInfo.eamil" >
          </li>
          <li class="flex info-mobile">
            <input type="text" placeholder="Nobile Number" v-model="applyInfo.mobile" >
          </li>
          <li class="flex info-location">
            <input type="text" placeholder="Current Location" v-model="applyInfo.location" >
          </li>
          <li class="flex info-reason ">
            <textarea v-model="applyInfo.reasons" rows="5" placeholder="Why do you want to join HappyEasy Go?" ></textarea>
          </li>
          <li class="flex info-link">
            <input type="text" placeholder="LinkedIn URL (Optional)" v-model="applyInfo.linkedIn" >
          </li>
          <li class="info-file" >
            <p>Attach Resume</p>
            <p>(Microsoft Word or PDF file is allowed (5MB))</p>
            <p><input type="file" id="upfile"><span>Upload file</span> or drag and drop</p>
          </li>
          <li class="info-btns flex space-between" >
            <button @click="submit" :class="{active:true}">Submit</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from "Components/head/header.vue";
export default {
  components:{
    headTop,
  },
  data(){
    return {
      applyInfo:{
        name:"",
        eamil:"",
        mobile:"",
        location:"",
        reasons:"",
        linkedIn:"",
      }
    }
  },
  methods:{
    submit(){

    },
  }
}
</script>
<style lang="less" scoped>
#my-careers{
  .content{
    padding: 0.5rem 0.2rem 0;
    text-align: left;
    h3{
      font-size:0.16rem;
      padding: 0.15rem 0;
    }
    .form-group{
      li{
        width:100%;
        margin-bottom:0.15rem;
        color:#999;
        input,textarea{
          width:93.5%;
          padding:0.11rem 3%;
          border:1px solid #ddd;
          border-radius:0.03rem;
          vertical-align: top;
          font-size: 0.14rem;
        }
        *::placeholder{
          color:#999; 
        }
      }
      .info-reason{
        textarea{resize: none;}
      }
      .info-file{
        border:1px dashed #eee;
        font-size: 0.14rem;
        text-align: center;
        padding:0.13rem 0 0.2rem;
        margin-bottom:0.25rem;
        p{
          position: relative;
          line-height:0.2rem;
          color:#999;
          span{
            color:#0b9d78;
          }
          input{
            position: absolute;
            width:0.66rem;
            opacity: 0;
            display:inline-block;
            padding:0;
            border:0;
          }
        }
      }
      .info-btns{
        button{
          width:2rem;
          padding:0.1rem 0;
          font-size: 0.16rem;
          color:#999;
          background: #eee;
          border-radius: 0.03rem;
          margin:auto;
        }
        .active{
          color:#fff;
          background: #ffa000;
        }
      }
    }
  }
}
</style>
