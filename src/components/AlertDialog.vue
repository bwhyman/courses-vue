<template>
  <div class="text-xs-center">
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title class="headline red lighten-2" primary-title>异常</v-card-title>

        <v-card-text>{{showErrorMessage}}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { SHOW_EXCEPTION } from "@/store/types";
export default {
  computed: {
    showErrorMessage() {
      return this.$store.state.exception;
    },
    showDialog: {
      get() {
        if (this.$store.state.exception != null) {
          return true;
        }
        return false;
      },
      set() {
        this.$store.commit(SHOW_EXCEPTION, null);
      }
    }
  }
};
</script>
