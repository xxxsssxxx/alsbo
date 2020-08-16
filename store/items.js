const utils = require("../mixins/utils");
const defaultState = {
  allColumns: [],
  tables: {},
  selectedRows: []
};
const getDefaultState = () => {
  return defaultState;
};
export const namespaced = () => true;
export const state = () => defaultState;
export const mutations = {
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
  selectedRows: s => s.selectedRows,
  tableToSave: (s, mutations, rootState) => {
    const service = rootState.service;
    if (service === "sales") return "sale";
    return "service";
  },
  sale: s => s.tables.sale || [],
  service: s => s.tables.service || [],
  allColumns: s => s.allColumns,
  editedRow: s => s.editingRow
};
