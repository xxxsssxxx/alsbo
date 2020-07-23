<template>
  <div class="table-no-data">
    <v-icon>mdi-database-search</v-icon>
    <p>{{ $t("main.alerts.register.no_items") }}</p>
  </div>
</template>

<script>
export default {
  name: "TableNoData"
};
</script>

<style lang="scss" scoped></style>
