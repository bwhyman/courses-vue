import * as types from "./types";
import axios from "@/util/Myaxios";

export const loginmodule = {
  namespaced: true,
  actions: {
    [types.LOGIN](context, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", user)
          .then(resp => {
            setAuthorization(resp);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    async [types.COOKIE_LOGIN]() {
      let resp = await axios.post("/cookielogin");
      setAuthorization(resp);
    }
  }
};

function setAuthorization(response) {
  let token = response.headers["authorization"];
  let role = response.data.role;
  if (token != null) {
    sessionStorage.setItem("Authorization", token);
    sessionStorage.setItem("role", role);
  }
}
