import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from "vee-validate";
import { required, email, min, max, confirmed } from "vee-validate/dist/rules";
// const en = require("~/locales/en.json");
// const cz = require("~/locales/cz.json");
// const ru = require("~/locales/ru.json");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("min", {
  ...min,
  message: "{_field_} should be greater than {length} characters"
});

extend("email", {
  ...email,
  message: "{_field_} must be valid"
});

setInteractionMode("eager");

extend("email", email);
extend("min", min);
extend("confirmed", confirmed);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
