// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './http/index'
import './assets/icon/iconfont.css'
import 'font-awesome/css/font-awesome.min.css'
import qs from 'qs'
import axios from 'axios';
import 'jquery'

axios.defaults.withCredentials=true;
Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(api);
Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.prototype.$qs = qs;
Vue.prototype.$showFullScreen = {flag:false,refreshTimes:0}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
