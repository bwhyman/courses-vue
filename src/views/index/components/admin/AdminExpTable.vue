<template>
  <v-card>
    <progress-circular></progress-circular>
    <v-data-table
      :headers="headers"
      :items="listExps"
      class="elevation-1"
      :rows-per-page-items="rowsPerPage"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.index+1 }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.insertTime }}</td>
        <td class="text-xs-center">
          <v-btn small color="info" dark :to="`experiments/${props.item.id}/unsubmited`">
            <v-icon>visibility_off</v-icon>
          </v-btn>
          <v-btn small color="info" dark @click="downloadZip(props.item.id)">
            <v-icon>cloud_download</v-icon>
          </v-btn>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small color="primary" dark class="mr-2" @click="openEdit(props.item)">edit</v-icon>
          <v-icon small color="primary" dark @click="openDelete(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <!-- Edit dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card height="340px">
        <v-card-title>
          <span class="headline">实验</span>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-form ref="form">
              <v-text-field
                label="实验*"
                required
                v-model="experiment.name"
                :rules="rules.requiredRules"
              ></v-text-field>
              <v-select
                v-model="experiment.fileExtension"
                :items="items"
                attach
                chips
                label="实验文件类型"
              ></v-select>
            </v-form>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="save">
            <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete dialog -->
    <v-dialog v-model="deldialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">删除实验: {{experiment.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-flex xs12>将删除实验，以及学生已经上传的实验报告文档等全部信息</v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="del">
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
  UPDATE_EXP,
  DEL_EXP,
  DOWNLOAD_ZIP
} from "@/views/index/store/types";
import { mapState } from "vuex";
import progresscircular from "@/components/ProgressCircular";
export default {
  components: { "progress-circular": progresscircular },
  data: () => ({
    rowsPerPage: [20, { text: "全部", value: -1 }],
    headers: [
      { text: "#", value: "id", align: "center", sortable: true },
      { text: "实验", value: "name", align: "center", sortable: true },
      { text: "日期", value: "insertTime", align: "center", sortable: true },
      { text: "操作", value: "", align: "center", sortable: false },
      { text: "修改", value: "", align: "center", sortable: false }
    ],
    experiment: { id: null, name: null, fileExtension: null },
    dialog: false,
    deldialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    items: ["无", ".zip, .rar, .7z", ".doc, .docx"],
    value: [null, ".zip, .rar, .7z", ".doc, .docx"]
  }),
  methods: {
    openEdit(item) {
      this.experiment.id = item.id;
      this.experiment.name = item.name;
      this.experiment.fileExtension = item.fileExtension;
      this.dialog = true;
    },
    openDelete(item) {
      this.experiment.id = item.id;
      this.experiment.name = item.name;
      this.deldialog = true;
    },
    save() {
      this.$store.dispatch(NAMESPACE + "/" + UPDATE_EXP, {
        expid: this.experiment.id,
        cid: this.$route.params.cid,
        exp: this.experiment
      });
      this.dialog = false;
    },
    del() {
      this.$store.dispatch(NAMESPACE + "/" + DEL_EXP, {
        expid: this.experiment.id,
        cid: this.$route.params.cid
      });
      this.deldialog = false;
    },
    downloadZip(expid) {
      this.$store.dispatch(NAMESPACE + "/" + DOWNLOAD_ZIP, {
        expid: expid,
        cid: this.$route.params.cid
      });
    }
  },
  computed: {
    ...mapState(NAMESPACE, { listExps: state => state.exps })
  }
};
</script>
