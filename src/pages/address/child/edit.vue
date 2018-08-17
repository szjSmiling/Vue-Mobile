<template>
  <div id="ad-edit">
    <ul class="ad-list">
      <li v-for="item in list" :key="item.id">
        <mt-radio
          :title="title"
          v-model="value"
          :options="item.select">
        </mt-radio>
      </li>
    </ul>
    <mt-button type="default" @click="submit">完成</mt-button>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      title:"设置默认地址",
      list:[
        {id:0,select:[{label: '选项A',value: '值A'}]},
        {id:1,select:[{label: '选项B',value: '值B'}]},
        {id:2,select:[{label: '选项C',value: '值C'}]},
      ],
      value:"值A",
    }
  },
  created() {},
  methods: {
    submit(){
      this.$emit("selected",this.value);
    },
  }
};
</script>
<style lang="less" >
#ad-edit{
  .ad-list{
    .mint-radiolist{
      display:flex;
      align-items: center;
      // .mint-radiolist-title{
      //   width: 0.96rem;
      //   min-width: 0.96rem;
      //   font-size:0.16rem;
      // }
    }
    .mint-cell{
      flex:1;
      padding-top: 6px;
      min-height: 35px;
      .mint-cell-wrapper{min-height: 0;}
      .mint-radiolist-label{
        display: flex;
        text-align: left;
        .mint-radio{
          .mint-radio-input:checked + .mint-radio-core{
            background-color: #26a2ff !important;
            border-color: #26a2ff !important;
          }
          .mint-radio-core::after{
            background-color: #fff !important;
          }
        }
        .mint-radio-label{
          display: block;
          flex:1;
          padding: 2px 0.1rem 0 0;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
#ad-edit{
  .ad-list{
    padding: 0 0.2rem;
    li{margin-top:0.1rem;}
  }
  .mint-button{
    display: block;
    width: 40%;
    color:#26a2ff;
    border:1px solid #26a2ff;
    opacity: 0.5;
    margin:0.2rem auto 0.5rem;
  }
}
</style>
