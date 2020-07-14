<template>
  <div class="wrapper">
    <v-container fluid class="d-flex align-center justify-center">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12" lg="9">
          <v-card class="mx-auto" outlined raised height="100%">
            <v-row align="center" justify="space-around" class="p-4">
              <v-col cols="12" sm="5">
                <div>
                  <v-img src="/Brand.svg"></v-img>
                </div>
              </v-col>
              <v-col cols="10" sm="6">
                <v-card-text>
                  <p class="display-1 text--primary card-title">
                    {{ $t("registration.title") }}
                  </p>
                </v-card-text>
                <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                  <form>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          :name="$t('registration.first_name')"
                          rules="required|max:10"
                        >
                          <v-text-field
                            v-model="firstName"
                            :counter="10"
                            :error-messages="errors"
                            :label="$t('registration.first_name')"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          :name="$t('registration.last_name')"
                          rules="required|max:15"
                        >
                          <v-text-field
                            v-model="lastName"
                            :counter="10"
                            :error-messages="errors"
                            :label="$t('registration.last_name')"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('registration.city')" rules="required|min:2">
                          <v-text-field
                            v-model="city"
                            :error-messages="errors"
                            :label="$t('registration.city')"
                            counter
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col>
                        <ValidationProvider
                          v-slot="{ errors }"
                          :name="$t('registration.street')"
                          rules="required|min:2"
                        >
                          <v-text-field
                            v-model="street"
                            :error-messages="errors"
                            :label="$t('registration.street')"
                            counter
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('registration.state')" rules="required|min:2">
                          <v-text-field
                            v-model="state"
                            :error-messages="errors"
                            :label="$t('registration.state')"
                            counter
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" :name="$t('registration.zip')" rules="required|min:6">
                          <v-text-field
                            v-model="zip"
                            :error-messages="errors"
                            :label="$t('registration.zip')"
                            counter
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <ValidationProvider v-slot="{ errors }" :name="$t('email.short')" rules="required|email">
                      <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        :label="$t('email.short')"
                        required
                        autocomplete="new-password"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors, valid }" :name="$t('password')" rules="required|min:8">
                      <v-text-field
                        v-model="password"
                        :error-messages="errors"
                        :label="$t('password')"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        counter
                        autocomplete="new-password"
                      ></v-text-field>
                    </ValidationProvider>
                    <div class="button-group mt-4 mb-4 d-flex justify-end">
                      <v-btn class="mr-4" color="success" @click="submit">submit</v-btn>
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
export default {
  layout: "empty",
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: null,
    state: "",
    city: "",
    street: "",
    zip: "",
    showPassword: false
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
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
  .card-title {
    &::after {
      content: "";
      border-bottom: 3px solid #fff;
      width: 115px;
      display: block;
    }
  }
}
</style>
