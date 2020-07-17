<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <p class="display-1">All items</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Items",
  middleware: "auth"
};
</script>
