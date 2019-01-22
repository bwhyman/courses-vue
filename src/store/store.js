import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import { loginmodule } from "@/views/login/store/LoginModule";
import * as logintypes from "@/views/login/store/types";
import { adminmodule } from "@/views/index/store/AdminModule";
import * as admintypes from "@/views/index/store/types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    [logintypes.NAMESPACE]: loginmodule,
    [admintypes.NAMESPACE]: adminmodule
  },
  state: {
    exception: null
  },
  mutations: {
    [types.SHOW_EXCEPTION](state, error) {
      state.exception = error;
    }
  }
});
