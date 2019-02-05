<template>
  <v-card>
    <v-card>
      <v-card-title>
        {{getCourse.name}}
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
        <v-spacer></v-spacer>
        <router-view name="button" :key="this.$route.path" v-if="$store.state.isAdmin"></router-view>
      </v-card-title>
    </v-card>
    <coursedetail></coursedetail>
    <router-view :key="this.$route.path"></router-view>
  </v-card>
</template>
<script>
import coursedetail from "./CourseDetail";
import { NAMESPACE, GET_COURSE } from "@/views/index/store/types";
import { mapState } from "vuex";
export default {
  components: { coursedetail },
  created() {
    this.$store.dispatch(NAMESPACE + "/" + GET_COURSE, this.$route.params.cid);
  },
  computed: {
    ...mapState(NAMESPACE, { getCourse: state => state.course })
  }
};
</script>
