<template>
  <v-card class="d-inline-block elevation-12">
    <v-navigation-drawer floating permanent stateless value="true">
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>

        <v-list-group value="true" prepend-icon="school">
          <v-list-tile slot="activator">
            <v-list-tile-title>课程</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(c, index) in listCourses" :key="index" :to="`/courses/${c.id}`">
            <v-list-tile-title>{{c.name}}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>poll</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-layout justify-center v-if="$store.state.isAdmin">
          <v-list-tile>
            <add-course-button></add-course-button>
          </v-list-tile>
        </v-layout>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { NAMESPACE } from "@/views/index/store/types";
import { mapState } from "vuex";
export default {
  name: "sidebar",
  components: {
    "add-course-button": () =>
      import("@/views/index/components/admin/AddCourseButton")
  },
  computed: {
    ...mapState(NAMESPACE, { listCourses: state => state.courses })
  }
};
</script>
