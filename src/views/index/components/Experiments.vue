<template>
  <v-card>
    <v-card-title>
      {{getCourseName}}
      <v-spacer></v-spacer>
      <add-exp-button v-if="isAdmin"></add-exp-button>
    </v-card-title>
    <v-data-table
      :headers="isAdmin? headers : studentheaders"
      :items="listExps"
      class="elevation-1"
      :rows-per-page-items="rowsPerPage"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.index+1 }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>

        <td class="text-xs-center">{{ props.item.insertTime }}</td>
        <td class="text-xs-center" v-if="isAdmin">
          <v-btn
            small
            color="info"
            dark
            :to="{path: '/admin/experiments/' + props.item.id + '/unsubmited'}"
          >未交学生</v-btn>
          <v-btn
            small
            color="info"
            dark
            :to="{path: '/admin/courses/' + cid + '/experiments/' + props.item.id + '/zip'}"
          >打包下载</v-btn>
        </td>
        <td class="text-xs-center" v-if="!isAdmin">
          <v-btn
            small
            color="info"
            dark
            :to="{path: '/admin/experiments/' + props.item.id + '/unsubmited'}"
          >提交</v-btn>
          <v-btn
            small
            color="info"
            dark
            :to="{path: '/admin/courses/' + cid + '/experiments/' + props.item.id + '/zip'}"
          >下载</v-btn>
        </td>
        <td class="justify-center layout px-0" v-if="isAdmin">
          <v-icon small color="primary" dark class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small color="primary" dark @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <!-- Edit dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">实验</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-flex xs12>
              <v-form ref="form">
                <v-text-field
                  label="实验*"
                  required
                  v-model="experiment.name"
                  :rules="rules.requiredRules"
                ></v-text-field>
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
    <!-- delete dialog -->
    <v-dialog v-model="deldialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">删除实验: {{experiment.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-flex xs12>将级联删除学生完成实验等全部信息</v-flex>
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
  LIST_EXPS,
  UPDATE_EXP,
  DEL_EXP
} from "@/views/index/store/types";
import { mapState } from "vuex";
import addexpbutton from "@/views/index/components/admin/AddExperimentButton";
import isAdmin from "@/util/Authority";
export default {
  props: ["cid"],
  components: { "add-exp-button": addexpbutton },
  data() {
    return {
      rowsPerPage: [20, { text: "全部", value: -1 }],
      headers: [
        { text: "#", value: "id", align: "center", sortable: true },
        { text: "实验", value: "name", align: "center", sortable: true },
        { text: "日期", value: "insertTime", align: "center", sortable: true },
        { text: "操作", value: "", align: "center", sortable: false },
        { text: "修改", value: "", align: "center", sortable: false }
      ],
      studentheaders: [
        { text: "#", value: "id", align: "center", sortable: true },
        { text: "实验", value: "name", align: "center", sortable: true },
        { text: "日期", value: "insertTime", align: "center", sortable: true },
        { text: "操作", value: "", align: "center", sortable: false }
      ],
      experiment: { id: null, name: null },
      dialog: false,
      deldialog: false,
      rules: { requiredRules: [v => !!v || "不能为空"] }
    };
  },
  created() {
    this.$store.dispatch(NAMESPACE + "/" + LIST_EXPS, {
      path: this.$route.path,
      cid: this.cid
    });
  },
  methods: {
    editItem(item) {
      this.experiment.id = item.id;
      this.experiment.name = item.name;
      this.dialog = true;
    },
    deleteItem(item) {
      this.experiment.id = item.id;
      this.experiment.name = item.name;
      this.deldialog = true;
    },
    save() {
      this.$store.dispatch(NAMESPACE + "/" + UPDATE_EXP, {
        path: this.$route.path + this.experiment.id,
        exp: this.experiment
      });
      this.dialog = false;
    },
    del() {
      this.$store.dispatch(
        NAMESPACE + "/" + DEL_EXP,
        this.$route.path + this.experiment.id
      );
      this.deldialog = false;
    }
  },
  computed: {
    isAdmin() {
      return isAdmin();
    },
    getCourseName() {
      return this.$store.getters[NAMESPACE + "/getCourseName"](this.cid);
    },
    ...mapState(NAMESPACE, { listExps: state => state.exps })
  }
};
</script>
