// import * as types from "Vuex/types/type.js";
export const Xtest1 = {
  state:{
    data1:0,
    data2:'',
    data3:{},
    data4:[],
    data5:null,
    nickName:'',
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: true },
    ]
  },
  getters: {// 可以理解为 store 的计算属性
    doneTodos: state => {
       return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {//getter 返回一个函数，来实现给 getter 传参,这对 store 里的数组进行查询时非常有用。
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {//Mutation 必须是同步函数
    updateUserInfo(state,data) {
　　　state.nickName = data.nickName;
      console.log(data);
    },
    todos(state){
      state.todos = state.todos
    },
    increment (state,payload){
      state.data1 += payload.amount
    },
    minus (state,payload){
      state.data1 -= payload.amount;
    }
  },
  actions:{
    //Action 提交的是 mutation，而不是直接变更状态。
    //Action 可以包含任意异步操作。
    updateUserInfo({commit,state},data) {
      commit("updateUserInfo",data);
    },
    incrementP (context,data){
      console.log(context)
      console.log(data)
      context.commit('increment');
    },
    minusP ({commit,state},data){
      commit('minus');
      console.log(commit)
      console.log(state)
    }

    // 假设 getData() 和 getOtherData() 返回的是 Promise
    // async increment ({ commit }) {
    //   commit('gotData', await getData())
    // },
    // async minus ({ dispatch, commit }) {
    //   await dispatch('increment') // 等待 increment 完成
    //   commit('gotOtherData', await getOtherData())
    // }
  }
}