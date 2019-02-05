import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/store";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import "vue-prism-editor/dist/VuePrismEditor.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

let token = sessionStorage.getItem("Authorization");
if (token == null || token.length < 96) {
  window.location.href = "./login.html";
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
