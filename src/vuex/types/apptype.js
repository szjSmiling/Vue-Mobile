import * as types from "./type.js";
export const Xapp = {
  state:{
    browser:null,
    android:false,
    ios:false,
  },
  getters:{
    browser:state => state.browser,
    android:state => state.android,
    ios:state => state.ios,
  },
  mutations:{
    [types.IS_Android](state,android){
			state.android = android;
		},
    [types.IS_iOS](state,ios){
			state.ios = ios;
		},
  }
}