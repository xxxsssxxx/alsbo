import User from "@/plugins/user";
import Column from "@/plugins/column";
import Field from "@/plugins/field";
import Row from "@/plugins/row";
import Vue from "vue";

export default {
  methods: {
    async updateUsersProp(prop, value, userId) {
      this.loading[prop] = true;
      const { token, user, errorMessage } = await User.save(prop, { id: userId, [prop]: value });
      if (errorMessage) {
        this.loading[prop] = false;
        this.error[prop] = true;
        return;
      }
      this.$store.commit("setCurrentUser", user);
      this.$store.dispatch("updateToken", token);
      this.success[prop] = true;
      this.loading[prop] = false;
      if (this.successTimer) clearTimeout(this.successTimer);
      this.successTimer = setTimeout(() => {
        this.success[prop] = false;
      }, this.$store.state.messageTimeout);
    },
    async addColumn(data, userId) {
      const { columns } = await Column.add(data, userId);
      this.$store.commit("items/setStoreValue", {
        value: columns,
        pathToSet: ["allColumns"]
      });
    },
    async toggleColumn(col, userId, type) {
      const { _id, selected } = col;
      const { columns } = await Column.toggle({ id: _id, selected: selected[type], type }, userId);
      this.$store.commit("items/setStoreValue", {
        value: columns,
        pathToSet: ["allColumns"]
      });
    },
    async getAllColumns(userId, urlPrefix) {
      const { columns } = await Column.getAll(userId);
      this.$store.commit("items/setStoreValue", {
        value: columns,
        pathToSet: ["allColumns"]
      });
    },
    async addRow(data, userId) {
      const { row } = data;
      const { rows } = await Row.add(data, userId);
      this.$store.commit("items/setStoreValue", {
        value: rows,
        pathToSet: ["tables", row.table]
      });
    },
    async getRows(userId, type) {
      const { rows } = await Row.get(userId, type);
      this.$store.commit("items/setStoreValue", {
        value: rows,
        pathToSet: ["tables", type]
      });
    },
    async rowDelete(userId, type, rowId) {
      const { rows } = await Row.delete(userId, type, rowId);
      this.$store.commit("items/setStoreValue", {
        value: rows,
        pathToSet: ["tables", type]
      });
    },
    async rowBulkDelete(userId, rows) {
      const { tables } = await Row.bulkDelete({ id: userId, rows });
      this.$store.commit("items/setStoreValue", {
        value: tables,
        pathToSet: ["tables"]
      });
    },
    translateHeaders(headers) {
      const headersArray = this.deepSimpleCopy(headers);
      const translated = headersArray.map(header => {
        header.text = this.$t(`main.table.header.${header.value}`);
        return header;
      });
      return translated;
    },
    async getFieldsFor(place, urlPrefix) {
      const { fields } = await Field.get(place, { urlPrefix });
      // Setting firs letter small
      const placeStore = place.replace(/^\w/, chr => chr.toLowerCase());
      this.$store.commit("setStoreValue", {
        value: fields,
        pathToSet: ["allFields", placeStore]
      });
    },
    setLoadingState(state) {
      this.$store.commit("setStoreValue", {
        value: state,
        pathToSet: ["loading"]
      });
    },
    // Method to set a deep obj values.
    // Main - the main object, value - value to set
    // Path - array of nested properties {a: {b :{c: val}}} = ["a", "b", "c"]
    deepObjectSet(main, value, path, push = false) {
      const obj = main;
      if (path.length === 1) {
        const lvl = path[0];
        if (push) obj[lvl].push(value);
        else Vue.set(obj, lvl, value);
        return;
      }
      const level = path[0];
      obj[level] = !obj[level] ? {} : obj[level];
      const deepObj = obj[level];
      path.splice(0, 1);
      this.deepObjectSet(deepObj, value, path, push);
    },
    // Method to get a deep obj values.
    // Main - the main object
    // Path - array of nested properties {a: {b :{c: val}}} = ["a", "b", "c"]
    deepObjectGet(main, path) {
      const obj = main;
      if (path.length === 1) {
        const lvl = path[0];
        return obj[lvl];
      }
      const level = path[0];
      const deepObj = obj[level];
      path.splice(0, 1);
      return this.deepObjectGet(deepObj, path);
    },
    deepSimpleCopy(obj) {
      let copy;
      try {
        copy = JSON.parse(JSON.stringify(obj));
        return copy;
      } catch (err) {
        throw new SyntaxError(`Error while parsing obj in deep simple copy: ${err}`);
      }
    }
  }
};
