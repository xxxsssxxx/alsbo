<template>
  <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <form>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.first_name')" rules="required|max:10">
        <v-text-field
          v-model="firstName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.first_name')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.last_name')" rules="required|max:10">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.last_name')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.address')" rules="required|max:10">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.address')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.street')" rules="required|max:10">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.street')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.city')" rules="required|max:10">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.city')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.state')" rules="required|max:10">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.state')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('registration.zip')" rules="required|max:10">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          :label="$t('registration.zip')"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" :name="$t('email.short')" rules="required|email">
        <v-text-field v-model="email" :error-messages="errors" :label="$t('email.short')" required></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors, valid }" :name="$t('password')" rules="required">
        <v-text-field
          v-model="password"
          :error-messages="errors"
          :label="$t('password')"
          type="password"
          required
        ></v-text-field>
      </ValidationProvider>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </ValidationObserver>
</template>
<script>
export default {
  layout: "empty",
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: null
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
