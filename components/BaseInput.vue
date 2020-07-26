<template>
  <div class="input_wrapper">
    <component
      :is="currentComponent"
      v-model="value"
      :label="currentLabel"
      :items="currentItems"
      v-bind:[fieldType]="true"
      @blur="handleBlur"
      @change="handleChange"
      @date:change="handleDateChange"
      return-object
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
    },
    fieldType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newValue: "",
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
    value: {
      get() {
        return this.$props.value || "";
      },
      set(value) {
        this.newValue = value;
      }
    }
  },
  methods: {
    handleBlur() {
      const handler = this.blurHandlers[this.$props.component];
      if (typeof handler === "function") {
        handler();
      }
    },
    handleChange() {
      const handler = this.changeHandlers[this.$props.component];
      if (typeof handler === "function") {
        handler();
      }
    },
    handleSelectChange() {
      this.$emit("select:changed", { value: this.newValue });
    },
    handleDateChange(value) {
      this.$emit("date:changed", { value });
    },
    handleBlurString() {
      this.$emit("textfield:blured", { value: this.newValue });
    }
  }
};
</script>

<style lang="scss" scoped></style>
