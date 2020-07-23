<template>
  <v-card>
    <v-card-title>{{ $t("main.table.toolbar.available_columns") }}</v-card-title>
    <v-divider></v-divider>
    <v-list dense flat>
      <v-list-item v-for="(column, i) in availableColumns" :key="i">
        <v-list-item-action>
          <v-checkbox
            v-model="column.selected[tableType]"
            :label="column.text"
            @change="toggleSelectedColumn(column)"
            dense
            color="primary"
          ></v-checkbox>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="$emit('menu:close')" x-small text>{{ $t("main.button.cancel") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ColumnsList",
  props: {
    accessibleColumns: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    availableColumns() {
      // Check if there is an option object -> opened in a BaseMenu component
      const optionsColumns = this.$props.options.accessibleColumns;
      const columns = optionsColumns || this.$props.accessibleColumns;
      return columns;
    },
    tableType() {
      // Check if there is an option object -> opened in a BaseMenu component
      const optionsType = this.$props.options.type;
      const type = optionsType || this.$props.type;
      return type;
    }
  },
  methods: {
    toggleSelectedColumn(col) {
      this.$emit("column:select", col);
    }
  }
};
</script>

<style lang="scss" scoped></style>
