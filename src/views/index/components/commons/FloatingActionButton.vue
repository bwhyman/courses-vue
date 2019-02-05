<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      top
      right
      direction="bottom"
      open-on-hover
      transition="slide-y-reverse-transition"
    >
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="green" @click="openForm">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="logout">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">设置</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-flex xs12>
              <v-form ref="form">
                <v-layout row wrap>
                  <v-text-field
                    label="密码*"
                    required
                    type="password"
                    v-model="newuser.password"
                    :rules="rules.requiredRules"
                  ></v-text-field>
                  <v-text-field
                    label="确认*"
                    required
                    type="password"
                    v-model="newuser.repassword"
                    :rules="rules.requiredRules"
                  ></v-text-field>
                </v-layout>
              </v-form>
              <v-text-field disabled label="姓名" v-model="getUser.name"></v-text-field>
              <v-layout row wrap>
                <v-text-field disabled label="学号" v-model="getUser.number"></v-text-field>
                <v-text-field disabled label="班级" v-model="getUser.clazz"></v-text-field>
              </v-layout>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="save" :disabled="!validate">
            <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  NAMESPACE,
  GET_SETTING,
  UPDATE_PASSWORD
} from "@/views/index/store/types";
import { mapState } from "vuex";
export default {
  data() {
    return {
      fab: false,
      dialog: false,
      rules: { requiredRules: [v => !!v || "不能为空"] },
      newuser: { password: null, repassword: null }
    };
  },
  created() {
    this.$store.dispatch(NAMESPACE + "/" + GET_SETTING);
  },
  methods: {
    openForm() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.dialog = true;
    },
    save() {
      this.$store.dispatch(NAMESPACE + "/" + UPDATE_PASSWORD, {
        password: this.newuser.password
      });
      this.dialog = false;
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "number=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    logout() {
      sessionStorage.clear();
      window.location.href = "/login.html";
    }
  },
  computed: {
    validate() {
      if (
        this.newuser.password != null &&
        this.newuser.password === this.newuser.repassword
      ) {
        return true;
      }
      return false;
    },
    ...mapState(NAMESPACE, { getUser: state => state.user })
  }
};
</script>
<style scoped>
#create .v-speed-dial {
  position: absolute;
  right: 20px;
  top: 40px;
  height: 70px;
  z-index: 100;
}

#create .v-btn--floating {
  position: relative;
  z-index: 100;
}
</style>
