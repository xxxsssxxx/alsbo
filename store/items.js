const utils = require("../mixins/utils");
const defaultState = {
  mainFields: ["service"],
  saleAttr: ["service_type", "batch_number", "pn", "description", "quantity", "price_per_unit"],
  exchangeAttr: ["batch_number", "pn", "description", "serial_number", "new_serial_number"],
  loanAttr: ["batch_number", "pn", "description"],
  feeAttr: ["quantity", "description"],
  defaultAttr: ["quantity", "description"],
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
    const headers = s.allColumns.filter(column => (!column.type || column.type === "sale") && column.selected.sale);
    return headers;
  },
  serviceHeaders: (s, mutations) => {
    const headers = s.allColumns.filter(
      column => (!column.type || column.type === "service") && column.selected.service
    );
    return headers;
  },
  saleAvailableColumns: s => {
    const headers = s.allColumns.filter(column => !column.type || column.type === "sale");
    return headers;
  },
  serviceAvailableColumns: s => {
    const headers = s.allColumns.filter(column => !column.type || column.type === "service");
    return headers;
  },
  allColumns: s => s.allColumns,
  editedRow: s => s.editingRow
};
