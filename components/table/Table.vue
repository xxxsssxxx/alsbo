<template>
  <v-row align="center" justify="center" class="flex-column">
    <v-col cols="12" sm="12">
      <v-data-table
        :headers="headers"
        :headers-length="headers.length"
        :items="items"
        :show-select="!!items.length"
        :server-items-length="itemsPerPage"
        :items-per-page="itemsPerPage"
        @pagination="handlePagination"
        :footer-props="{
          'items-per-page-text': $t('main.table.toolbar.items_per_page_text'),
          showCurrentPage: true
        }"
        v-model="selectedRows"
        @dblclick:row="handleDblClick"
        item-key="_id"
        class="elevation-3"
        calculate-widths
      >
        <template #item.invoice_status.value="{ item }">
          <v-chip :color="statusColor(item.invoice_status)" dark>{{ item.invoice_status.value }}</v-chip>
        </template>
        <template #top>
          <TableToolbar
            :title="title"
            :accessible-columns="availableColumns"
            :table="table"
            :editing-item="editingItem"
            @column:select="handleColumnToggle"
            @row:added="handleRowAdd"
            @row:edited="handleRowEdit"
          />
        </template>
        <template #item.actions="{ item }">
          <v-icon @click="editItem(item)" small class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon @click="deleteItem(item)" small>
            mdi-delete
          </v-icon>
        </template>
        <template #no-data>
          <TableNoData />
        </template>
        <template #footer.page-text="props">
          {{ props.pageStart }}-{{ props.pageStop }} {{ $t("main.table.toolbar.text_off") }} {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import TableToolbar from "@/components/table/TableToolbar";
import TableNoData from "@/components/table/TableNoData";
export default {
  name: "Table",
  components: {
    TableToolbar,
    TableNoData
  },
  props: {
    title: {
      type: String,
      default: () => "Items"
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    accessibleColumns: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: Object,
      default: () => {}
    },
    table: {
      type: String,
      default: ""
    },
    selected: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: () => 15
    }
  },
  data() {
    return {
      newSelected: [],
      activeColumns: [],
      editingItem: {}
    };
  },

  computed: {
    availableColumns() {
      return this.$props.accessibleColumns;
    },
    selectedRows: {
      get() {
        return this.$props.selected;
      },
      set(val) {
        this.newSelected = val;
      }
    }
  },

  watch: {
    newSelected(rows) {
      this.$store.commit("items/setStoreValue", {
        value: rows,
        pathToSet: ["selectedRows", this.$props.table],
        toPush: true
      });
    }
  },

  methods: {
    handleColumnToggle(col) {
      this.$emit("column:select", col);
    },
    handleRowAdd({ row }) {
      this.$emit("row:added", { row, offset: this.itemsPerPage });
    },
    async handleRowEdit({ row, oldTable }) {
      this.$emit("row:edited", { row, offset: this.itemsPerPage, oldTable });
      await this.$nextTick();
      this.$set(this, "editingItem", {});
    },
    handlePagination(e) {
      const { itemsPerPage } = e;
      if (this.itemsPerPage !== itemsPerPage) {
        this.$emit("items-per-page:changed", { itemsPerPage: this.itemsPerPage, table: this.$props.table });
      }
    },
    statusColor(status) {
      const colors = {
        1: "success",
        2: "warning"
      };
      return colors[status.id];
    },
    handleDblClick(e, data) {
      const { item } = data;
      const itemCopy = this.deepSimpleCopy(item);
      this.$set(this, "editingItem", itemCopy);
    }
  }
};
</script>
<style lang="scss">
.table-no-data {
  padding: 50px;
}
@media only screen and (max-width: 600px) {
  .toolbar-small {
    height: 110px !important;
  }
  .toolbar-small > .v-toolbar__content {
    height: 110px !important;
  }
}
</style>
