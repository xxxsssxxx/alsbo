<template>
  <v-row align="center" justify="center" class="flex-column">
    <v-col cols="12" sm="12">
      <client-only>
        <Table :title="sales.title" :headers="sales.headers" :items="sales.items" />
      </client-only>
    </v-col>
    <v-col cols="12" sm="12">
      <client-only>
        <Table :title="service.title" :headers="service.headers" :items="service.items" />
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import Table from "@/components/Table";
export default {
  name: "Items",
  middleware: "auth",
  components: { Table },
  data: () => ({}),

  computed: {
    sales() {
      return {
        title: this.$t("main.sale_register"),
        headers: this.$store.state.salesColumns,
        items: this.$store.state.salesItems
      };
    },
    service() {
      return {
        title: this.$t("main.service_register"),
        headers: this.$store.state.serviceColumns,
        items: this.$store.state.serviceItems
      };
    }
  },

  watch: {},

  created() {},

  methods: {}
};
</script>
