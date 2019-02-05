<template>
  <v-card>
    <v-card-text>
      <span v-for="(s, index ) in students" :key="index">{{index+1}}{{s}};</span>
    </v-card-text>
  </v-card>
</template>
<script>
import { NAMESPACE, LIST_HOMEWORK_UNSUBMITED } from "@/views/index/store/types";
export default {
  data: () => ({
    students: []
  }),
  created() {
    this.$store
      .dispatch(NAMESPACE + "/" + LIST_HOMEWORK_UNSUBMITED, {
        cid: this.$route.params.cid,
        hid: this.$route.params.hid
      })
      .then(students => (this.students = students));
  }
};
</script>
