<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn slot="activator" color="primary" dark @click="clearForm">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">作业</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-flex xs12>
            <v-form ref="form">
              <v-text-field
                label="作业题目*"
                required
                v-model="homework.title"
                :rules="rules.requiredRules"
              ></v-text-field>
              <v-textarea
                name="input-7-1"
                label="作业内容*"
                :rules="rules.requiredRules"
                v-model="homework.content"
              ></v-textarea>
            </v-form>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="save">
          <v-icon>done</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { NAMESPACE, ADD_HOMEWORK } from "@/views/index/store/types";
export default {
  data: () => ({
    dialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },

    homework: { title: null, content: null }
  }),
  methods: {
    clearForm() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(NAMESPACE + "/" + ADD_HOMEWORK, {
          path: this.$route.path,
          homework: this.homework
        });
        this.$nextTick(() => {
          this.$refs.form.reset();
          this.dialog = false;
        });
      }
    }
  }
};
</script>
