<template>
  <div class="wrapper">
    <v-container fluid class="d-flex align-center justify-center">
      <v-row align="center" justify="center">
        <v-col cols="10" sm="11" md="11" lg="10">
          <v-card class="mx-auto" rounded elevation="20" raised max-width="100vw">
            <v-row justify="space-around">
              <v-col cols="12" sm="6" md="6" lg="6" class="form-col-left secondary">
                <v-img src="/Brand.svg" contain max-height="600" min-height="180">
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
                    {{ $t("main.fields.title") }}
                  </p>
                </v-card-text>
                <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                  <form>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6" class="text--text">
                        <ValidationProvider v-slot="{ errors }" name="first_name" rules="required|max:15|min:2">
                          <v-text-field
                            v-model="firstname"
                            :counter="15"
                            :error-messages="errors"
                            @keyup.enter="$event.target.blur()"
                            required
                          >
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("main.fields.first_name") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" name="last_name" rules="required|max:15|min:2">
                          <v-text-field
                            v-model="lastname"
                            :counter="15"
                            :error-messages="errors"
                            @keyup.enter="$event.target.blur()"
                            required
                          >
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("main.fields.last_name") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" name="city" rules="required|min:2">
                          <v-text-field
                            v-model="city"
                            :error-messages="errors"
                            @keyup.enter="$event.target.blur()"
                            counter
                            required
                          >
                            <template v-slot:label>
                              <span class="input__label text--text text--text">{{ $t("main.fields.city") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col>
                        <ValidationProvider v-slot="{ errors }" name="street" rules="required|min:2">
                          <v-text-field
                            v-model="street"
                            :error-messages="errors"
                            @keyup.enter="$event.target.blur()"
                            counter
                            required
                          >
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("main.fields.street") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="space-around">
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" name="state" rules="required|min:2">
                          <v-text-field
                            v-model="state"
                            :error-messages="errors"
                            @keyup.enter="$event.target.blur()"
                            counter
                            required
                          >
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("main.fields.state") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <ValidationProvider v-slot="{ errors }" name="zip" rules="required|min:6">
                          <v-text-field
                            v-model="zip"
                            :error-messages="errors"
                            @keyup.enter="$event.target.blur()"
                            counter
                            required
                          >
                            <template v-slot:label>
                              <span class="input__label text--text">{{ $t("main.fields.zip") }}</span>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                      <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        @keyup.enter="$event.target.blur()"
                        class="pa-3"
                        required
                        autocomplete="new-password"
                      >
                        <template v-slot:label>
                          <span class="input__label text--text">{{ $t("main.email.short") }}</span>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors, valid }" name="password" ules="required|min:8">
                      <v-text-field
                        v-model="password"
                        :error-messages="errors"
                        @keyup.enter="$event.target.blur()"
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
                    <div class="button-group mt-4 mb-4 d-flex justify-end">
                      <v-btn @click="submit" small class="mr-4" color="success">{{ $t("main.button.submit") }}</v-btn>
                      <v-btn @click="clear" small class="mr-3">{{ $t("main.button.clear") }}</v-btn>
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
    firstname: "manager",
    lastname: "manager",
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
          firstname: this.firstname,
          lastname: this.lastname,
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
      this.firstname = "";
      this.lastname = "";
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
