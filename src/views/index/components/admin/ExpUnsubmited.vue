<template>
  <v-card>
    <v-card-text>
      <span v-for="(s, index ) in students" :key="index">{{index+1}}{{s}};</span>
    </v-card-text>
  </v-card>
</template>
<script>
import { NAMESPACE, LIST_EXP_UNSUBMITED } from "@/views/index/store/types";
export default {
  data: () => ({
    students: []
  }),
  created() {
    this.$store
      .dispatch(NAMESPACE + "/" + LIST_EXP_UNSUBMITED, {
        cid: this.$route.params.cid,
        expid: this.$route.params.expid
      })
      .then(students => (this.students = students));
  }
};
</script>
