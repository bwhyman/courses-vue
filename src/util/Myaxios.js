import axios from "axios";
import store from "@/store/store";
import { SHOW_EXCEPTION } from "@/store/types";

axios.defaults.baseURL = "/api";
// process.env.NODE_ENV === 'production'
axios.interceptors.request.use(
  function(req) {
    req.headers.Authorization = sessionStorage.getItem("Authorization");
    return req;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.config.responseType == "blob") {
      let fr = new FileReader();
      fr.onload = function() {
        store.commit(SHOW_EXCEPTION, JSON.parse(this.result).message);
      };
      fr.readAsText(error.response.data);
      return;
    }
    let msg = error.response.data.message;
    if (msg == null) {
      msg = error.response.data;
    }

    if (error == "Error: Network Error") {
      msg = "网络连接异常";
    }
    store.commit(SHOW_EXCEPTION, msg);
    return Promise.reject(error);
  }
);

export default axios;
