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
  saleHeaders: s => {
    const headers = s.allColumns.filter(({ type, selected }) => (!type || type === "sale") && selected.sale);
    return headers;
  },
  serviceHeaders: s => {
    const headers = s.allColumns.filter(({ type, selected }) => (!type || type === "service") && selected.service);
    return headers;
  },
  saleAvailableColumns: s => {
    const headers = s.allColumns.filter(({ type }) => !type || type === "sale");
    return headers;
  },
  serviceAvailableColumns: s => {
    const headers = s.allColumns.filter(({ type }) => !type || type === "service");
    return headers;
  },
  newModalFields: (s, mutations, rootState) => {
    if (!rootState.allFields.newItemModal) return false;
    const allFields = rootState.allFields.newItemModal;
    const main = [];
    const additional = [];
    const conclusive = [];
    allFields.forEach(field => {
      field.section === "main" && main.push(field);
      field.section === "additional" && !!field.service.find(el => el === rootState.service) && additional.push(field);
      field.section === "conclusive" && conclusive.push(field);
    });
    const fields = {
      main,
      additional,
      conclusive
    };
    return fields;
  },
  allColumns: s => s.allColumns,
  editedRow: s => s.editingRow
};
