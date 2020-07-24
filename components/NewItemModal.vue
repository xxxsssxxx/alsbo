<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-for="(field, i) in mainFields" :key="i" cols="12" sm="6" md="4">
            <v-text-field v-model="item[field]" :label="$t(`main.table.header.${field}`)"></v-text-field>
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
    item: {
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
  data() {},
  computed: {
    mainFields() {
      return this.$props.fields.main;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
