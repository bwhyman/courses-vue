<template>
  <v-card>
    <admin-table v-if="$store.state.isAdmin"></admin-table>
    <student-table v-if="!$store.state.isAdmin"></student-table>
  </v-card>
</template>
<script>
import { NAMESPACE, LIST_HOMEWORKS } from "@/views/index/store/types";
export default {
  components: {
    "admin-table": () =>
      import("@/views/index/components/admin/AdminHomeworkTable"),
    "student-table": () =>
      import("@/views/index/components/student/StudentHomeworkTable")
  },
  created() {
    this.$store.dispatch(
      NAMESPACE + "/" + LIST_HOMEWORKS,
      this.$route.params.cid
    );
  }
};
</script>
