import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
Vue.prototype.axios = axios;
//自定义全局过滤器，用于nowPlaying中修改img的src
Vue.filter("setWH", (url, arg) => {
  return url.replace(/w\.h/, arg);
});

import Scroller from "@/components/Scroller";
import Loading from "@/components/Loading";
Vue.component("Scroller", Scroller);
Vue.component("Loading", Loading);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
