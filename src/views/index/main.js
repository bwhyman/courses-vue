import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";

Vue.use(Vuetify);

Vue.config.productionTip = false;

let token = sessionStorage.getItem("Authorization");
if (token == null || token.length < 96) {
  window.location.href = "/login.html";
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
