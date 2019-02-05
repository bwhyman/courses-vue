<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="listStudents"
      :search="search"
      class="elevation-1"
      :rows-per-page-items="rowsPerPage"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.index+1 }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.clazz }}</td>
        <td class="text-xs-center">{{ props.item.number }}</td>
        <td class="justify-center layout px-0">
          <v-icon small color="primary" dark class="mr-2" @click="editItem(props.item)">edit</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">重置密码: {{student.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-flex xs12>学生密码将被重置为学号</v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="save">
            <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  LIST_STUDENTS,
  NAMESPACE,
  UPDATE_STUDENT_PASSWORD
} from "@/views/index/store/types";
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      rowsPerPage: [20, { text: "全部", value: -1 }],
      headers: [
        { text: "#", value: "", align: "center", sortable: true },
        { text: "姓名", value: "name", align: "center", sortable: true },
        { text: "班级", value: "clazz", align: "center", sortable: true },
        { text: "学号", value: "number", align: "center", sortable: true },
        { text: "操作", value: "name", align: "center", sortable: false }
      ],
      dialog: false,
      student: { id: null, name: null, number: null },
      students: []
    };
  },
  created() {
    this.$store.dispatch(
      NAMESPACE + "/" + LIST_STUDENTS,
      this.$route.params.cid
    );
  },
  methods: {
    editItem(item) {
      this.student.number = item.number;
      this.student.name = item.name;
      this.dialog = true;
    },
    save() {
      this.$store
        .dispatch(
          NAMESPACE + "/" + UPDATE_STUDENT_PASSWORD,
          this.student.number
        )
        .then(() => {
          this.dialog = false;
        });
    }
  },
  computed: {
    ...mapState(NAMESPACE, { listStudents: state => state.students })
  }
};
</script>
