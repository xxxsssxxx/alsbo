import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from "vee-validate";
import { required, min, max, email, numeric } from "vee-validate/dist/rules";

extend("required", required);
extend("max", max);
extend("min", min);
extend("email", email);
extend("numeric", numeric);

setInteractionMode("eager");

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
