<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-for="(field, i) in main" :key="i" cols="12" sm="6" md="4">
            <v-text-field v-model="item[field]" :label="$t(`main.table.header.${field.name}`)"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(field, i) in additional" :key="i" cols="12" sm="6" md="4">
            <v-text-field v-model="item[field]" :label="$t(`main.table.header.${field.name}`)"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(field, i) in conclusive" :key="i" cols="12" sm="6" md="4">
            <v-text-field v-model="item[field]" :label="$t(`main.table.header.${field.name}`)"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('modal:cancel')" color="blue darken-1" text>{{ $t("main.button.cancel") }}</v-btn>
      <v-btn @click="$emit('modal:save')" color="blue darken-1" text>{{ $t("main.button.save") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewItemModal",
  props: {
    title: {
      type: String,
      default: () => "Title"
    },
    editedItem: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: () => ""
    },
    fields: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      item: {}
    };
  },
  computed: {
    main() {
      return this.$props.fields.main;
    },
    additional() {
      return this.$props.fields.additional;
    },
    conclusive() {
      return this.$props.fields.conclusive;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
