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
            item-text="value"
            item-value="attribute"
          >
            <template v-slot:label>
              <span>{{ $t("main.language") }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-chip v-for="(rate, i) in rates" :key="i" class="ma-2" color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>{{ rate.icon }}</v-icon>
            </v-avatar>
            {{ rate.name }} : {{ rate.value }}
          </v-chip>
          <v-tooltip bottom>
            <template #activator="{ on: hover }">
              <slot name="trigger" />
              <v-icon v-on="hover" @click="reloadCurrencyRates">
                mdi-reload
              </v-icon>
            </template>
            <span>{{ $t("main.button.reload") }} ({{ ratesUpdated }})</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-select
            v-model="defaultCurrency"
            :items="currencies"
            :loading="loading.defaultCurrency"
            :success="success.defaultCurrency"
            :error="error.defaultCurrency"
            :error-messages="error.defaultCurrency ? errorMessage : ''"
            :success-messages="success.defaultCurrency ? successMessage : ''"
            @change="updateUser('defaultCurrency', true)"
            item-text="value"
            return-object
          >
            <template v-slot:label>
              <span>{{ $t("main.table.header.currency") }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-select
            v-model="defaultService"
            :items="services"
            :loading="loading.defaultService"
            :success="success.defaultService"
            :error="error.defaultService"
            :error-messages="error.defaultService ? errorMessage : ''"
            :success-messages="success.defaultService ? successMessage : ''"
            @change="updateUser('defaultService', true)"
            item-text="value"
            return-object
          >
            <template v-slot:label>
              <span>{{ $t("main.table.header.service") }}</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { localize } from "vee-validate";

export default {
  name: "User",
  middleware: "auth",
  fetchOnServer: false,
  data() {
    return {
      items: [
        { value: this.$t("main.languages.english"), attribute: "en" },
        { value: this.$t("main.languages.czech"), attribute: "cs" },
        { value: this.$t("main.languages.russian"), attribute: "ru" }
      ],
      currencies: [
        { value: "usd", id: 1 },
        { value: "eur", id: 2 },
        { value: "czk", id: 3 }
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
        password: false,
        rates: false,
        defaultCurrency: false,
        defaultService: false
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
        password: false,
        rates: false,
        defaultCurrency: false,
        defaultService: false
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
      zip: "",
      reloadedDate: "",
      defaultCurrency: "",
      defaultService: ""
    };
  },
  computed: {
    ...mapGetters({
      urlPrefix: "urlPrefix",
      fields: "items/newModalFields",
      currentUser: "currentUser"
    }),
    lang: {
      get() {
        const lang = this.$store.state.locale;
        return this.items.find(item => item.attribute === lang);
      },
      set(val) {
        this.setLanguage(val);
      }
    },
    rates() {
      const rates = this.$store.state.rates;
      const items = [
        { name: "EUR", value: rates.eur, icon: "mdi-currency-eur" },
        { name: "USD", value: rates.usd, icon: "mdi-currency-usd" }
      ];
      return items;
    },
    ratesUpdated() {
      const rates = this.$store.state.rates;
      const updated = rates.upd;
      return this.dateFormat(updated, true);
    },
    services() {
      const main = this.fields.main;
      const services = main && main.find(field => field.name === "service").selectOptions;
      return services;
    }
  },
  asyncData({ app, params, store }) {
    const user = store.state.currentUser;
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      state: user.address.state,
      city: user.address.city,
      street: user.address.street,
      zip: user.address.zip,
      defaultCurrency: user.defaultCurrency,
      defaultService: user.defaultService
    };
  },
  async fetch() {
    const id = this.currentUser._id;
    await this.setCurrencyRates(id);
    await this.getFieldsFor("NewItemModal", this.urlPrefix);
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
      await this.updateUsersProp("lang", lang, this.currentUser._id);
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
    },
    async reloadCurrencyRates() {
      const id = this.currentUser._id;
      await this.loadingStateManager(this.setCurrencyRates, id);
      this.notify();
    }
  }
};
</script>
