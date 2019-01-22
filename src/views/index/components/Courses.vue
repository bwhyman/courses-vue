<template>
  <v-card>
    <v-card>
      <v-card-title>
        {{getCourseName}}
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
        <v-spacer></v-spacer>
        <edit-course-button v-if="isAdmin"></edit-course-button>
      </v-card-title>
    </v-card>

    <v-layout fill-height>
      <v-flex style="padding: 20px">
        <v-hover>
          <v-card
            :to="{path: '/courses/' + cid + '/experiments/'}"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
          >
            <v-card-title>
              <div>
                <v-badge right>
                  <span slot="badge">{{expNum}}</span>
                  <span class="headline">实验</span>
                </v-badge>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>

      <v-flex style="padding: 20px">
        <v-hover>
          <v-card
            :to="{path: '/courses/' + cid + '/homeworks/'}"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
          >
            <v-card-title>
              <div>
                <v-badge right>
                  <span slot="badge">{{homeworkNum}}</span>
                  <span class="headline">作业</span>
                </v-badge>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>

      <v-flex style="padding: 20px" v-if="isAdmin">
        <v-hover>
          <v-card
            :to="{path: '/admin/courses/' + cid + '/students/'}"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
          >
            <v-card-title>
              <div>
                <v-badge right>
                  <span slot="badge">{{studentNum}}</span>
                  <span class="headline">学生</span>
                </v-badge>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import { NAMESPACE, GET_COURSE } from "@/views/index/store/types";
import editcoursebutton from "@/views/index/components/admin/EditCourseButton";
import { mapState } from "vuex";
import isAdmin from "@/util/Authority";
export default {
  props: ["cid"],
  components: { "edit-course-button": editcoursebutton },
  created() {
    this.$store.dispatch(NAMESPACE + "/" + GET_COURSE, {
      path: this.$route.path,
      cid: this.cid
    });
  },
  computed: {
    isAdmin() {
      return isAdmin();
    },
    getCourseName() {
      return this.$store.getters[NAMESPACE + "/getCourseName"](this.cid);
    },
    ...mapState(NAMESPACE, ["expNum", "homeworkNum", "studentNum"])
  }
};
</script>
