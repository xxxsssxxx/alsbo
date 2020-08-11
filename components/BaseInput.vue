<template>
  <div class="input_wrapper">
    <ValidationProvider v-slot="{ errors, valid }" :name="field" :rules="currentRules">
      <component
        :is="currentComponent"
        v-model="input"
        :label="label"
        :field="field"
        :validation-rules="currentRules"
        :items="items"
        :error-messages="errors"
        :key="field"
        v-bind:[fieldType]="true"
        @blur="handleBlur($event, valid)"
        @change="handleChange($event, valid)"
        @date:change="handleDateChange($event, valid)"
        return-object
        clearable
        hide-selected
        item-text="value"
        item-value="id"
      ></component>
    </ValidationProvider>
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
    },
    field: {
      type: String,
      default: ""
    },
    rules: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Boolean, String, Object, Date],
      default: () => ""
    }
  },
  data() {
    return {
      input: this.$props.value,
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
    currentRules() {
      const rules = this.$props.rules.join("|");
      return rules;
    }
  },
  methods: {
    handleBlur(e, valid) {
      const handler = this.blurHandlers[this.$props.component];
      if (typeof handler === "function") {
        handler(e, valid);
      }
    },
    handleChange(e, valid) {
      const handler = this.changeHandlers[this.$props.component];
      if (typeof handler === "function") {
        handler(e, valid);
      }
    },
    handleSelectChange(e, valid) {
      this.$emit("select:changed", { value: this.input, valid });
    },
    handleDateChange({ value, valid }) {
      this.$emit("date:changed", { value, valid });
    },
    handleBlurString(e, valid) {
      this.$emit("textfield:blured", { value: this.input, valid });
    }
  }
};
</script>

<style lang="scss" scoped></style>
