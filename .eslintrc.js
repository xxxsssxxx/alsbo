module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended"
  ],
  plugins: [
    "prettier"
  ],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off",
    "vue/no-unused-vars": "off",
    "vue/require-component-is": "off",
    "comma-dangle": [ 1, "never"],
    "quotes": [ 1, "double"],
    "arrow-parens": [ 1, "as-needed"],
    "max-len": [ 1, { "code": 120 }]
  }
}
