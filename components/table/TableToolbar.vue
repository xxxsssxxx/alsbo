<template>
  <v-toolbar flat class="primary toolbar-small">
    <v-row align="center" justify="center" justify-sm="space-around">
      <v-col cols="12" sm="5" class="d-flex">
        <v-toolbar-title class="text--text">{{ title }}</v-toolbar-title>
        <v-divider v-if="$vuetify.breakpoint.name !== 'xs'" class="mx-4" inset vertical></v-divider>
      </v-col>
      <v-col cols="12" sm="7">
        <v-dialog v-model="dialog" max-width="500px" scrollable>
          <template #activator="{ on, attrs }">
            <div class="d-flex align-center justify-space-between justify-sm-end">
              <v-btn v-bind="attrs" @click.stop="openModal" color="success" class="mr-2" small>{{
                $t("main.modal.new_item")
              }}</v-btn>
              <BaseAddMenu
                :tooltip="columnsButtonTooltip"
                :component="'ColumnsList'"
                :options="columnsListOptions"
                @column:select="toggleSelectedColumn"
              />
            </div>
          </template>
          <NewItemModal
            v-if="dialog"
            :title="formTitle"
            :item="editedItem"
            :fields="fields"
            @modal:cancel="handleClose"
            @modal:save="handleSave"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import BaseAddMenu from "@/components/BaseAddMenu";
import NewItemModal from "@/components/NewItemModal";
export default {
  name: "TableToolbar",
  components: {
    BaseAddMenu,
    NewItemModal
  },
  props: {
    title: {
      type: String,
      default: () => "Title"
    },
    accessibleColumns: {
      type: Array,
      default: () => []
    },
    table: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialog: false,
      columnsButtonTooltip: this.$t("main.table.toolbar.new_columns"),
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
    ...mapGetters({
      urlPrefix: "urlPrefix",
      fields: "items/newModalFields",
      tableToSave: "items/tableToSave"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    availableColumns() {
      return this.$props.accessibleColumns;
    },
    columnsListOptions() {
      return {
        accessibleColumns: this.availableColumns,
        type: this.table
      };
    }
  },
  methods: {
    toggleSelectedColumn(col) {
      this.$emit("column:select", col);
    },
    async openModal() {
      this.setLoadingState(true);
      if (!this.fields) {
        await this.getFieldsFor("NewItemModal", this.urlPrefix);
      }
      this.setLoadingState(false);
      this.dialog = true;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    handleClose() {
      this.dialog = false;
    },
    handleSave({ item }) {
      item.table = this.tableToSave;
      this.$emit("row:added", { row: item });
      this.handleClose();
    }
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .toolbar-small {
    height: 110px !important;
  }
  .toolbar-small > .v-toolbar__content {
    height: 110px !important;
  }
}
</style>
