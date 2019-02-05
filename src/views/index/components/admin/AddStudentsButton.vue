<template>
  <div>
    <progress-circular></progress-circular>
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn slot="activator" color="primary" dark @click="openForm">
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
                <v-btn color="info" type="button" @click="select" v-if="isEmpty">
                  <v-icon>cloud_upload</v-icon>
                </v-btn>
                <v-btn color="warning" type="button" v-if="!isEmpty" @click="del">
                  <v-icon>delete</v-icon>
                </v-btn>
                <br>
                <p>
                  <span
                    v-if="!isEmpty"
                  >{{file.name}} / {{(file.size/1024).toFixed(2)}} KB / 学生人数：{{count}}</span>&nbsp;
                </p>
              </v-form>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="isEmpty" color="blue darken-1" flat @click="save">
            <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { NAMESPACE, ADD_STUDENTS, LOADING } from "@/views/index/store/types";
import { readStudentFile } from "@/util/ExcelUtils.js";
import progresscircular from "@/components/ProgressCircular";
export default {
  components: {
    "progress-circular": progresscircular
  },
  data: () => ({
    dialog: false,
    file: null,
    students: [{ id: null, number: null, name: null }],
    count: null,
    isEmpty: true,
    loading: false
  }),
  methods: {
    openForm() {
      this.file = null;
      this.$refs.file.value = null;
      this.isEmpty = true;
    },
    select() {
      this.$refs.file.click();
    },
    fileChange(event) {
      this.file = event.target.files[0];

      readStudentFile(this.file).then(data => {
        this.students = data;
        this.count = this.students.length;
        this.isEmpty = false;
      });
    },
    del() {
      this.file = null;
      this.$refs.file.value = null;
      this.isEmpty = true;
    },
    save() {
      this.loading = true;
      this.$store.commit(NAMESPACE + "/" + LOADING, true);
      this.$store
        .dispatch(NAMESPACE + "/" + ADD_STUDENTS, {
          cid: this.$route.params.cid,
          students: this.students
        })
        .then(() => {
          this.loading = false;
          this.$store.commit(NAMESPACE + "/" + LOADING, false);
        });
      this.dialog = false;
    }
  }
};
</script>
