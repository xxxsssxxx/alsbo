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
          @column:select="handleSelect"
          @row:added="handleRowAdd"
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
          @column:select="handleSelect"
          @row:added="handleRowAdd"
          type="service"
        />
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "@/components/table/Table";
export default {
  name: "Items",
  middleware: "auth",
  components: { Table },
  fetchOnServer: false,
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      saleRows: "items/sale",
      serviceRows: "items/service",
      saleHeaders: "items/saleHeaders",
      serviceHeaders: "items/serviceHeaders",
      saleAvailableColumns: "items/saleAvailableColumns",
      serviceAvailableColumns: "items/serviceAvailableColumns",
      urlPrefix: "urlPrefix"
    }),
    currentUser() {
      return this.$store.state.currentUser;
    },
    sales() {
      const headers = this.translateHeaders(this.saleHeaders);
      return {
        title: this.$t("main.sale_register"),
        headers,
        items: this.saleRows
      };
    },
    service() {
      const headers = this.translateHeaders(this.serviceHeaders);
      return {
        title: this.$t("main.service_register"),
        headers,
        items: this.serviceRows
      };
    }
  },

  watch: {},
  async fetch() {
    const id = this.currentUser._id;
    await this.getAllColumns(id);
    await this.getRows(id, "sale");
    await this.getRows(id, "service");
  },

  created() {},

  methods: {
    async handleSelect({ col, type }) {
      const userId = this.currentUser._id;
      await this.toggleColumn(col, userId, type);
    },
    async handleRowAdd(data) {
      const userId = this.currentUser._id;
      await this.addRow(data, userId);
    }
  }
};
</script>
