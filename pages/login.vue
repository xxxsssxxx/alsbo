<template>
  <div class="wrapper">
    <v-container fluid class="d-flex align-center justify-center">
      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="6" lg="6" xl="3">
          <v-card class="mx-auto" rounded elevation="20" raised>
            <v-row justify="space-around" class="d-flex flex-column">
              <v-col cols="12" class="form-col-left secondary">
                <v-img src="/Brand.svg" contain max-height="600">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" class="form-col-right primary">
                <v-card-text class="pl-3">
                  <p class="text-h6 text-sm-h4 text--text">
                    {{ $t("main.login.title") }}
                  </p>
                </v-card-text>
                <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                  <form>
                    <ValidationProvider v-slot="{ errors }" :name="$t('email.short')" rules="required|email">
                      <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        class="pa-3"
                        required
                        autocomplete="new-password"
                      >
                        <template v-slot:label>
                          <span class="input__label text--text">{{ $t("main.email.short") }}</span>
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
                          <span class="input__label text--text">{{ $t("main.password") }}</span>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                    <div
                      class="button-group justify-sm-end flex-column flex-md-row mt-4 mb-4 pa-3 d-flex justify-space-between"
                    >
                      <v-btn @click="submit" small class="mr-sm-4 mt-2" color="success">{{
                        $t("main.button.submit")
                      }}</v-btn>
                      <v-btn @click="clear" small class="mr-sm-4 mt-2">{{ $t("main.button.clear") }}</v-btn>
                      <v-btn small class="mr-sm-4 mr-md-0 mt-2" color="neutral" to="/registration">
                        {{ $t("main.navigation.link_registration") }}
                      </v-btn>
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
    email: "manager@manager.com",
    password: "12345678",
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
          email: this.email,
          password: this.password
        };
        const { matched, user } = await Authorization.login(data);
        if (matched) {
          this.$store.dispatch("login", user);
          this.$router.push("/");
          return;
        }
        this.setLoginValidationErrors();
      }
    },
    clear() {
      this.email = "";
      this.password = null;
      this.$refs.observer.reset();
    },
    setLoginValidationErrors() {
      const email = this.$t("main.email.short");
      const password = this.$t("main.password");
      const errors = {
        [email]: [this.$t("main.notification.form.login_validation_error")],
        [password]: [this.$t("main.notification.form.login_validation_error")]
      };
      this.$refs.observer.setErrors(errors);
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
}
.form-col {
  &-right,
  &-left {
    position: relative;
    background-size: cover;
  }
}
</style>
