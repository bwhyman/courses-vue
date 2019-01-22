<template>
  <v-card>
    <v-card-title>
      {{getCourseName}}
      <v-spacer></v-spacer>
      <add-homework-button v-if="isAdmin"></add-homework-button>
    </v-card-title>
    <v-data-table
      :headers="isAdmin? headers : studentheaders"
      :items="listHomeworks"
      :expand="expand"
      class="elevation-1"
      :rows-per-page-items="rowsPerPage"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-center">{{ props.index+1 }}</td>
          <td class="text-xs-center">{{ props.item.title }}</td>
          <td class="text-xs-center">{{ props.item.insertTime }}</td>
          <td class="text-xs-center" v-if="isAdmin">
            <v-btn
              small
              color="info"
              dark
              :to="{path: '/admin/homeworks/' + props.item.id + '/unsubmited'}"
            >未交学生</v-btn>
            <v-btn
              small
              color="info"
              dark
              :to="{path: '/admin/courses/' + cid + '/homeworks/' + props.item.id + '/zip'}"
            >打包下载</v-btn>
          </td>
          <td class="text-xs-center" v-if="!isAdmin">
            <v-btn
              small
              color="info"
              dark
              :to="{path: '/admin/homeworks/' + props.item.id + '/unsubmited'}"
            >XXX</v-btn>
            <v-btn
              small
              color="info"
              dark
              :to="{path: '/admin/courses/' + cid + '/homeworks/' + props.item.id + '/zip'}"
            >YYYY</v-btn>
          </td>
          <td class="justify-center layout px-0" v-if="isAdmin">
            <v-icon small color="primary" dark class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small color="primary" dark @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props" v-if="isAdmin">
        <v-card flat>
          <v-card-text v-html="rep(props.item.content)"></v-card-text>
        </v-card>
      </template>
    </v-data-table>

    <!-- Edit dialog -->
    <v-dialog v-model="dialog" max-width="600px">
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
    <!-- delete dialog -->
    <v-dialog v-model="deldialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">删除作业: {{homework.title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-flex xs12>将级联删除学生完成作业等全部信息</v-flex>
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
  LIST_HOMEWORKS,
  UPDATE_HOMEWORK,
  DEL_HOMEWORK
} from "@/views/index/store/types";
import { mapState } from "vuex";
import addhomeworkbutton from "@/views/index/components/admin/AddHomeworkButton";
import isAdmin from "@/util/Authority";
export default {
  props: ["cid"],
  components: { "add-homework-button": addhomeworkbutton },
  data: () => ({
    rowsPerPage: [20, { text: "全部", value: -1 }],
    headers: [
      { text: "#", value: "id", align: "center", sortable: true },
      { text: "作业", value: "title", align: "center", sortable: true },
      { text: "日期", value: "insertTime", align: "center", sortable: true },
      { text: "操作", value: "", align: "center", sortable: false },
      { text: "修改", value: "", align: "center", sortable: false }
    ],
    studentheaders: [
      { text: "#", value: "id", align: "center", sortable: true },
      { text: "作业", value: "title", align: "center", sortable: true },
      { text: "日期", value: "insertTime", align: "center", sortable: true },
      { text: "操作", value: "", align: "center", sortable: false }
    ],
    expand: false,
    dialog: false,
    deldialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    homework: { id: null, title: null, content: null }
  }),
  created() {
    this.$store.dispatch(NAMESPACE + "/" + LIST_HOMEWORKS, {
      path: this.$route.path,
      cid: this.cid
    });
  },
  methods: {
    rep(str) {
      return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
    editItem(item) {
      this.homework.id = item.id;
      this.homework.title = item.title;
      this.homework.content = item.content;
      this.dialog = true;
    },
    deleteItem(item) {
      this.homework.id = item.id;
      this.homework.title = item.title;
      this.deldialog = true;
    },
    save() {
      this.$store.dispatch(NAMESPACE + "/" + UPDATE_HOMEWORK, {
        path: this.$route.path + this.homework.id,
        homework: this.homework
      });
      this.dialog = false;
    },
    del() {
      this.$store.dispatch(
        NAMESPACE + "/" + DEL_HOMEWORK,
        this.$route.path + this.homework.id
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
    ...mapState(NAMESPACE, { listHomeworks: state => state.homeworks })
  }
};
</script>
