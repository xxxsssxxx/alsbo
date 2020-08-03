<template>
  <v-menu v-model="menu" :nudge-width="200" :close-on-content-click="false" offset-x>
    <template #activator="{ on: click }">
      <v-tooltip bottom>
        <template #activator="{ on: hover }">
          <slot name="trigger" />
          <v-btn v-on="{ ...hover, ...click }" fab color="neutral" x-small class="mr-2">
            <v-icon dark>mdi-table-column-plus-before</v-icon>
          </v-btn>
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
    </template>

    <component
      :is="currentComponent"
      :options="currentOptions"
      @menu:close="menu = false"
      @column:select="$emit('column:select', $event)"
    ></component>
  </v-menu>
</template>

<script>
import ColumnsList from "@/components/ColumnsList";
/* eslint-disable vue/no-unused-components */
export default {
  name: "BaseMenu",
  components: {
    ColumnsList
  },
  props: {
    tooltip: {
      type: String,
      default: () => "Should be a tooltip :/"
    },
    component: {
      type: String,
      default: () => ""
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    currentComponent() {
      return this.component;
    },
    currentOptions() {
      return this.options;
    }
  }
};
</script>

<style lang="scss" scoped></style>
