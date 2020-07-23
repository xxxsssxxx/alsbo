<template>
  <v-row align="center" justify="center" class="flex-column">
    <v-col cols="12" sm="12">
      <client-only>
        <Table
          :title="sales.title"
          :headers="sales.headers"
          :items="sales.items"
          :accessible-columns="translateHeaders(saleAvailableColumns)"
          :current-user="currentUser"
          @column:select="handleSelect($event, 'sale')"
          type="sale"
        />
      </client-only>
    </v-col>
    <v-col cols="12" sm="12">
      <client-only>
        <Table
          :title="service.title"
          :headers="service.headers"
          :items="service.items"
          :accessible-columns="translateHeaders(serviceAvailableColumns)"
          :current-user="currentUser"
          @column:select="handleSelect($event, 'service')"
          type="service"
        />
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "@/components/Table";
export default {
  name: "Items",
  middleware: "auth",
  components: { Table },
  data: () => ({}),
  computed: {
    ...mapGetters({
      saleHeaders: "items/saleHeaders",
      serviceHeaders: "items/serviceHeaders",
      saleAvailableColumns: "items/saleAvailableColumns",
      serviceAvailableColumns: "items/serviceAvailableColumns"
    }),
    currentUser() {
      return this.$store.state.currentUser;
    },
    sales() {
      const headers = this.translateHeaders(this.saleHeaders);
      return {
        title: this.$t("main.sale_register"),
        headers,
        items: this.$store.state.salesItems
      };
    },
    service() {
      const headers = this.translateHeaders(this.serviceHeaders);
      return {
        title: this.$t("main.service_register"),
        headers,
        items: this.$store.state.serviceItems
      };
    }
  },

  watch: {},
  async fetch() {
    const id = this.currentUser._id;
    await this.getAllColumns(id);
  },

  created() {},

  methods: {
    async handleSelect(col, type) {
      const userId = this.currentUser._id;
      await this.toggleColumn(col, userId, type);
    }
  }
};
</script>
