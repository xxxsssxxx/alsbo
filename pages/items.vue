<template>
  <div>
    <v-row align="center" justify="center" class="flex-column">
      <v-col cols="12" sm="12">
        <client-only>
          <Table
            :title="sales.title"
            :headers="sales.headers"
            :items="sales.items"
            :accessible-columns="translateHeaders(saleAvailableColumns)"
            :current-user="currentUser"
            :selected="selectedRows.sale"
            @column:select="handleColumnSelect"
            @row:added="handleRowAdd"
            table="sale"
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
            :selected="selectedRows.service"
            @column:select="handleColumnSelect"
            @row:added="handleRowAdd"
            table="service"
          />
        </client-only>
      </v-col>
    </v-row>
    <v-snackbar :value="!!allSelected.length" :timeout="-1" color="secondary">
      <span class="display-1 text-center">{{ allSelected.length }}</span>
      <span v-for="(dot, i) in allSelected" :key="i" :class="`dot ${dotClass(dot)}`"></span>
      <template v-slot:action="{ attrs }">
        <v-btn @click="handleBulkRowDelete" v-bind="attrs" color="error mr-2" small>{{
          $t("main.button.delete")
        }}</v-btn>
        <v-btn @click="handleRowUncheck" v-bind="attrs" color="neutral" small>{{ $t("main.button.cancel") }}</v-btn>
      </template>
    </v-snackbar>
  </div>
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
      selectedRows: "items/selectedRows",
      urlPrefix: "urlPrefix",
      currentUser: "currentUser"
    }),
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
    },
    allSelected() {
      let rows = [];
      Object.values(this.selectedRows).forEach(table => {
        rows = [...rows, ...table];
      });
      return rows || [];
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
    async handleColumnSelect({ col, type }) {
      const userId = this.currentUser._id;
      await this.loadingStateManager(this.toggleColumn, col, userId, type);
      this.notify();
    },
    async handleRowAdd(data) {
      const userId = this.currentUser._id;
      await this.loadingStateManager(this.addRow, data, userId);
      this.notify();
    },
    dotClass(dot) {
      const service = dot.service.value;
      if (service !== "sales") return "neutral";
      return "primary";
    },
    async handleBulkRowDelete() {
      const rows = this.allSelected;
      const userId = this.currentUser._id;
      await this.loadingStateManager(this.rowBulkDelete, userId, rows);
      this.handleRowUncheck();
      this.notify();
    },
    handleRowUncheck() {
      this.$store.commit("items/setStoreValue", {
        value: {},
        pathToSet: ["selectedRows"]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>
