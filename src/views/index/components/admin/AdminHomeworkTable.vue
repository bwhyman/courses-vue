<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="listHomeworks"
      :expand="expand"
      class="elevation-1"
      :rows-per-page-items="rowsPerPage"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.index+1 }}</td>
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">
          <v-icon color="primary" @click="props.expanded = !props.expanded">more</v-icon>
        </td>
        <td class="text-xs-center">{{ props.item.insertTime }}</td>
        <td class="text-xs-center">
          <v-btn color="info" dark :to="`homeworks/${props.item.id}/unsubmited`">
            <v-icon>visibility_off</v-icon>
          </v-btn>
          <v-btn color="info" dark :to="`homeworks/${ props.item.id}/zip`">XXX</v-btn>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small color="primary" dark class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small color="primary" dark @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card>
          <v-card-text>
            <prism-editor
              readonly
              v-model="props.item.content"
              language="js"
              :line-numbers="lineNumbers"
              class="my-editor"
            />
          </v-card-text>
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
  UPDATE_HOMEWORK,
  DEL_HOMEWORK
} from "@/views/index/store/types";
import { mapState } from "vuex";
import PrismEditor from "vue-prism-editor";
export default {
  components: { PrismEditor },
  data: () => ({
    rowsPerPage: [20, { text: "全部", value: -1 }],
    headers: [
      { text: "#", value: "id", align: "center", sortable: true },
      { text: "作业", value: "title", align: "center", sortable: true },
      { text: "详细", value: "content", align: "center", sortable: false },
      { text: "日期", value: "insertTime", align: "center", sortable: true },
      { text: "操作", value: "", align: "center", sortable: false },
      { text: "修改", value: "", align: "center", sortable: false }
    ],
    lineNumbers: true,
    expand: false,
    dialog: false,
    deldialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    homework: { id: null, title: null, content: null }
  }),

  methods: {
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
        hid: this.homework.id,
        cid: this.$route.params.cid,
        homework: this.homework
      });
      this.dialog = false;
    },
    del() {
      this.$store.dispatch(NAMESPACE + "/" + DEL_HOMEWORK, {
        hid: this.homework.id,
        cid: this.$route.params.cid
      });
      this.deldialog = false;
    }
  },
  computed: {
    ...mapState(NAMESPACE, { listHomeworks: state => state.homeworks })
  }
};
</script>
