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
          <template v-for="(hd, index) in listHomeworkDetails">
            <span v-if="hd.homework.id == props.item.id" :key="index">{{hd.completeTime}}</span>
          </template>
        </td>
        <td class="text-xs-center">
          <submit-button v-bind:homework="props.item"></submit-button>
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
  </v-card>
</template>
<script>
import { NAMESPACE, LIST_HOMEWORK_DETAILS } from "@/views/index/store/types";
import { mapState } from "vuex";
import submithomeworkbutton from "@/views/index/components/student/SubmitHomeworkButton";
import PrismEditor from "vue-prism-editor";
export default {
  components: { "submit-button": submithomeworkbutton, PrismEditor },
  data: () => ({
    lineNumbers: true,
    rowsPerPage: [20, { text: "全部", value: -1 }],
    headers: [
      { text: "#", value: "id", align: "center", sortable: true },
      { text: "作业", value: "title", align: "center", sortable: true },
      { text: "详细", value: "content", align: "center", sortable: false },
      { text: "日期", value: "insertTime", align: "center", sortable: true },
      {
        text: "完成时间",
        value: "completeTime",
        align: "center",
        sortable: true
      },
      { text: "操作", value: "", align: "center", sortable: false }
    ],
    expand: false,
    dialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    homework: { id: null, title: null, content: null }
  }),
  created() {
    this.$store.dispatch(
      NAMESPACE + "/" + LIST_HOMEWORK_DETAILS,
      this.$route.params.cid
    );
  },
  methods: {},
  computed: {
    ...mapState(NAMESPACE, {
      listHomeworks: state => state.homeworks,
      listHomeworkDetails: state => state.homeworkDetails
    })
  }
};
</script>
