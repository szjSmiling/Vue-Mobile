<template>
  <div id="my-vuex">
    <head-top id="header" >
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Vuex Test</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="top-distance"></div>
      <ul class="top-title flex space-between">
        <li v-for="item in lists" :key="item.id" :class="{tabActive:item.flag}" @click="tabSwitch(item.id)">{{item.title}}</li>
      </ul>
      <!-- <mt-tab-container v-model="active" :swipeable="true">
        <mt-tab-container-item id="test1">
          <mt-cell v-for="n in 10" title="Vuex test1" :key="n"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="test2">
          <mt-cell v-for="n in 5" title="Vuex test2" :key="n"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="test3">
          <mt-cell v-for="n in 7" title="Vuex test3" :key="n"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container> -->
      <component :is="children"></component>
    </div>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import vuexTest1 from "./test1.vue";
import vuexTest2 from "./test2.vue";
import vuexTest3 from "./test3.vue";
import { TabContainer, TabContainerItem } from 'mint-ui';
export default {
  components:{
    headTop,
    vuexTest1,
    vuexTest2,
    vuexTest3,
    "mt-tab-container":TabContainer,
    "mt-tab-container-item":TabContainerItem,
  },
  data(){
    return {
      active:"test1",
      children:'vuexTest1',
      lists:[
        {id:0,title:'test1',flag:true},
        {id:1,title:'test2',flag:false},
        {id:2,title:'test3',flag:false},
      ],
      childList:['vuexTest1','vuexTest2','vuexTest3'],
    }
  },
  methods:{
    tabSwitch(who){
      this.cleanLists(this.lists);
      this.lists[who].flag = true;
      this.active = this.lists[who].title;
      this.children = this.childList[who];
    },
    cleanLists(who){
      for(let key in who){
        who[key].flag = false;
      }
    },
  }
}
</script>
<style lang="less" scoped>
#my-vuex{
  .top-distance{height:0.5rem;}
  .content{
    text-align: left;
  }
  .top-title{
    font-size:0.18rem;
    text-align: center;
    border-bottom:1px solid #999;
    li{
      flex:1;
      height:0.4rem;
      line-height: 0.4rem;
      color:#999;
      background:#ebebeb;
      border-right:1px solid #fff;
    }
    li:last-child{border:0;}
    .tabActive{
      color:#fff;
      background:#ffad3d;
    }
  }
  .mint-tab-container{
    padding:0 0.15rem;
  }
}
</style>
