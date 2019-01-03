// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  Button,
  DatetimePicker,
  Field,
  Picker,
  Popup,
  Radio,
  Range,
  Cell,
  Badge,
  Spinner,
  Lazyload,
  Checklist,
  Loadmore,
  CellSwipe,
  Actionsheet ,
  InfiniteScroll,
} from "mint-ui";
import Vue from 'vue';
import App from './App';
import axios from "axios";// 不能使用Vue.use(axios),要使用Vue.prototype.$axios = axios;
import { FontUtil } from "./models/utils/FontUtil.js";// 配置基础字体大小
import router from './router';
import { store } from "./vuex";
import resource from "vue-resource";// 可以使用$http
import { AxiosConfig } from "./models/utils/AxiosConfig";
import './assets/iconfont/iconfont.css';//引入字体图标
import './assets/iconfont/iconfont1.css';//引入字体图标
import Clipboard from 'clipboard';// 拷贝复制
import 'font-awesome/css/font-awesome.css';
import VueUploadComponent from 'vue-upload-component';
import uploader from 'vue-simple-uploader';
// import md5 from 'js-md5';
// import base64 from 'js-base64';
import filters from "./filter/filter.js";
import iOSBridge from './request/bridge.js';

// import fontawesome from '@fortawesome/fontawesome';

// import solid from '@fortawesome/fontawesome-free-solid'
// import regular from '@fortawesome/fontawesome-free-regular'
// import brands from '@fortawesome/fontawesome-free-brands'

// fontawesome.library.add(solid)
// fontawesome.library.add(regular)
// fontawesome.library.add(brands)
// Vue.component('font-awesome-icon', fontawesome)

Vue.use(resource);
//定制化
// 在assets目录下的图片需要使用require()引入
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('./assets/images/error.gif'),
  loading: require('./assets/images/dog.gif'),
  attempt: 1
});
Vue.use(InfiniteScroll);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component(Badge.name, Badge);
Vue.component("mt-button", Button);
Vue.component("mt-range", Range);
Vue.component("mt-popup", Popup);
Vue.component("mt-radio", Radio);
Vue.component("mt-cell", Cell);
Vue.component("mt-spinner", Spinner);
Vue.component("mt-checklist", Checklist);
Vue.component("mt-actionsheet", Actionsheet);
Vue.component("mt-loadmore", Loadmore);
Vue.component(Field.name, Field);
Vue.config.productionTip = false;
Vue.component(CellSwipe.name, CellSwipe);
Vue.component("file-upload",VueUploadComponent);
Vue.use(uploader);

Vue.prototype.$clipboard = Clipboard;
// Vue.prototype.$md5 = md5;
// Vue.prototype.$Base64 = base64.Base64;
Vue.prototype.$axios = axios;
Vue.prototype.$bridge = iOSBridge;
Vue.filter("formatDate", filters.formatDate);
AxiosConfig.init();
FontUtil.init();
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  methods:{
    onLoadFinish() {
      try {
        window.heg && window.heg.onViewShow();
      } catch (e) {
        // statements
      }
    },
  },
  mounted() {
    this.onLoadFinish();
  },
  render: h => h(App)
});