<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg12>
      <p class="display-1">{{ $t("main.detail.user") }}</p>
      <p class="text-subtitle-1 d-flex align-center">
        <v-icon class="mr-2"> mdi-card-account-details</v-icon>
        <span>{{ $t("main.detail.title") }}</span>
      </p>
      <v-divider></v-divider>
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <form>
          <v-row align="center" justify="space-around" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="first_name" rules="required|max:15|min:2">
                <v-text-field
                  v-model.lazy="firstname"
                  :counter="15"
                  :error-messages="errors"
                  :success-messages="success.firstname ? successMessage : ''"
                  :success="success.firstname"
                  :loading="loading.firstname"
                  @blur="updateUser('firstname', valid)"
                  @keyup.enter="$event.target.blur()"
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.first_name") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="last_name" rules="required|max:15|min:2">
                <v-text-field
                  v-model.lazy="lastname"
                  :counter="15"
                  :error-messages="errors"
                  :success-messages="success.lastname ? successMessage : ''"
                  :success="success.lastname"
                  :loading="loading.lastname"
                  @blur="updateUser('lastname', valid)"
                  @keyup.enter="$event.target.blur()"
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.last_name") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="state" rules="required|min:2">
                <v-text-field
                  v-model.lazy="state"
                  :error-messages="errors"
                  :success-messages="success.state ? successMessage : ''"
                  :success="success.state"
                  :loading="loading.state"
                  @blur="updateUser('state', valid)"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.state") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="city" rules="required|min:2">
                <v-text-field
                  v-model.lazy="city"
                  :error-messages="errors"
                  :success-messages="success.city ? successMessage : ''"
                  :success="success.city"
                  :loading="loading.city"
                  @blur="updateUser('city', valid)"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.city") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="street" rules="required|min:2">
                <v-text-field
                  v-model.lazy="street"
                  :error-messages="errors"
                  :success-messages="success.street ? successMessage : ''"
                  :success="success.street"
                  :loading="loading.street"
                  @blur="updateUser('street', valid)"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.street") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="zip" rules="required|min:6">
                <v-text-field
                  v-model.lazy="zip"
                  :error-messages="errors"
                  :success-messages="success.zip ? successMessage : ''"
                  :success="success.zip"
                  :loading="loading.zip"
                  @blur="updateUser('zip', valid)"
                  @keyup.enter="$event.target.blur()"
                  counter
                  required
                  autocomplete="off"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.fields.zip") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" name="email" rules="required|email">
                <v-text-field
                  v-model.lazy="email"
                  :error-messages="errors"
                  :success-messages="success.email ? successMessage : ''"
                  :success="success.email"
                  :loading="loading.email"
                  @blur="updateUser('email', valid)"
                  @keyup.enter="$event.target.blur()"
                  required
                  autocomplete="new-password"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("main.email.short") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
      <p class="text-subtitle-1 d-flex align-center mt-4">
        <v-icon class="mr-2"> mdi-hammer-screwdriver</v-icon>
        <span>{{ $t("main.detail.settings") }}</span>
      </p>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4">
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
              <span>{{ $t("main.language") }}</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { localize } from "vee-validate";

export default {
  name: "User",
  middleware: "auth",
  data() {
    return {
      items: [
        { name: this.$t("main.languages.english"), attribute: "en" },
        { name: this.$t("main.languages.czech"), attribute: "cs" },
        { name: this.$t("main.languages.russian"), attribute: "ru" }
      ],
      loading: {
        lang: false,
        firstname: false,
        lastname: false,
        state: false,
        city: false,
        street: false,
        zip: false,
        email: false,
        password: false
      },
      success: {
        lang: false,
        firstname: false,
        lastname: false,
        state: false,
        city: false,
        street: false,
        zip: false,
        email: false,
        password: false
      },
      error: {
        lang: false
      },
      successMessage: "",
      errorMessage: "",
      firstname: "",
      lastname: "",
      email: "",
      state: "",
      city: "",
      street: "",
      zip: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
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
  asyncData({ app, params, store }) {
    return {
      firstname: store.state.currentUser.firstname,
      lastname: store.state.currentUser.lastname,
      email: store.state.currentUser.email,
      state: store.state.currentUser.address.state,
      city: store.state.currentUser.address.city,
      street: store.state.currentUser.address.street,
      zip: store.state.currentUser.address.zip
    };
  },
  methods: {
    async setLanguage(lang) {
      const payload = {
        value: lang,
        pathToSet: ["locale"]
      };
      this.$i18n.locale = lang;
      this.$store.commit("setStoreValue", payload);
      this.setMessages();
      this.loadLocale(lang);
      await this.saveUserLanguage(lang);
    },
    async saveUserLanguage(lang) {
      await this.updateUsersProp("lang", lang);
    },
    async updateUser(prop, valid) {
      if (valid) {
        this.setMessages();
        await this.updateUsersProp(prop, this[prop], this.currentUser._id);
      }
    },
    setMessages() {
      this.successMessage = this.$t("main.notification.form.success.saved");
      this.errorMessage = this.$t("main.notification.form.title_validation_error");
    },
    loadLocale(code) {
      return import(`vee-validate/dist/locale/${code}.json`).then(locale => {
        localize(code, locale);
      });
    }
  }
};
</script>
