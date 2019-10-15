// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "./http";
import VueSocketIO from 'vue-socket.io'
import $ from "jquery";

Vue.use(new VueSocketIO({
  debug: true,
  connection:"http://localhost:3000" ,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.vm = new Vue();





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
