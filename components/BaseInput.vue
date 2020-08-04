<template>
  <component
    :is="currentComponent"
    v-model.lazy="value"
    :label="currentLabel"
    :items="currentItems"
    :error-messages="errors"
    v-bind:[fieldType]="true"
    @blur="handleBlur($event)"
    @change="handleChange($event)"
    @date:change="handleDateChange($event)"
    return-object
    clearable
    hide-selected
    item-text="value"
    item-value="id"
  ></component>
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
    },
    fieldType: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      value: "",
      componentsMap: {
        string: "v-text-field",
        date: "BaseDatepicker",
        number: "v-text-field",
        select: "v-select",
        textarea: "v-textarea"
      },
      changeHandlers: {
        select: this.handleSelectChange
      },
      blurHandlers: {
        string: this.handleBlurString,
        number: this.handleBlurString,
        textarea: this.handleBlurString
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
    },
    currentName() {
      return this.$props.name;
    },
    currentErrors() {
      return this.$props.errors;
    },
    currentRules() {
      return "required";
    }
  },
  methods: {
    handleBlur(e, valid) {
      const handler = this.blurHandlers[this.$props.component];
      if (typeof handler === "function") {
        handler();
      }
    },
    handleChange(e, valid) {
      const handler = this.changeHandlers[this.$props.component];
      if (typeof handler === "function") {
        handler();
      }
    },
    handleSelectChange() {
      this.$emit("select:changed", { value: this.value });
    },
    handleDateChange(value) {
      this.$emit("date:changed", { value });
    },
    handleBlurString() {
      this.$emit("textfield:blured", { value: this.value });
    }
  }
};
</script>

<style lang="scss" scoped></style>
