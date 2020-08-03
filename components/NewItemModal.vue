<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-for="(field, i) in main" :key="i" cols="12" sm="6" md="6">
            <BaseInput
              :component="field.type"
              :label="$t(`main.table.header.${field.name}`)"
              :items="field.selectOptions"
              :value="{}"
              @select:changed="handleSelectChange($event, field.name)"
              @date:changed="handleDateChange($event, field.name)"
              @textfield:blured="handleBlurString($event, field.name)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(field, i) in additional" :key="i" cols="12" sm="6" md="6">
            <BaseInput
              :component="field.type"
              :label="$t(`main.table.header.${field.name}`)"
              :items="field.selectOptions"
              @select:changed="handleSelectChange($event, field.name)"
              @date:changed="handleDateChange($event, field.name)"
              @textfield:blured="handleBlurString($event, field.name)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(field, i) in conclusive" :key="i" cols="12" sm="6" md="6">
            <BaseInput
              :component="field.type"
              :label="$t(`main.table.header.${field.name}`)"
              :items="field.selectOptions"
              @select:changed="handleSelectChange($event, field.name)"
              @date:changed="handleDateChange($event, field.name)"
              @textfield:blured="handleBlurString($event, field.name)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="handleClose" color="blue darken-1" text>{{ $t("main.button.cancel") }}</v-btn>
      <v-btn @click="handleSave" color="blue darken-1" text>{{ $t("main.button.save") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import BaseInput from "@/components/BaseInput";
export default {
  name: "NewItemModal",
  components: {
    BaseInput
  },
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
  watch: {
    "item.service": {
      handler(newValue, oldValue) {
        if (oldValue && newValue && newValue.id === oldValue.id) return;
        const value = newValue ? newValue.value : "sales";
        const data = {
          value,
          pathToSet: ["service"]
        };
        this.$store.commit("setStoreValue", data);
      }
    }
  },
  methods: {
    handleSelectChange({ value }, field) {
      this.$set(this.item, field, value);
    },
    handleDateChange({ value }, field) {
      this.$set(this.item, field, value);
    },
    handleBlurString({ value }, field) {
      this.$set(this.item, field, value);
    },
    handleClose() {
      this.$emit("modal:cancel");
      this.resetFields();
    },
    handleSave() {
      this.$emit("modal:save", { item: this.item });
      this.resetFields();
    },
    async resetFields() {
      await this.$nextTick();
      this.$set(this, "item", {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
