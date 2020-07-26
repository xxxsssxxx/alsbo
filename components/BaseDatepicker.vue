<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="date" :label="label" v-bind="attrs" v-on="on" readonly></v-text-field>
    </template>
    <v-date-picker v-model="date" :first-day-of-week="4" :locale="locale" no-title scrollable show-current show-week>
      <v-spacer></v-spacer>
      <v-btn @click="menu = false" text color="primary">Cancel</v-btn>
      <v-btn @click="handleSave" text color="primary">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "BaseDatepicker",
  props: {
    label: {
      type: String,
      default: "Date"
    },
    locale: {
      type: String,
      default: "en"
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },
  methods: {
    handleSave() {
      this.$refs.menu.save(this.date);
      this.$emit("date:change", this.date);
    }
  }
};
</script>
