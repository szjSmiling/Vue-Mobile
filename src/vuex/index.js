
import Vue from 'vue'
import Vuex from 'vuex'
import {Xapp} from "./types/apptype.js";
import {Xtest1} from "./test/test1.js";

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules:{
		Xapp,
		Xtest1,
	}
})
