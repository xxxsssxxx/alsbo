<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg12>
      <p class="display-1">{{ $t("main.navigation.link_administration") }}</p>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Administration",
  middleware: "auth",
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  async fetch() {},
  methods: {}
};
</script>
