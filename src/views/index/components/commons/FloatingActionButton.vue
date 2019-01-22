<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      top
      right
      direction="bottom"
      open-on-hover
      transition="slide-y-reverse-transition"
    >
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="green">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="logout">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>
<script>
export default {
  data() {
    return { fab: false };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      window.location.href = "/login.html";
    }
  }
};
</script>
<style scoped>
#create .v-speed-dial {
  position: absolute;
  right: 20px;
  top: 40px;
  height: 70px;
  z-index: 999;
}

#create .v-btn--floating {
  position: relative;
  z-index: 999;
}
</style>
