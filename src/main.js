// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  Button,
  DatetimePicker,
  Field,
  Picker,
  Popup,
  Radio,
  Range
} from "mint-ui";
import Vue from 'vue';
import App from './App';
import axios from "axios";
import router from './router';
import { store } from "./vuex";
import resource from "vue-resource";
import { AxiosConfig } from "./models/utils/AxiosConfig";

Vue.use(resource);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component("mt-button", Button);
Vue.component("mt-range", Range);
Vue.component("mt-popup", Popup);
Vue.component("mt-radio", Radio);
Vue.component(Field.name, Field);
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
AxiosConfig.init();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
});