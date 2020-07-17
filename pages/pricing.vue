<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <p class="display-1">Pricing</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Pricing",
  middleware: "auth"
};
</script>
