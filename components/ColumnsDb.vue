<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg12>
      <p class="display-1">Add columns to DB</p>
      <v-divider></v-divider>
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <form>
          <v-row align="center" justify="start" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="6">
              <ValidationProvider v-slot="{ errors, valid }" name="value" rules="required|min:2">
                <v-text-field
                  v-model.lazy="value"
                  :error-messages="errors"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.value") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="start" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="6">
              <ValidationProvider v-slot="{ errors, valid }" name="type">
                <v-text-field
                  v-model.lazy="type"
                  :error-messages="errors"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.type") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <ValidationProvider v-slot="{ errors, valid }" name="align" rules="required|min:2">
                <v-text-field
                  v-model.lazy="align"
                  :error-messages="errors"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.align") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="sortable" rules="required">
                <v-switch v-model="sortable" :error-messages="errors" inset>
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.sortable") }}</span>
                  </template>
                </v-switch>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="filterable" rules="required">
                <v-switch v-model="filterable" :error-messages="errors" inset>
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.filterable") }}</span>
                  </template>
                </v-switch>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="start" justify-lg="start">
            <v-col cols="12" sm="4" md="4" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="divider" rules="required">
                <v-switch v-model="divider" :error-messages="errors" inset>
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.divider") }}</span>
                  </template>
                </v-switch>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="selected" rules="required">
                <v-switch v-model="selected.sale" :error-messages="errors" inset>
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.selected") }} ({{ $t("main.sale_register") }})</span>
                  </template>
                </v-switch>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="selected" rules="required">
                <v-switch v-model="selected.service" :error-messages="errors" inset>
                  <template v-slot:label>
                    <span class="input__label"
                      >{{ $t("main.fields.selected") }}({{ $t("main.service_register") }})</span
                    >
                  </template>
                </v-switch>
              </ValidationProvider>
            </v-col>
          </v-row>
          <div class="button-group justify-sm-start flex-column flex-md-row mt-4 mb-4 d-flex justify-space-between">
            <v-btn @click="addColumnToDb" small class="mr-md-2 mt-2" color="success">{{
              $t("main.button.submit")
            }}</v-btn>
            <v-btn @click="clear" small class="mr-md-2 mt-2">{{ $t("main.button.clear") }}</v-btn>
          </div>
        </form>
      </ValidationObserver>
      <p class="text-subtitle-1 d-flex align-center">
        <span>Added Columns</span>
      </p>
      <v-divider></v-divider>
      <div v-if="columns.length">
        <v-chip v-for="(column, i) in columns" :key="i" :color="chipColors[column.type] || 'neutral'" class="ma-2">
          {{ column.value }}
        </v-chip>
      </div>
      <p v-else>No added columns</p>
    </v-flex>
  </v-layout>
</template>

<script>
// Please use this component just in case you need to add a columns by UI
import { mapGetters } from "vuex";
export default {
  name: "ColumnsDb",
  data() {
    return {
      value: "",
      sortable: true,
      filterable: true,
      type: "",
      align: "start",
      divider: true,
      selected: {
        sale: true,
        service: true
      },
      chipColors: {
        sale: "primary",
        service: "secondary"
      },
      successMessage: this.$t("main.notification.form.success.saved"),
      errorMessage: this.$t("main.notification.form.title_validation_error")
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      columns: "items/allColumns",
      urlPrefix: "urlPrefix"
    })
  },
  async fetch() {
    const id = this.currentUser._id;
    await this.getAllColumns(id, this.urlPrefix);
  },
  methods: {
    async addColumnToDb() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        const data = {
          value: this.value,
          sortable: this.sortable,
          filterable: this.filterable,
          type: this.type,
          align: this.align,
          divider: this.divider,
          selected: this.selected,
          userId: this.currentUser._id
        };
        await this.addColumn(data, this.currentUser._id);
        this.clear();
      }
    },
    clear() {
      this.text = "";
      this.value = "";
      this.type = "";
      this.align = "end";
      this.sortable = true;
      this.filterable = true;
      this.divider = true;
      this.selected = {
        sale: true,
        service: true
      };
      this.$refs.observer.reset();
    }
  }
};
</script>
