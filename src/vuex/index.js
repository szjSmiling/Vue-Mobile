
import Vue from 'vue'
import Vuex from 'vuex'
import {Xapp} from "./types/apptype.js";

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules:{
		Xapp,
	}
})
