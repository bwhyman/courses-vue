<template>
  <v-layout fill-height>
    <v-flex style="padding: 20px">
      <v-hover>
        <v-card
          :to="`/courses/${cid}/experiments`"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
        >
          <v-card-title>
            <div>
              <v-badge right>
                <span slot="badge">{{expNum}}</span>
                <span>
                  <v-icon color="primary" x-large dark>build</v-icon>
                </span>
              </v-badge>
            </div>
          </v-card-title>
        </v-card>
      </v-hover>
    </v-flex>

    <v-flex style="padding: 20px">
      <v-hover>
        <v-card
          :to="`/courses/${cid}/homeworks`"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
        >
          <v-card-title>
            <div>
              <v-badge right>
                <span slot="badge">{{homeworkNum}}</span>
                <span>
                  <v-icon color="primary" x-large dark>extension</v-icon>
                </span>
              </v-badge>
            </div>
          </v-card-title>
        </v-card>
      </v-hover>
    </v-flex>

    <v-flex style="padding: 20px" v-if="$store.state.isAdmin">
      <v-hover>
        <v-card
          :to="`/courses/${cid}/students`"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
        >
          <v-card-title>
            <div>
              <v-badge right>
                <span slot="badge">{{studentNum}}</span>
                <span>
                  <v-icon color="primary" x-large dark>group_add</v-icon>
                </span>
              </v-badge>
            </div>
          </v-card-title>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>
<script>
import { NAMESPACE } from "@/views/index/store/types";
import { mapState } from "vuex";
export default {
  data: () => ({ cid: null }),
  created() {
    this.cid = this.$route.params.cid;
  },
  computed: {
    ...mapState(NAMESPACE, ["expNum", "homeworkNum", "studentNum"])
  }
};
</script>
