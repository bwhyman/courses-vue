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
          <template v-for="(ed, index) in listExpDetails">
            <span v-if="ed.experiment.id == props.item.id" :key="index">{{ed.completeTime}}</span>
          </template>
        </td>
        <td class="text-xs-center">
          <submit-button v-bind:experiment="props.item"></submit-button>
          <template v-for="(ed, index) in listExpDetails">
            <v-btn
              color="info"
              dark
              @click="download(props.item.id, ed.id)"
              v-if="ed.experiment.id == props.item.id"
              :key="index"
            >
              <v-icon>cloud_download</v-icon>
            </v-btn>
          </template>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import {
  NAMESPACE,
  DOWNLOAD_EXP,
  LIST_EXP_DETAILS
} from "@/views/index/store/types";
import { mapState } from "vuex";
import submitbutton from "@/views/index/components/student/SubmitExpButton";
import progresscircular from "@/components/ProgressCircular";
export default {
  components: {
    "submit-button": submitbutton,
    "progress-circular": progresscircular
  },
  data() {
    return {
      rowsPerPage: [20, { text: "全部", value: -1 }],
      headers: [
        { text: "#", value: "id", align: "center", sortable: true },
        { text: "实验", value: "name", align: "center", sortable: true },
        { text: "日期", value: "insertTime", align: "center", sortable: true },
        {
          text: "提交日期",
          value: "insertTime",
          align: "center",
          sortable: true
        },
        { text: "操作", value: "", align: "center", sortable: false }
      ]
    };
  },
  created() {
    this.$store.dispatch(
      NAMESPACE + "/" + LIST_EXP_DETAILS,
      this.$route.params.cid
    );
  },
  methods: {
    download(expid, edid) {
      this.$store.dispatch(NAMESPACE + "/" + DOWNLOAD_EXP, {
        cid: this.$route.params.cid,
        expid: expid,
        edid: edid
      });
    }
  },

  computed: {
    ...mapState(NAMESPACE, {
      listExps: state => state.exps,
      listExpDetails: state => state.expDetails
    })
  }
};
</script>
