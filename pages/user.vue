<template>
  <v-layout justify-center>
    <v-flex xs12 sm11 md11>
      <p class="display-1">All items</p>
      <v-select
        v-model="lang"
        :items="items"
        :loading="loading.lang"
        :success="success.lang"
        :error="error.lang"
        :error-messages="error.lang ? errorMessage : ''"
        :success-messages="success.lang ? successMessage : ''"
        item-text="name"
        item-value="attribute"
      >
        <template v-slot:label>
          <span>{{ $t("language") }}</span>
        </template>
      </v-select>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "User",
  middleware: "auth",
  data() {
    return {
      items: [
        { name: this.$t("languages.english"), attribute: "en" },
        { name: this.$t("languages.czech"), attribute: "cz" },
        { name: this.$t("languages.russian"), attribute: "ru" }
      ],
      loading: {
        lang: false
      },
      success: {
        lang: false
      },
      error: {
        lang: false
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  computed: {
    lang: {
      get() {
        const lang = this.$store.state.locale;
        return this.items.find(item => item.attribute === lang);
      },
      set(val) {
        this.setLanguage(val);
      }
    }
  },
  methods: {
    async setLanguage(lang) {
      const payload = {
        value: lang,
        pathToSet: ["locale"]
      };
      this.$i18n.locale = lang;
      this.$store.commit("setStoreValue", payload);
      this.successMessage = this.$t("notification.form.success.saved");
      this.errorMessage = this.$t("notification.form.title_validation_error");
      await this.saveUserLanguage(lang);
    },
    async saveUserLanguage(lang) {
      await this.updateUsersProp("lang", lang);
    }
  }
};
</script>