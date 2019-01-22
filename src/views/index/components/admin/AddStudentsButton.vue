<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn slot="activator" color="primary" dark @click="clearForm">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">学生</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-flex xs12>
            <v-form ref="form">
              <v-alert
                dismissible
                :value="true"
                color="warning"
                icon="priority_high"
                outline
              >警告：导入将删除原课程下学生</v-alert>
              <input
                ref="file"
                type="file"
                accept=".xls, .xlsx"
                style="display:none"
                @change="fileChange"
              >
              <v-btn :color="currentButton.color" type="button" @click="browse">
                <v-icon v-text="currentButton.icon"></v-icon>
              </v-btn>
              <br>
              <p>
                <span
                  v-if="isSelected"
                >{{file.name}} / {{(file.size/1024).toFixed(2)}} KB / 学生人数：{{count}}</span>&nbsp;
              </p>
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
import { NAMESPACE, ADD_STUDENTS } from "@/views/index/store/types";
import { readStudentFile } from "@/util/ExcelUtils.js";
export default {
  data: () => ({
    dialog: false,
    file: null,
    isSelected: false,
    user: { number: null, file: null },
    courses: [],
    course: null,
    students: [],
    count: null,
    fileButton: {
      upload: { icon: "cloud_upload", color: "info" },
      remove: { icon: "delete", color: "warning" }
    },
    currentButton: { icon: "cloud_upload", color: "info" }
  }),
  methods: {
    clearForm() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    browse() {
      if (!this.isSelected) {
        this.$refs.file.click();
      } else {
        this.isSelected = false;
        this.students = null;
        this.count = null;
        this.$refs.file.value = null;
        this.currentButton = this.fileButton.upload;
      }
    },
    fileChange(event) {
      this.file = event.target.files[0];
      readStudentFile(this.file).then(data => {
        this.isSelected = true;
        this.students = data;
        this.count = this.students.length;
        this.currentButton = this.fileButton.remove;
      });
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(NAMESPACE + "/" + ADD_STUDENTS, {
          path: this.$route.path,
          students: this.students
        });
        this.dialog = false;
      }
    }
  }
};
</script>
