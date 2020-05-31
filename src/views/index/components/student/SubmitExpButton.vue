<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn slot="activator" color="info" dark @click="openForm">
      <v-icon>cloud_upload</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">实验: {{experiment.name}}</span>
      </v-card-title>
      <v-card-text v-if="verifyDeadLineTime">
        <v-card-text>
          <span style="color: red;">已过截至时间</span>
        </v-card-text>
      </v-card-text>
      <v-card-text v-else>
        <v-flex xs12>
          <v-form ref="form">
            <input
              ref="file"
              type="file"
              :accept="experiment.fileExtension"
              style="display:none"
              @change="fileChange"
            >
            <v-btn ref="submit" color="info" type="button" @click="select" v-if="isEmpty">
              <v-icon>cloud_upload</v-icon>
            </v-btn>
            <v-btn color="warning" type="button" @click="del" v-if="!isEmpty">
              <v-icon>delete</v-icon>
            </v-btn>
            <span v-if="isLarge" style="color: red;">超过上传文件尺寸限制 {{experiment.size}}MB</span>
            <p>
              <span
                v-if="!isEmpty || isLarge"
              >{{file.name}} / {{(file.size/1024/1024).toFixed(2)}} MB</span>&nbsp;
            </p>
          </v-form>
        </v-flex>
      </v-card-text>
      <v-card-actions v-if="!verifyDeadLineTime">
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="save"
          :disabled="isEmpty || isLarge"
        >
          <v-icon>done</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { NAMESPACE, SUBMIT_EXP } from "@/views/index/store/types";
export default {
  props: ["experiment"],
  data: () => ({
    dialog: false,
    file: { size: 0 },
    isEmpty: true,
    isLarge: false
  }),
  methods: {
    openForm() {
      this.file = null;
      this.$refs.file.value = null;
      this.isEmpty = true;
      this.isLarge = false;
    },
    select() {
      this.$refs.file.click();
    },
    fileChange(event) {
      this.isLarge = false;
      this.isEmpty = false;
      let f = event.target.files[0];
      this.file = f;
      if (f.size / 1024 / 1024 > this.experiment.size) {
        this.isLarge = true;
        this.isEmpty = true;
      }
    },
    del() {
      this.file = null;
      this.isSelected = false;
      this.$refs.file.value = null;
      this.isEmpty = true;
    },
    save() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("expid", this.experiment.id);
      this.$store.dispatch(NAMESPACE + "/" + SUBMIT_EXP, {
        cid: this.$route.params.cid,
        expid: this.experiment.id,
        form: formData
      });
      this.dialog = false;
    }
  },
  computed: {
    verifyDeadLineTime() {
      let deadLine = new Date(this.experiment.deadLineTime);
      let now = new Date();
      return now.getTime() > deadLine.getTime();
    }
  }
};
</script>
