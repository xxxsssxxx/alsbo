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
      <ValidationProvider v-slot="{ errors, valid }" :name="field" :rules="validationRules">
        <v-text-field
          v-model="date"
          :label="label"
          v-bind="attrs"
          v-on="on"
          @change="validDate = valid"
          :error-messages="errors"
          readonly
        ></v-text-field>
      </ValidationProvider>
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
    },
    field: {
      type: String,
      default: () => ""
    },
    validationRules: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      date: "",
      menu: false,
      validDate: true
    };
  },
  methods: {
    handleSave() {
      this.$refs.menu.save(this.date);
      this.$emit("date:change", { value: this.date, valid: this.validDate });
    }
  }
};
</script>
