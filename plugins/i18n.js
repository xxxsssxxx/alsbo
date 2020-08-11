import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "vee-validate/dist/locale/en.json";
import ru from "vee-validate/dist/locale/ru.json";
import cs from "vee-validate/dist/locale/cs.json";
import { configure } from "vee-validate";

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: "en",
    silentTranslationWarn: true,
    messages: {
      en: {
        main: require("~/locales/en.json"),
        validation: en.messages
      },
      ru: {
        main: require("~/locales/ru.json"),
        validation: ru.messages
      },
      cs: {
        main: require("~/locales/cs.json"),
        validation: cs.messages
      }
    }
  });

  configure({
    // this will be used to generate messages.
    defaultMessage: (field, values) => {
      let fieldString = app.i18n.t(`main.fields.${field}`);
      const notTranslated = fieldString.startsWith("main");
      if (notTranslated) {
        fieldString = app.i18n.t(`main.table.header.${field}`);
      }
      values._field_ = fieldString;
      return app.i18n.t(`validation.${values._rule_}`, values);
    }
  });
  // Add i18n to store
  store.$t = app.i18n.$t;
  app.i18n.path = link => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
