<template>
  <v-card>
    <v-card-text>
      <ul>
        <li v-for="(s, index) in listStudents" :key="index">
          <button @click="showDetail(index)">{{s.name}}</button>
        </li>
      </ul>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <v-btn flat color="primary" @click="showDetail(index - 1)" v-show="hasPrevious">
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          {{listStudents[index].name}}
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="showDetail(index + 1)" v-show="hasNext">
            <v-icon>skip_next</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <prism-editor
            readonly
            v-model="solution"
            language="js"
            :line-numbers="lineNumbers"
            class="my-editor"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  NAMESPACE,
  LIST_STUDENTS,
  GET_HOMEWORKDETAIL
} from "@/views/index/store/types";
import { mapState } from "vuex";
import PrismEditor from "vue-prism-editor";
export default {
  components: { PrismEditor },
  data: () => ({
    dialog: false,
    lineNumbers: true,
    solution: "",
    index: 0
  }),
  created() {
    this.$store.dispatch(
      NAMESPACE + "/" + LIST_STUDENTS,
      this.$route.params.cid
    );
  },
  methods: {
    showDetail(index) {
      this.index = index;
      this.$store
        .dispatch(NAMESPACE + "/" + GET_HOMEWORKDETAIL, {
          cid: this.$route.params.cid,
          hid: this.$route.params.hid,
          sid: this.listStudents[index].id
        })
        .then(hd => {
          this.solution = hd.solution;
          this.dialog = true;
        });
    }
  },
  computed: {
    hasPrevious() {
      if (this.index == 0) {
        return false;
      }
      return true;
    },
    hasNext() {
      if (this.index == this.listStudents.length - 1) {
        return false;
      }
      return true;
    },

    ...mapState(NAMESPACE, { listStudents: state => state.students })
  }
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-speed-dial,
#lateral .v-btn--floating {
  position: absolute;
}
#lateral .v-btn--floating {
  margin: 0 0 16px 16px;
}
</style>
