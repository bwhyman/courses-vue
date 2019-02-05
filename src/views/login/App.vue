<template>
  <div id="#app">
    <v-app>
      <v-layout justify-end row>
        <div id="logindiv">
          <v-dialog v-model="dialog" max-width="600px">
            <v-btn slot="activator" color="primary" dark large @click="clearForm">专业课程管理</v-btn>
            <v-form ref="form">
              <v-card v-if="!isCookie">
                <v-card-title>
                  <span class="headline">登录</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          label="学号*"
                          :rules="rules.numberRules"
                          required
                          v-model="user.number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          label="密码*"
                          type="password"
                          :rules="rules.passwordRules"
                          required
                          v-model="user.password"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-alert :value="exception" type="error">{{exception}}</v-alert>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-switch label="记住通行证" v-model="user.checked"></v-switch>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="login" :disabled="!validate">登录</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>

            <!-- cookie登录 -->
            <v-card v-if="isCookie">
              <v-card-title v-if="isCookie">
                <span class="headline">登录</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-chip color="indigo" text-color="white" @click="cookieLogin">
                        <v-avatar>
                          <v-icon>account_circle</v-icon>
                        </v-avatar>
                        {{cookie.name}}{{getRole}}，欢迎登录
                      </v-chip>
                    </v-flex>
                    <v-flex xs12>
                      <v-alert :value="exception" type="error">{{exception}}</v-alert>
                    </v-flex>
                    <v-flex xs12>
                      <v-switch label="重新登录" @click="reLogin"></v-switch>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <br>
          <a href="https://github.com/bwhyman/courses" target="_blank">
            <img class="github" src="./assets/springboot-100.png">
          </a>
          <br>
          <a href="https://github.com/bwhyman/courses-vue" target="_blank">
            <img class="github" src="./assets/vue-100.png">
          </a>
        </div>
      </v-layout>
    </v-app>
    <alert-dialog></alert-dialog>
  </div>
</template>

<script>
import alertDialog from "@/components/AlertDialog.vue";
import { getCookie } from "@/util/CookieUtils.js";
import * as types from "@/views/login/store/types";
import { SHOW_EXCEPTION } from "@/store/types";
export default {
  name: "app",
  components: { "alert-dialog": alertDialog },
  data() {
    return {
      user: { number: null, password: null, checked: false },
      cookie: { name: null, role: null },
      dialog: false,
      exception: null,
      rules: {
        numberRules: [
          v => !!v || "学号不能为空",
          v => !isNaN(v) || "学号应为数字"
        ],
        passwordRules: [v => !!v || "密码不能为空"]
      }
    };
  },
  created() {
    let c = window.decodeURIComponent(getCookie("user"));
    if (c.length > 0) {
      try {
        this.cookie = JSON.parse(c);
      } catch (error) {
        this.$store.commit(SHOW_EXCEPTION, "Cookie解析错误");
        this.reLogin();
      }
    }
  },
  methods: {
    clearForm() {
      this.$refs.form.reset();
      this.$refs.form.reset();
      this.exception = null;
    },
    async login() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(types.NAMESPACE + "/" + types.LOGIN, this.user)
          .then(() => {
            window.location.href = "./index.html";
          })
          .catch(() => {})
          .finally(() => {
            this.exception = null;
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          });
      }
    },
    async cookieLogin() {
      await this.$store.dispatch(types.NAMESPACE + "/" + types.COOKIE_LOGIN);
      window.location.href = "./index.html";
    },
    reLogin() {
      this.cookie.name = null;
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "number=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  },
  computed: {
    validate() {
      if (this.user.number && this.user.password) {
        return true;
      }
      return false;
    },
    isCookie() {
      if (this.cookie.name != null) {
        return true;
      } else {
        return false;
      }
    },

    getRole() {
      let role = "同学";
      if (this.cookie.role == 1) {
        role = "老师";
      }
      return role;
    }
  }
};
</script>
<style scoped>
#app {
  height: 100vh;
  width: 100vw;
  background-image: url("./assets/jumbotron.jpg");
  background-size: cover;
}
#logindiv {
  float: right;
  margin: 30px 30px 0 0;
  text-align: end;
}
.github {
  text-align: center;
  width: 80px;
  height: 70px;
  opacity: 0.8;
}
.github:hover {
  opacity: 1;
}
</style>
