<template>
  <v-layout>
    <ColumnsDb />
  </v-layout>
</template>

<script>
import ColumnsDb from "../components/ColumnsDb";
export default {
  name: "Administration",
  middleware: "auth",
  components: {
    ColumnsDb
  },
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
