<template>
  <v-layout row justify-center>
    <v-dialog v-model="getLoading" persistent fullscreen content-class="loading-dialog">
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <span style="position: absolute">{{(getLoaded/1024/1024).toFixed(2)}} MB</span>
          <v-progress-circular indeterminate :size="100" :width="7" color="purple"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
<script>
import { NAMESPACE } from "@/views/index/store/types";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(NAMESPACE, {
      getLoaded: state => state.loaded,
      getLoading: state => state.loading
    })
  }
};
</script>

<style scoped>
.loading-dialog {
  background-color: #303030;
}
</style>
