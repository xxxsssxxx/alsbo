<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg12>
      <p class="display-1">{{ $t("detail.user") }}</p>
      <p class="text-subtitle-1 d-flex align-center">
        <v-icon class="mr-2"> mdi-card-account-details</v-icon>
        <span>{{ $t("detail.title") }}</span>
      </p>
      <v-divider></v-divider>
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <form>
          <v-row align="center" justify="space-around" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider
                v-slot="{ errors, valid }"
                :name="$t('registration.first_name')"
                rules="required|max:15"
              >
                <v-text-field
                  v-model.lazy="firstname"
                  :counter="15"
                  :error-messages="errors"
                  :success-messages="success.firstname ? successMessage : ''"
                  :success="success.firstname"
                  :loading="loading.firstname"
                  @blur="updateUser($t('registration.first_name'), 'firstname', valid)"
                  required
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("registration.first_name") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider
                v-slot="{ errors, valid }"
                :name="$t('registration.last_name')"
                rules="required|max:15"
              >
                <v-text-field
                  v-model.lazy="lastname"
                  :counter="15"
                  :error-messages="errors"
                  :success-messages="success.lastname ? successMessage : ''"
                  :success="success.lastname"
                  :loading="loading.lastname"
                  @blur="updateUser($t('registration.last_name'), 'lastname', valid)"
                  required
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("registration.last_name") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" :name="$t('registration.state')" rules="required|min:2">
                <v-text-field
                  v-model.lazy="state"
                  :error-messages="errors"
                  :success-messages="success.state ? successMessage : ''"
                  :success="success.state"
                  :loading="loading.state"
                  @blur="updateUser($t('registration.state'), 'state', valid)"
                  counter
                  required
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("registration.state") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" :name="$t('registration.city')" rules="required|min:2">
                <v-text-field
                  v-model.lazy="city"
                  :error-messages="errors"
                  :success-messages="success.city ? successMessage : ''"
                  :success="success.city"
                  :loading="loading.city"
                  @blur="updateUser($t('registration.city'), 'city', valid)"
                  counter
                  required
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("registration.city") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around" justify-lg="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" :name="$t('registration.street')" rules="required|min:2">
                <v-text-field
                  v-model.lazy="street"
                  :error-messages="errors"
                  :success-messages="success.street ? successMessage : ''"
                  :success="success.street"
                  :loading="loading.street"
                  @blur="updateUser($t('registration.street'), 'street', valid)"
                  counter
                  required
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("registration.street") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" :name="$t('registration.zip')" rules="required|min:6">
                <v-text-field
                  v-model.lazy="zip"
                  :error-messages="errors"
                  :success-messages="success.zip ? successMessage : ''"
                  :success="success.zip"
                  :loading="loading.zip"
                  @blur="updateUser($t('registration.zip'), 'zip', valid)"
                  counter
                  required
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("registration.zip") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="start">
            <v-col cols="12" sm="6" md="6" lg="4">
              <ValidationProvider v-slot="{ errors, valid }" :name="$t('email.short')" rules="required|email">
                <v-text-field
                  v-model.lazy="email"
                  :error-messages="errors"
                  :success-messages="success.email ? successMessage : ''"
                  :success="success.email"
                  :loading="loading.email"
                  @blur="updateUser($t('registration.short'), 'email', valid)"
                  required
                  autocomplete="new-password"
                >
                  <template v-slot:label>
                    <span class="input__label">{{ $t("email.short") }}</span>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
      <p class="text-subtitle-1 d-flex align-center mt-4">
        <v-icon class="mr-2"> mdi-hammer-screwdriver</v-icon>
        <span>{{ $t("detail.settings") }}</span>
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
              <span>{{ $t("language") }}</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
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
      user: this.$store.state.currentUser,
      firstname: this.$store.state.currentUser.firstname,
      lastname: this.$store.state.currentUser.lastname,
      email: this.$store.state.currentUser.email,
      state: this.$store.state.currentUser.address.state,
      city: this.$store.state.currentUser.address.city,
      street: this.$store.state.currentUser.address.street,
      zip: this.$store.state.currentUser.address.zip
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
  methods: {
    async setLanguage(lang) {
      const payload = {
        value: lang,
        pathToSet: ["locale"]
      };
      this.$i18n.locale = lang;
      this.$store.commit("setStoreValue", payload);
      this.setMessages();
      await this.saveUserLanguage(lang);
    },
    async saveUserLanguage(lang) {
      await this.updateUsersProp("lang", lang);
    },
    async updateUser(field, prop, valid) {
      if (valid) {
        this.setMessages();
        await this.updateUsersProp(prop, this[prop]);
      }
    },
    setMessages() {
      this.successMessage = this.$t("notification.form.success.saved");
      this.errorMessage = this.$t("notification.form.title_validation_error");
    }
  }
};
</script>
