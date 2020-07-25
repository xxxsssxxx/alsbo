<template>
  <div class="input_wrapper">
    <component
      :is="currentComponent"
      :label="currentLabel"
      :items="currentItems"
      clearable
      hide-selected
      item-text="value"
      item-value="id"
    ></component>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import BaseDatepicker from "@/components/BaseDatepicker";
import { VTextField, VSelect, VTextarea } from "vuetify/lib";
export default {
  name: "BaseInput",
  components: {
    BaseDatepicker,
    VTextField,
    VSelect,
    VTextarea
  },
  props: {
    component: {
      type: String,
      default: () => "string"
    },
    label: {
      type: String,
      default: () => "Label"
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      componentsMap: {
        string: "v-text-field",
        date: "BaseDatepicker",
        number: "v-text-field",
        select: "v-select",
        textarea: "v-textarea"
      }
    };
  },
  computed: {
    currentComponent() {
      return this.componentsMap[this.$props.component];
    },
    currentLabel() {
      return this.$props.label;
    },
    currentItems() {
      return this.$props.items;
    }
  }
};
</script>

<style lang="scss" scoped></style>
