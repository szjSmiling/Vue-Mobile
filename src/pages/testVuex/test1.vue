<template>
  <div id="my-vuex1">
    <div class="content">
      <button v-text="msg" @click="refreshData"></button>
      <div class="test1">
        <p v-for="item in doneTodos" :key="item.id" v-text="item.done+':'+item.text"></p>
      </div>
      <div class="test1">
        <p class="test-p">...mapGetters: {{doneCount}}</p>
        <p class="test-p">{{doneTodosCount | sum('test1')}}</p>
        <p style="color:#00f;">****Filter的test如下:</p>
        <h4>{{count | cal(30,20)}}</h4>
        <!-- <input type="text" v-model="count | change()" > -->
        <ul style="background:#fff;color:#f00;">
          <li style="padding:0.05rem 0;" v-for="(item,index) in filterShoppingList" :key="index">
            <span>{{index}}</span>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="test1 test2">
        test2 <br>
        <p class="test-p">{{getTodoById}}</p>
        <p class="test-p">{{commitState1}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
import { mapGetters } from 'vuex';
import {mapActions} from "vuex";
export default {
  data(){
    return {
      count:1,
      key: "Milk",
      msg:'vuex的test数据',
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: true },
        { id: 3, text: '...', done: true },
      ],
      shoppingList: [
        "Milk", "Donuts", "Cookies", "Milk Chocolate", "Peanut Butter", 
        "Pepto Bismol", "milk Pepto Bismol (Chocolate flavor)", 
        "Pepto Bismol (Cookie flavor)"
      ],
    }
  },
  created() {
    // this.$store.dispatch('incrementP');
    // console.log(this.$store.dispatch('incrementP',{amount:4}));
    // console.log(this.$store.dispatch('incrementP'));
  },
  computed:{
    ...mapGetters([// 使用对象展开运算符将 getter 混入 computed 对象中
      'doneTodosCount',
      'anotherGetter',
    ]),
    ...mapGetters({// getter 属性另取一个名字，使用对象形式：
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    }),
    doneTodos(){
      return this.$store.getters.doneTodos;
    },
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    },
    getTodoById () {
      return this.$store.getters.getTodoById(2)
    },
    filterShoppingList(){// 列表过滤        
      let key = this.key;            
      let shoppingList = this.shoppingList;            
      return shoppingList.filter(item=>{            
        return item.toLowerCase().indexOf(key.toLowerCase()) != -1            
      })     
    },
    commitState1(){
      this.$store.commit('increment',{amount:2})
      return this.$store.state.Xtest1.data1;
    }
  },
  methods:{
    refreshData(){
      this.$store.dispatch("updateUserInfo", {nickName:'nick'});
      this.msg = this.msg +'---'+ this.$store.state.Xtest1.nickName;
    },
    ...mapActions(["incrementP"]),
  },
  filters: {
    sum(value,str){
      return str+': getters ='+value;
    },
    cal(value,x1,x2){
      let v = value + x1 - x2;
      return value +' + '+ x1 +' - '+ x2 +' = ' + v;
    },
    change:{
      read(val){// model -> view 在更新 `<input>` 元素之前格式化值
        return val;
      },
      write(newVal,oldVal){// view -> model  在写回数据之前格式化值
        console.log("newVal:"+newVal); 
        console.log("oldVal:"+oldVal);
        return newVal;
      }
    }
  }
}
</script>
<style lang="less" scoped>
#my-vuex1{
  .content{
    height:100%;
    background:#eee;
  }
  button{
    color:#f21f35;
    font-size:0.2rem;
  }
  .test-p{
    color:#333;
    padding:0.03rem 0;
  }
  .test1{
    font-size:0.2rem;
    text-align: left;
    margin:0.1rem 0;
    background:#fff;
    padding: 0.05rem 0.15rem;
    p{
      line-height: 0.25rem;
    }
  }
  .test2{

  }
}
</style>
