<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn slot="activator" color="primary" dark>
      <v-icon>settings_ethernet</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">{{homework.title}}</span>
      </v-card-title>
      <prism-editor
        v-model="getDetail.solution"
        language="js"
        :line-numbers="lineNumbers"
        class="my-editor"
        style="min-height: 250px"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon color="red" dark v-if="!verifyDeadLineTime" title="过期">report_problem</v-icon>
        <v-btn color="blue darken-1" flat @click="save" v-if="verifyDeadLineTime">
          <v-icon>done</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { NAMESPACE, SUBMIT_HOMEWORK } from "@/views/index/store/types";
import PrismEditor from "vue-prism-editor";
import { mapState } from "vuex";
export default {
  props: ["homework"],
  components: { PrismEditor },
  data: () => ({
    lineNumbers: true,
    dialog: false,
    rules: { requiredRules: [v => !!v || "不能为空"] },
    homeworkDetail: { solution: "", deadLineTime: null }
  }),
  methods: {
    save() {
      this.$store.dispatch(NAMESPACE + "/" + SUBMIT_HOMEWORK, {
        cid: this.$route.params.cid,
        hid: this.homework.id,
        detail: this.getDetail
      });
      this.dialog = false;
    }
  },
  computed: {
    verifyDeadLineTime() {
      let deadLine = new Date(this.homework.deadLineTime);
      let now = new Date();
      if (now.getTime() > deadLine.getTime()) {
        return false;
      }
      return true;
    },
    getDetail() {
      let ed = this.listHomeworkDetails.find(
        hd => hd.homework.id == this.homework.id
      );
      if (!ed || ed.id == null) {
        ed = this.homeworkDetail;
      }
      return ed;
    },
    ...mapState(NAMESPACE, {
      listHomeworkDetails: state => state.homeworkDetails
    })
  }
};
</script>
<style scoped>
</style>
