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
            @column:select="handleColumnSelect"
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
            @column:select="handleColumnSelect"
            @row:added="handleRowAdd"
            type="service"
          />
        </client-only>
      </v-col>
    </v-row>
    <v-bottom-sheet :value="selectedRows.length" hide-overlay inset persistent max-width="300">
      <v-sheet class="secondary" height="100px" width="100%">
        <div class="bottom-sheet_wrapper secondary">
          <v-row align="center" justify="center">
            <v-col cols="3" class="d-flex justify-center">
              <span class="display-1 text-center">{{ selectedRows.length }}</span>
              <span v-for="(dot, i) in selectedRows" :key="i" :class="`dot ${dotClass(dot)}`"></span>
            </v-col>
            <v-col cols="8" class="d-flex justify-end">
              <v-btn @click="handleRowDelete" color="error mr-2" small>{{ $t("main.button.delete") }}</v-btn>
              <v-btn @click="handleRowUncheck" color="neutral" small>{{ $t("main.button.cancel") }}</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </v-bottom-sheet>
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
      await this.toggleColumn(col, userId, type);
    },
    async handleRowAdd(data) {
      const userId = this.currentUser._id;
      await this.addRow(data, userId);
    },
    dotClass(dot) {
      const service = dot.service.value;
      if (service !== "sales") return "neutral";
      return "primary";
    },
    async handleRowDelete() {},
    async handleRowUncheck() {}
  }
};
</script>
<style lang="scss" scoped>
.bottom-sheet_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .dot {
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
}
</style>
