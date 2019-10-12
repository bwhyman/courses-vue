<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn slot="activator" color="primary" dark @click="openForm">
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
              <!-- <v-date-picker v-model="date" color="green lighten-1"></v-date-picker>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>-->

              <datetimepicker ref="picker"></datetimepicker>

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
        <v-btn color="blue darken-1" flat @click="save" :disabled="!validate">
          <v-icon>done</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { NAMESPACE, ADD_HOMEWORK } from "@/views/index/store/types";
import datetimepicker from "@/views/index/components/commons/DateTimepicker";
export default {
  components: { datetimepicker },
  data: () => ({
    date: null,
    dialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    homework: {
      title: null,
      content: null,
      deadLineTime: null,
      course: { id: null }
    }
  }),
  methods: {
    openForm() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    save() {
      if (this.$refs.form.validate()) {
        let picker = this.$refs.picker;
        this.homework.deadLineTime = picker.date + " " + picker.time;
        this.homework.course.id = this.$route.params.cid;
        this.$store.dispatch(NAMESPACE + "/" + ADD_HOMEWORK, {
          cid: this.$route.params.cid,
          homework: this.homework
        });
        this.$nextTick(() => {
          this.dialog = false;
        });
      }
    }
  },
  computed: {
    validate() {
      if (this.homework.title && this.homework.content) {
        return true;
      }
      return false;
    }
  }
};
</script>
