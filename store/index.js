import Cookies from "../plugins/cookies";
const cookieparser = require("cookieparser");
const jwt = require("jsonwebtoken");
const utils = require("../mixins/utils");

export const state = () => ({
  token: null,
  locale: "en",
  tables: ["sale", "service"],
  service: "sale",
  currency: "",
  rate: {},
  allFields: {},
  modalGlobalError: null,
  messageTimeout: 3000,
  loading: false
});

export const mutations = {
  setUrlPrefix(state, prefix) {
    state.urlPrefix = prefix;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
  setStoreValue(state, payload) {
    const { value, pathToSet, push = false } = payload;
    utils.default.methods.deepObjectSet(state, value, pathToSet, push);
  },
  setCurrentUser(state, payload) {
    state.currentUser = payload;
  }
};

export const actions = {
  nuxtServerInit({ commit, dispatch, state }, { req, redirect }) {
    const urlPrefix = process.env.API_URL || "http://localhost:3000/api";
    if (req.headers.cookie) {
      const secretKey = process.env.JWT_SECRET_KEY || "secretKey";
      const parsed = cookieparser.parse(req.headers.cookie);
      if (!parsed.auth_token) {
        redirect("/login");
        return;
      }
      const user = jwt.verify(parsed.auth_token, secretKey);
      if (!user) {
        redirect(`/login?message='${state.$t("main.login.first")}'`);
        return;
      }
      commit("setToken", parsed.auth_token);
      commit("setCurrentUser", user);
      dispatch("setUserLang", user.lang || "en");
    }
    commit("setUrlPrefix", urlPrefix);
  },
  login({ commit, dispatch }, user) {
    Cookies.set("auth_token", user.token);
    commit("setToken", user.token);
    commit("setCurrentUser", user);
    dispatch("setUserLang", user.lang || "en");
  },
  logout({ commit }) {
    Cookies.remove("auth_token");
    commit("items/resetState");
    commit("setCurrentUser", {});
    commit("clearToken");
  },
  updateToken({ commit }, token) {
    Cookies.remove("auth_token");
    Cookies.set("auth_token", token);
    commit("setToken", token);
  },
  setUserLang({ commit }, lang) {
    const payload = {
      value: lang,
      pathToSet: ["locale"]
    };
    commit("setStoreValue", payload);
  }
};

export const getters = {
  hasToken: s => !!s.token,
  error: s => s.modalGlobalError,
  currentUser: s => s.currentUser,
  urlPrefix: s => s.urlPrefix
};
