<template>
  <div>
    <v-menu
      v-model="menudate"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field v-model="date" label="日期" prepend-icon="event" readonly v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="menudate = false"></v-date-picker>
    </v-menu>

    <v-menu
      ref="menu"
      v-model="menutime"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field v-model="time" label="时间" prepend-icon="access_time" readonly v-on="on"></v-text-field>
      </template>
      <v-time-picker
        v-if="menutime"
        format="24hr"
        v-model="time"
        full-width
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    time: null,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menudate: false,
    menutime: false
  })
};
</script>
