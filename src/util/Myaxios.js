import axios from "axios";
import store from "@/store/store";
import { SHOW_EXCEPTION } from "@/store/types";

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
    if (error.response != null) {
      store.commit(SHOW_EXCEPTION, error.response.data.message);
    }
    if (error == "Error: Network Error") {
      store.commit(SHOW_EXCEPTION, "网络连接异常");
    }
    return Promise.reject(error);
  }
);

export default axios;
