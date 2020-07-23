<template>
  <v-toolbar flat class="primary toolbar-small">
    <v-row align="center" justify="center" justify-sm="space-around">
      <v-col cols="12" sm="5" class="d-flex">
        <v-toolbar-title class="text--text">{{ title }}</v-toolbar-title>
        <v-divider v-if="$vuetify.breakpoint.name !== 'xs'" class="mx-4" inset vertical></v-divider>
      </v-col>
      <v-col cols="12" sm="7">
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <div class="d-flex align-center justify-space-between justify-sm-end">
              <v-btn v-bind="attrs" v-on="on" color="success" class="mr-2" small>{{ $t("main.modal.new_item") }}</v-btn>
              <BaseAddMenu
                :tooltip="columnsButtonTooltip"
                :component="'ColumnsList'"
                :options="columnsListOptions"
                @column:select="toggleSelectedColumn"
              />
            </div>
          </template>
          <NewItemModal :title="formTitle" :item="editedItem" @modal:cancel="close" @modal:save="save" />
        </v-dialog>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
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
    type: {
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
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    availableColumns() {
      return this.$props.accessibleColumns;
    },
    columnsListOptions() {
      return {
        accessibleColumns: this.availableColumns,
        type: this.type
      };
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    toggleSelectedColumn(col) {
      this.$emit("column:select", col);
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
