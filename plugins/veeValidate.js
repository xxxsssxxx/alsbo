import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from "vee-validate";
import { required, email, min, max, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});

setInteractionMode("eager");

extend("email", email);
extend("min", min);
extend("confirmed", confirmed);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
