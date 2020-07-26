<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="secondary" class="text--text d-flex align-center" dark>
      <v-card-text>
        {{ $t("main.loading") }}
        <v-progress-linear buffer-value="0" stream class="mb-0 mt-2" color="primary" height="10"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    dialog() {
      return this.$props.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  height: 70px;
}
</style>
