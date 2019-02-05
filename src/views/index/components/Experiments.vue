<template>
  <v-card>
    <admin-exp-table v-if="$store.state.isAdmin"></admin-exp-table>
    <student-exp-table v-if="!$store.state.isAdmin"></student-exp-table>
  </v-card>
</template>
<script>
import { NAMESPACE, LIST_EXPS } from "@/views/index/store/types";

export default {
  components: {
    "admin-exp-table": () =>
      import("@/views/index/components/admin/AdminExpTable"),
    "student-exp-table": () =>
      import("@/views/index/components/student/StudentExpTable")
  },
  created() {
    this.$store.dispatch(NAMESPACE + "/" + LIST_EXPS, this.$route.params.cid);
  }
};
</script>
