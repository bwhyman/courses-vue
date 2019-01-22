<template>
  <v-app id="app">
    <fab></fab>
    <v-layout fill-height column>
      <v-layout grow>
        <v-flex shrink style="padding: 20px 10px 0 10px;">
          <side-bar></side-bar>
        </v-flex>
        <v-flex grow style="padding: 20px 45px 0 10px;">
          <v-card
            class="d-inline-block elevation-12"
            style="height: 100%; padding: 10px;width: calc(100vw - 430px);"
          >
            <!-- <keep-alive> -->
            <router-view :key="this.$route.path"></router-view>
            <!-- </keep-alive> -->
          </v-card>
        </v-flex>
      </v-layout>
      <v-flex shrink pa-1>
        <my-footer></my-footer>
      </v-flex>
    </v-layout>
    <alert-dialog></alert-dialog>
  </v-app>
</template>
<script>
import alertdialog from "@/components/AlertDialog.vue";
import fab from "@/views/index/components/commons/FloatingActionButton.vue";
import footer from "@/views/index/components/commons/Footer.vue";
import sidebar from "@/views/index/components/Sidebar";
import { NAMESPACE, LIST_COURSES } from "@/views/index/store/types";
export default {
  name: "app",

  components: {
    fab,
    "side-bar": sidebar,
    "my-footer": footer,
    "alert-dialog": alertdialog
  },
  created() {
    this.$store.dispatch(NAMESPACE + "/" + LIST_COURSES);
  }
};
</script>
<style scoped>
#app {
  background-color: #3f51b5;
}
</style>
