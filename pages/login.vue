<template>
  <div class="wrapper">
    <v-container fluid class="d-flex align-center justify-center">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="7" md="6" lg="6" xl="3">
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
                  <p class="display-1 text--text">
                    {{ $t("login.title") }}
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
                    <div
                      class="button-group justify-sm-end flex-column flex-sm-row mt-4 mb-4 pa-3 d-flex justify-space-between"
                    >
                      <v-btn @click="submit" class="mr-sm-4 mt-2" color="success">{{ $t("button.submit") }}</v-btn>
                      <v-btn @click="clear" class="mr-sm-4 mt-2">clear</v-btn>
                      <v-btn @click="submit" class="mt-2" color="neutral" to="/registration">
                        {{ $t("navbar.link_registration") }}
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
    showPassword: false,
    imgMinHeight: undefined
  }),
  beforeMount() {
    this.imgMinHeight = this.imgHeight();
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
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
    },
    imgHeight() {
      const heights = {
        sm: "602",
        md: "602",
        lg: "602",
        xl: "602"
      };
      const height = heights[this.$vuetify.breakpoint.name];
      if (height) return height;
      return undefined;
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
