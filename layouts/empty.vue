<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- <v-switch v-model="theme" label="Dark theme" color="indigo darken-3" hide-details></v-switch> -->
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {},
  data() {
    return {};
  },
  computed: {
    theme: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        this.$vuetify.theme.dark = val;
      }
    }
  },
  mounted() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
