<template>
  <div class="wrapper">
    <v-container fluid class="d-flex align-center justify-center">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12" lg="10">
          <v-card class="mx-auto" rounded elevation="20" raised>
            <v-row justify="space-around">
              <v-col cols="12" sm="6" md="6" lg="6" class="form-col-left secondary">
                <v-img src="/Brand.svg" contain max-height="600">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="form-col-right primary">
                <v-card-text class="pl-3">
                  <p class="display-1 text--text">
                    {{ $t("registration.title") }}
                  </p>
                </v-card-text>
                <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                  <form>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6" class="text--text">
                        <ValidationProvider
                          v-slot="{ errors }"
                          :name="$t('registration.first_name')"
                          rules="required|max:15"
                        >
                          <v-text-field v-model="firstName" :counter="15" :error-messages="errors" required>
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("registration.first_name") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          :name="$t('registration.last_name')"
                          rules="required|max:15"
                        >
                          <v-text-field v-model="lastName" :counter="15" :error-messages="errors" required>
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("registration.last_name") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('registration.city')" rules="required|min:2">
                          <v-text-field v-model="city" :error-messages="errors" counter required>
                            <template v-slot:label>
                              <span class="input__label text--text text--text">{{ $t("registration.city") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col>
                        <ValidationProvider
                          v-slot="{ errors }"
                          :name="$t('registration.street')"
                          rules="required|min:2"
                        >
                          <v-text-field v-model="street" :error-messages="errors" counter required>
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("registration.street") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('registration.state')" rules="required|min:2">
                          <v-text-field v-model="state" :error-messages="errors" counter required>
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("registration.state") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('registration.zip')" rules="required|min:6">
                          <v-text-field v-model="zip" :error-messages="errors" counter required>
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("registration.zip") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <ValidationProvider v-slot="{ errors }" :name="$t('email.short')" rules="required|email">
                      <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        class="pa-3"
                        required
                        autocomplete="new-password"
                      >
                        <template v-slot:label>
                          <span class="input__label text--text">{{ $t("email.short") }}</span>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors, valid }" :name="$t('password')" rules="required|min:8">
                      <v-text-field
                        v-model="password"
                        :error-messages="errors"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'"
                        class="pa-3"
                        required
                        counter
                        autocomplete="new-password"
                      >
                        <template v-slot:label>
                          <span class="input__label text--text">{{ $t("password") }}</span>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                    <div class="button-group mt-4 mb-4 d-flex justify-end">
                      <v-btn @click="submit" class="mr-4" color="success">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
                    </div>
                  </form>
                </ValidationObserver>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Authorization from "../plugins/authorization.js";
export default {
  layout: "empty",
  data: () => ({
    firstName: "manager",
    lastName: "manager",
    email: "manager@manager.com",
    password: "12345678",
    state: "USA",
    city: "NYC",
    street: "Time-Squere 503/12",
    zip: "000000",
    showPassword: false
  }),
  mounted() {
    this.$store.dispatch("logout");
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        const data = {
          firstname: this.firstName,
          lastname: this.lastName,
          email: this.email,
          password: this.password,
          state: this.state,
          city: this.city,
          street: this.street,
          zip: this.zip
        };
        const user = await Authorization.registrate(data);
        this.$store.dispatch("login", user);
        this.$router.push("/");
      }
    },
    clear() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.city = "";
      this.state = "";
      this.zip = "";
      this.password = null;
      this.$refs.observer.reset();
    }
  }
};
</script>
<style lang="scss" scoped>
$switcher-height: 46px;
$container-padding: 12px;
$card-bottom-margin: 50px;
$deepPuprpleLighten5: #ede7f6;
.row {
  margin-right: 0;
  margin-left: 0;
}
@media only screen and (min-width: 600px) {
  .wrapper {
    height: calc(100vh - #{$switcher-height} - #{$container-padding * 2} - #{$card-bottom-margin});
    width: 100%;
    display: flex;
    align-items: center;
  }
  .v-card__text {
    padding-left: 0;
  }
  .v-image {
    min-height: 602px;
  }
}
.form-col {
  &-right,
  &-left {
    position: relative;
    background-size: cover;
  }
}
</style>
