<template>
  <div>
    <span v-for="(s, index ) in students" :key="index">{{index+1}}{{s}};</span>
  </div>
</template>
<script>
import { NAMESPACE, LIST_EXP_UNSUBMITED } from "@/views/index/store/types";
export default {
  data: () => ({
    students: []
  }),
  created() {
    this.$store
      .dispatch(NAMESPACE + "/" + LIST_EXP_UNSUBMITED, this.$route.path)
      .then(students => (this.students = students));
  },
  computed: {
    //...mapState({ listStudents: state => state.expUnStudents })
  }
};
</script>
