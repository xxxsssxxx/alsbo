<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg12>
      <p class="display-1">{{ $t("main.navigation.link_administration") }}</p>
      <p class="text-subtitle-1 d-flex align-center">
        <v-icon class="mr-2"> mdi-card-account-details</v-icon>
        <span>Sale columns edit</span>
      </p>
      <v-divider></v-divider>
      <v-stepper v-model="step" vertical>
        <v-stepper-step :complete="!!text.length && !!value.length" step="1">
          Column name and value
        </v-stepper-step>

        <v-stepper-content step="1">
          <ValidationProvider v-slot="{ errors, valid }" name="text" rules="required|min:2|max:20">
            <v-text-field
              v-model.lazy="text"
              :error-messages="errors"
              :success-messages="success.text ? successMessage : ''"
              :success="success.text"
              :loading="loading.text"
              @blur="updateColumn('text', valid)"
              @keyup.enter="$event.target.blur()"
              required
              autocomplete="off"
              counter
            >
              <template v-slot:label>
                <span class="input__label">{{ $t("main.fields.text") }}</span>
              </template>
            </v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors, valid }" name="value" rules="required|min:2|max:20">
            <v-text-field
              v-model.lazy="value"
              :error-messages="errors"
              :success-messages="success.value ? successMessage : ''"
              :success="success.value"
              :loading="loading.value"
              @blur="updateColumn('value', valid)"
              @keyup.enter="$event.target.blur()"
              required
              autocomplete="off"
              counter
            >
              <template v-slot:label>
                <span class="input__label">{{ $t("main.fields.value") }}</span>
              </template>
            </v-text-field>
          </ValidationProvider>
          <v-btn @click="step++" color="primary">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">Column configuration</v-stepper-step>

        <v-stepper-content step="2">
          <v-switch
            v-model="sortable"
            :label="$t('main.fields.sortable')"
            :success-messages="success.sortable ? successMessage : ''"
            :success="success.sortable"
            :loading="loading.sortable"
            inset
          ></v-switch>
          <v-switch
            v-model="filterable"
            :label="$t('main.fields.filterable')"
            :success-messages="success.filterable ? successMessage : ''"
            :success="success.filterable"
            :loading="loading.filterable"
            inset
          ></v-switch>
          <v-btn @click="step++" color="primary">Continue</v-btn>
          <v-btn @click="step--" text>Back</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Administration",
  middleware: "auth",
  data() {
    return {
      step: 1,
      loading: {
        text: false,
        value: false,
        sortable: false,
        filterable: false
      },
      success: {
        text: false,
        value: false,
        sortable: false,
        filterable: false
      },
      text: "",
      value: "",
      sortable: "",
      filterable: "",
      successMessage: "",
      errorMessage: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  asyncData({ app, params, store }) {},
  methods: {
    async updateColumn(prop, valid) {
      if (valid) {
        this.setMessages();
        await this.updateColumnProp(prop, this[prop]);
      }
    },
    setMessages() {
      this.successMessage = this.$t("main.notification.form.success.saved");
      this.errorMessage = this.$t("main.notification.form.title_validation_error");
    }
  }
};
</script>
