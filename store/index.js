import Cookies from "../plugins/cookies";
const cookieparser = require("cookieparser");
const jwt = require("jsonwebtoken");
const utils = require("../mixins/utils");

export const state = () => ({
  token: null,
  locale: "en",
  tables: ["sale", "service"],
  saleAttributes: ["service_type", "batch_number", "pn", "description", "quantity", "price_per_unit"],
  exchangeAttr: ["batch_number", "pn", "description", "serial_number", "new_serial_number"],
  loanAttr: ["batch_number", "pn", "description"],
  feeAttributes: ["quantity", "description"],
  defaultAttr: ["quantity", "description"],
  service: { name: "sale", id: "1" },
  currency: { name: "czk", id: "1" },
  rate: {},
  modalGlobalError: null
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
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const secretKey = process.env.JWT_SECRET_KEY || "secretKey";
      const parsed = cookieparser.parse(req.headers.cookie);
      const { userData: user } = jwt.verify(parsed.auth_token, secretKey);
      commit("setToken", parsed.auth_token);
      commit("setCurrentUser", user);
    }
    const urlPrefix = process.env.API_URL || "http://localhost:3000/api";
    commit("setUrlPrefix", urlPrefix);
  },
  login({ commit }, user) {
    Cookies.set("auth_token", user.token);
    commit("setToken", user.token);
    commit("setCurrentUser", user);
  },
  logout({ commit }) {
    Cookies.remove("auth_token");
    commit("items/resetState");
    commit("setCurrentUser", {});
    commit("clearToken");
  }
};

export const getters = {
  hasToken: s => !!s.token,
  error: s => s.modalGlobalError
};
