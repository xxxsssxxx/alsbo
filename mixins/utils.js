import TableRow from "@/plugins/table/row.js";
import TableHeader from "@/plugins/table/header.js";
import User from "@/plugins/user";

export default {
  methods: {
    dateFormat(date) {
      return new Date(date).toLocaleDateString();
    },
    dateFromLocaleString(date) {
      const newDate = date
        .split("/")
        .reverse()
        .join("-");
      return newDate;
    },
    async updateUsersProp(prop, value) {
      this.loading[prop] = true;
      const id = this.$store.state.currentUser._id;
      const { token, user, errorMessage } = await User.save(prop, { id, [prop]: value });
      if (errorMessage) {
        this.loading[prop] = false;
        this.error[prop] = true;
        return;
      }
      this.$store.commit("setCurrentUser", user);
      this.$store.dispatch("updateToken", token);
      this.success[prop] = true;
      if (this.successTimer) clearTimeout(this.successTimer);
      this.successTimer = setTimeout(() => {
        this.success[prop] = false;
      }, this.$store.state.messageTimeout);
      this.loading[prop] = false;
    },
    async updateColumnProp(prop, value) {
      this.loading[prop] = true;
      const id = this.$store.state.currentUser._id;
      const { token, user, errorMessage } = await User.save(prop, { id, [prop]: value });
      if (errorMessage) {
        this.loading[prop] = false;
        this.error[prop] = true;
        return;
      }
      this.$store.commit("setCurrentUser", user);
      this.$store.dispatch("updateToken", token);
      this.success[prop] = true;
      if (this.successTimer) clearTimeout(this.successTimer);
      this.successTimer = setTimeout(() => {
        this.success[prop] = false;
      }, this.$store.state.messageTimeout);
      this.loading[prop] = false;
    },
    createTableArray(row, tableProps, service) {
      const rowCopy = this.deepSimpleCopy(row);
      const filteredRow = tableProps.map((head, i) => {
        let col = rowCopy.find(el => el.prop === head);
        if (col) {
          // Check if the string suposed to be formatted
          if (col.prop.includes("date")) col.value = this.dateFormat(col.value);
          if (typeof col.value === "object") {
            // Change "value" property name for "name"
            if (col.value.value) {
              col.value.name = col.value.value;
              delete col.value.value;
            }
            Object.keys(col.value).forEach(key => {
              if (key === "name") return;
              const attrVal = col.value[key];
              col[key] = attrVal;
            });
            col.value = col.value.name;
          }
        } else {
          col = { prop: head, value: "---" };
        }
        return col;
      });
      const data = {
        row,
        filteredRow,
        attrs: this.$store.getters["items/cuttedAttrs"]
      };
      this.addCuttedProps(data);
      return filteredRow;
    },
    addfeeArray(fee, tableProps) {
      const rowCopy = this.deepSimpleCopy(fee);
      const filteredRow = tableProps.map((head, i) => {
        const col = rowCopy.find(el => el.prop === head);
        if (!col) return;
        // Check if the string suposed to be formatted
        if (col.prop.includes("date")) col.value = this.dateFormat(col.value);
        if (typeof col.value === "object") {
          // Change "value" property name for "name"
          if (col.value.value) {
            col.value.name = col.value.value;
            delete col.value.value;
          }
          Object.keys(col.value).forEach(key => {
            if (key === "name") return;
            const attrVal = col.value[key];
            col[key] = attrVal;
          });
          col.value = col.value.name;
        }
        return col;
      });
      return filteredRow.filter(el => el);
    },
    // Method to set a deep obj values.
    // Main - the main object, value - value to set
    // Path - array of nested properties {a: {b :{c: val}}} = ["a", "b", "c"]
    deepObjectSet(main, value, path, push = false) {
      const obj = main;
      if (path.length === 1) {
        const lvl = path[0];
        if (push) obj[lvl].push(value);
        else obj[lvl] = value;
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
    setStoreDefaultValue(value, path) {
      path.unshift("default");
      const payload = {
        value,
        pathToSet: path
      };
      this.$store.commit("setStoreValue", payload);
    },
    deleteStoreDefaultValues() {
      const payload = {
        value: null,
        pathToSet: ["default"]
      };
      this.$store.commit("setStoreValue", payload);
    },
    resetStoreValue(toDefault, name) {
      let payload;
      if (!toDefault) {
        payload = {
          value: "",
          pathToSet: [name]
        };
      } else {
        const value = this.$store.state.default[name];
        if (value) {
          payload = {
            value,
            pathToSet: [name]
          };
        } else {
          throw new Error("There is no default value for this propperty in a store. You should set it first");
        }
        this.$store.commit("setStoreValue", payload);
      }
    },
    updateAttr(object, value, matchGoal, propToChange = "value") {
      if (object) {
        const aim = object[matchGoal];
        this.$set(aim, propToChange, value);
      }
    },
    togglePlainAttrType(object, bool, matchGoal, type) {
      const value = bool ? "plain" : type;
      this.updateAttr(object, value, matchGoal, "type");
    },
    async addRow(payload, id) {
      const { item, feeItems, table, tableProps, feeProps } = payload;
      const fee = feeItems.map(fee => this.addfeeArray(fee, feeProps));
      const data = {
        type: table,
        id,
        row: {
          values: this.createTableArray(item, tableProps),
          fee
        },
        urlPrefix: this.urlPrefix
      };
      const rowPayload = {
        value: await TableRow.addRow(data),
        push: false,
        pathToSet: `${table}TableContent`
      };
      this.$store.commit("items/addTableRow", rowPayload);
    },
    async updateRow(payload, id) {
      const { item: row, feeItems, service, table, tableProps, prevTable, feeProps } = payload;
      const data = {
        type: table,
        prevTable,
        id,
        row,
        urlPrefix: this.urlPrefix
      };
      row.values = this.createTableArray(row.values, tableProps, service);
      row.fee = feeItems.map(fee => this.addfeeArray(fee, feeProps));
      const resp = await TableRow.updateRow(data);
      await this.updateStoreTable(data, table, resp.updated);
      if (prevTable) {
        await this.updateStoreTable(data, prevTable, resp.prevTableUpdated);
      }
    },
    async deleteRow(payload, userId) {
      const { table, rowId } = payload;
      const data = {
        type: table,
        userId,
        rowId,
        urlPrefix: this.urlPrefix
      };
      const rowPayload = {
        value: await TableRow.deleteRow(data),
        push: false,
        pathToSet: `${table}TableContent`
      };
      this.$store.commit("items/addTableRow", rowPayload);
    },
    async saveTableHeadersToStore(type, id) {
      const payload = {
        value: await TableHeader.getHeaders(type, this.urlPrefix),
        pathToSet: [`${type}TableHead`],
        push: false
      };
      await this.$store.commit("items/setTableHeaders", payload);
    },
    // Use when want a row without a specific column or columns
    filterRowColumnsByName(content, names = ["service"]) {
      const tableCont = [];
      if (!content.length) return content;
      content.forEach(row => {
        row = row.values.filter(col => {
          const exeption = names.find(el => col.prop === el);
          if (!exeption) return col;
        });
        tableCont.push(row);
      });
      return tableCont;
    },
    deepSimpleCopy(obj) {
      let copy;
      try {
        copy = JSON.parse(JSON.stringify(obj));
        return copy;
      } catch (err) {
        throw new SyntaxError(`Error while parsing obj in deep simple copy: ${err}`);
      }
    },
    serviceChanged(initial, changed) {
      const initialService = initial.service;
      const changedService = changed.find(el => el.prop === "service");
      if (initialService !== changedService.value) {
        return changedService.prop;
      } else {
        return false;
      }
    },
    getRowValueByName(row, name) {
      let value = row.find(el => el.prop === name).value;
      if (typeof value === "string") {
        value = value.toLowerCase();
      }
      return value;
    },
    // Set the table type depends on "service attribute"
    tableSwitch(service) {
      switch (service) {
        case "sales":
          return "sale";
        case "exchange":
          return "service";
        default:
          return "service";
      }
    },
    updateStoreTable(data, table, value) {
      const rowPayload = {
        value,
        push: false,
        pathToSet: `${table}TableContent`
      };
      this.$store.commit("items/addTableRow", rowPayload);
    },
    addCuttedProps(data) {
      const { filteredRow, attrs, row } = data;
      attrs.forEach(attr => {
        const prop = row.find(el => el.prop === attr);
        let value;
        if (prop) {
          if (typeof prop.value === "object") {
            value = prop.value.name || prop.value.value;
          } else {
            value = prop.value;
          }
          const col = {
            prop: prop.prop,
            value: value.toLowerCase()
          };
          if (prop.value.id) col.id = prop.value.id;
          filteredRow.push(col);
        }
      });
    },
    createModalGlobalError(data) {
      const { prop } = data;
      const value = { prop };
      const payload = {
        value,
        push: false,
        pathToSet: ["modalGlobalError"]
      };
      this.$store.commit("setStoreValue", payload);
    },
    deleteModalGlobalError() {
      const payload = {
        value: null,
        push: false,
        pathToSet: ["modalGlobalError"]
      };
      this.$store.commit("setStoreValue", payload);
    },
    objectsToValueArrays(objects) {
      const array = objects.map(obj => {
        if (typeof obj !== "object" && obj.isArray()) {
          return obj;
        } else {
          return Object.values(obj);
        }
      });
      return array;
    }
  }
};
