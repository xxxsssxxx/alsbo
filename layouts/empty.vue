<template>
  <v-app>
    <span class="bg d-flex">
      <span class="left secondary"></span>
      <span class="right primary"></span>
    </span>
    <v-main>
      <v-switch v-model="theme" label="Dark theme" color="indigo darken-3" hide-details></v-switch>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {},
  data() {
    return {};
  },
  computed: {
    theme: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        this.$vuetify.theme.dark = val;
      }
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.right {
  width: 50%;
  height: 100%;
  background: url("https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg") no-repeat center center;
  background-size: cover;
  background-color: blue;
}
.left {
  width: 50%;
  height: 100%;
  background: url("https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg") no-repeat center center;
  background-size: cover;
  background-color: red;
}
</style>
