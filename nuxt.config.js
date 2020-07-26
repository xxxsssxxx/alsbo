const colors = require("vuetify/es5/util/colors").default;

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/Brand.svg" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/veeValidate", ssr: "false" },
    { src: "@/plugins/mixins", ssr: "false" },
    { src: "@/plugins/i18n", ssr: "false" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify"
  ],
  serverMiddleware: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/axios"],
  /* Axious nuxt module configuration */
  axios: {
    prefix: "/api"
  },
  telemetry: false,
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.deepPurple.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.darken2,
          success: colors.green.accent3,
          text: colors.grey.lighten5,
          neutral: colors.indigo.accent4
        },
        light: {
          primary: colors.deepPurple.lighten1,
          accent: colors.grey.darken1,
          secondary: colors.amber.darken1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.darken1,
          success: colors.green.accent4,
          text: colors.deepPurple.lighten5,
          neutral: colors.indigo.accent2
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ["vee-validate", "vuetify/lib"],
    parallel: true,
    cache: true,
    extend(config, ctx) {}
  }
};
