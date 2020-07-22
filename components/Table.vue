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
        class="elevation-3"
      >
        <template #top>
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
                      <v-btn v-bind="attrs" v-on="on" color="success" class="mr-2" small>{{
                        $t("main.modal.new_item")
                      }}</v-btn>
                      <v-menu v-model="menu" :nudge-width="200" close-on-click offset-x>
                        <template #activator="{ on: click }">
                          <v-tooltip bottom>
                            <template #activator="{ on: hover }">
                              <v-btn v-on="{ ...hover, ...click }" fab color="neutral" x-small class="mr-2">
                                <v-icon dark>mdi-plus</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $t("main.table.toolbar.new_columns") }}</span>
                          </v-tooltip>
                        </template>

                        <v-card>
                          <v-card-title>{{ $t("main.table.toolbar.available_columns") }}</v-card-title>
                          <v-divider></v-divider>
                          <v-list dense flat>
                            <v-list-item-group v-model="activeColumns" multiple dense>
                              <v-list-item v-for="(column, i) in availableColumns" :key="i">
                                <template #default="{ active, toggle }">
                                  <v-list-item-action>
                                    <v-checkbox
                                      v-model="column.active"
                                      @click="toggle"
                                      dense
                                      color="primary"
                                    ></v-checkbox>
                                  </v-list-item-action>
                                  <v-list-item-content dense>
                                    <v-list-item-title dense>{{ column.text }}</v-list-item-title>
                                  </v-list-item-content>
                                </template>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn @click="menu = false" x-small text>{{ $t("main.button.cancel") }}</v-btn>
                            <v-btn @click="menu = false" x-small color="success" text>{{
                              $t("main.button.save")
                            }}</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="close" color="blue darken-1" text>Cancel</v-btn>
                      <v-btn @click="save" color="blue darken-1" text>Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-toolbar>
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
          <div class="table-no-data">
            <v-icon>mdi-database-search</v-icon>
            <p>{{ $t("main.alerts.register.no_items") }}</p>
          </div>
        </template>
        <template #footer.page-text="props">
          {{ props.pageStart }}-{{ props.pageStop }} {{ $t("main.table.toolbar.text_off") }} {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Table",
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
    }
  },
  data: () => ({
    dialog: false,
    menu: false,
    selectedRows: [],
    activeColumns: [],
    availableColumns: [],
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
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
