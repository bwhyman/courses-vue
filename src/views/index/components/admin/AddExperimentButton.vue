<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn slot="activator" color="primary" dark @click="openForm">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">实验</span>
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-form ref="form">
            <datetimepicker ref="picker"></datetimepicker>
            <v-text-field
              label="实验*"
              required
              v-model="experiment.name"
              :rules="rules.requiredRules"
            ></v-text-field>
            <v-select v-model="experiment.fileExtension" :items="items" attach chips label="上传文件类型"></v-select>
          </v-form>
        </v-flex>
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
import { NAMESPACE, ADD_EXP } from "@/views/index/store/types";
import datetimepicker from "@/views/index/components/commons/DateTimepicker";
export default {
  components: { datetimepicker },
  data: () => ({
    dialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    items: ["无", ".zip, .rar, .7z", ".doc, .docx"],
    value: [null, ".zip, .rar, .7z", ".doc, .docx"],
    experiment: {
      name: null,
      fileExtension: null,
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
        this.experiment.deadLineTime = picker.date + " " + picker.time;
        (this.experiment.course.id = this.$route.params.cid),
          this.$store.dispatch(NAMESPACE + "/" + ADD_EXP, {
            cid: this.$route.params.cid,
            exp: this.experiment
          });
        this.$nextTick(() => {
          this.dialog = false;
        });
      }
    }
  },
  computed: {
    validate() {
      if (this.experiment.name && this.experiment.fileExtension) {
        return true;
      }
      return false;
    }
  }
};
</script>
