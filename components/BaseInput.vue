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
import BaseDatepicker from "@/components/BaseDatepicker";
export default {
  name: "BaseInput",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BaseDatepicker
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
