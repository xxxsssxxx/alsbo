const utils = require("../mixins/utils");
const defaultState = {
  allColumns: [],
  saleTableHead: [],
  serviceTableHead: [],
  saleTableContent: [],
  serviceTableContent: [],
  editingRow: {},
  notVisisbleTableContent: ["service", "currency", "customer_type", "service_type"]
};
const getDefaultState = () => {
  return defaultState;
};
export const namespaced = () => true;
export const state = () => defaultState;
export const mutations = {
  addTableRow(state, payload) {
    const { value, pathToSet, push = true } = payload;
    !push ? (state[pathToSet] = value) : state[pathToSet].push(value);
  },
  setTableHeaders(state, payload) {
    const { value, pathToSet, push = true } = payload;
    !push ? (state[pathToSet] = value) : state[pathToSet].push(value);
  },
  resetState(state) {
    state = Object.assign(state, getDefaultState());
  },
  setStoreValue(state, payload) {
    const { value, pathToSet, push = false } = payload;
    utils.default.methods.deepObjectSet(state, value, pathToSet, push);
  }
};
export const actions = () => {};
export const getters = {
  saleHeaders: (s, mutations) => {
    const headers = s.allColumns.filter(column => !column.type || column.type === "sale");
    return headers;
  },
  serviceHeaders: (s, mutations) => {
    const headers = s.allColumns.filter(column => !column.type || column.type === "service");
    return headers;
  },
  allColumns: s => s.allColumns,
  editedRow: s => s.editingRow
};
