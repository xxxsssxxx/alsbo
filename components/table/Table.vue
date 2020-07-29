<template>
  <v-row align="center" justify="center" class="flex-column">
    <v-col cols="12" sm="12">
      <v-data-table
        :headers="headers"
        :headers-length="headers.length"
        :items="items"
        :show-select="!!items.length"
        :server-items-length="15"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-text': $t('main.table.toolbar.items_per_page_text'),
          showCurrentPage: true
        }"
        v-model="selectedRows"
        item-key="_id"
        class="elevation-3"
        calculate-widths
      >
        <template #top>
          <TableToolbar
            :title="title"
            :accessible-columns="availableColumns"
            :type="type"
            @column:select="handleColumnToggle"
            @row:added="handleRowAdd"
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
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialog: false,
      menu: false,
      selectedRows: [],
      activeColumns: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },

  computed: {
    availableColumns() {
      return this.$props.accessibleColumns;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    selectedRows(rows) {
      this.$store.commit("items/setStoreValue", {
        value: rows,
        pathToSet: ["selectedRows", this.type],
        toPush: true
      });
    }
  },

  methods: {
    handleColumnToggle(col) {
      this.$emit("column:select", col);
    },
    handleRowAdd(data) {
      this.$emit("row:added", data);
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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
