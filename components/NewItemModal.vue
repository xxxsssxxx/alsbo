<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col v-for="(field, i) in main" :key="i" cols="12" sm="6" md="6">
              <BaseInput
                :component="field.type"
                :label="$t(`main.table.header.${field.name}`)"
                :rules="field.rules"
                :field="field.name"
                :items="field.selectOptions"
                :value="item[field.name]"
                :error-messages="errors[field.name]"
                @select:changed="handleSelectChange($event, field.name)"
                @date:changed="handleDateChange($event, field.name)"
                @textfield:blured="handleBlurString($event, field.name)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(field, i) in additional" :key="i" cols="12" sm="6" md="6">
              <BaseInput
                :component="field.type"
                :label="$t(`main.table.header.${field.name}`)"
                :rules="field.rules"
                :field="field.name"
                :items="field.selectOptions"
                :value="item[field.name]"
                :error-messages="errors[field.name]"
                @select:changed="handleSelectChange($event, field.name)"
                @date:changed="handleDateChange($event, field.name)"
                @textfield:blured="handleBlurString($event, field.name)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(field, i) in conclusive" :key="i" cols="12" sm="6" md="6">
              <BaseInput
                :component="field.type"
                :label="$t(`main.table.header.${field.name}`)"
                :rules="field.rules"
                :field="field.name"
                :items="field.selectOptions"
                :value="item[field.name]"
                :error-messages="errors[field.name]"
                @select:changed="handleSelectChange($event, field.name)"
                @date:changed="handleDateChange($event, field.name)"
                @textfield:blured="handleBlurString($event, field.name)"
              />
            </v-col>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="handleClose" color="blue darken-1" text>{{ $t("main.button.cancel") }}</v-btn>
      <v-btn @click="handleSave" color="blue darken-1" text>{{ $t("main.button.save") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import BaseInput from "@/components/BaseInput";
export default {
  name: "NewItemModal",
  components: {
    BaseInput
  },
  props: {
    title: {
      type: String,
      default: () => "Title"
    },
    editedItem: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: () => ""
    },
    fields: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      item: {},
      valid: {},
      errors: {}
    };
  },
  computed: {
    ...mapGetters({
      currency: "currency",
      currentUser: "currentUser"
    }),
    main() {
      return this.$props.fields.main;
    },
    additional() {
      return this.$props.fields.additional;
    },
    conclusive() {
      return this.$props.fields.conclusive;
    }
  },
  watch: {
    "item.service": {
      immediate: true,
      handler(newValue, oldValue) {
        // Set default currency for user from user settings
        if (!newValue) {
          this.item.service = this.currentUser.defaultService;
          return;
        }
        if (oldValue && newValue && newValue.id === oldValue.id) return;
        const value = newValue ? newValue.value : "sales";
        const data = {
          value,
          pathToSet: ["service"]
        };
        this.$store.commit("setStoreValue", data);
      }
    },
    "item.price_per_unit": {
      handler(newValue, oldValue) {
        debugger;
        if (oldValue === newValue) return;
        const price = this.countAcquisitionPrice();
        this.$set(this.item, "acquistition_price", price || "0");
      }
    },
    "item.quantity": {
      handler(newValue, oldValue) {
        if (oldValue === newValue) return;
        const price = this.countAcquisitionPrice();
        this.$set(this.item, "acquistition_price", price || "0");
      }
    },
    "item.order_price": {
      handler(newValue, oldValue) {
        if (isNaN(newValue) || newValue === oldValue) return;
        if (!this.item.currency) return;
        const currency = this.item.currency.value;
        const rate = this.currency[currency];
        const price = rate ? newValue * rate : newValue;
        this.$set(this.item, "total_local_price", `${Math.floor(price * 100) / 100}`);
      }
    },
    "item.currency": {
      immediate: true,
      handler(newValue, oldValue) {
        // Set default currency for user from user settings
        if (!newValue) {
          this.item.currency = this.currentUser.defaultCurrency;
          return;
        }
        if (oldValue && newValue.id === oldValue.id) return;
        const currency = newValue.value;
        const rate = this.currency[currency];
        const price = rate ? newValue * rate : newValue;
        this.$set(this.item, "total_local_price", `${Math.floor(price * 100) / 100}`);
      }
    },
    "item.total_local_price": {
      handler(newValue, oldValue) {
        if (oldValue === newValue) return;
        const margin = this.countMargin();
        this.$set(this.item, "margin", margin || "0");
      }
    },
    "item.acquistition_price": {
      handler(newValue, oldValue) {
        if (oldValue === newValue) return;
        const margin = this.countMargin();
        this.$set(this.item, "margin", margin || "0");
      }
    }
  },
  methods: {
    countAcquisitionPrice() {
      const unitPrice = this.item.price_per_unit;
      const qty = this.item.quantity;
      if (!unitPrice || !qty) return "0";
      const price = qty * unitPrice;
      return Math.floor(price * 100) / 100;
    },
    countMargin() {
      const totalLocalPrice = this.item.total_local_price;
      const totalAcqPrice = this.item.acquistition_price;
      if (!totalLocalPrice || !totalAcqPrice) return "0";
      const margin = +totalLocalPrice - +totalAcqPrice;
      if (margin < 0) {
        this.errors.order_price = this.errors.order_price || [];
        this.errors.order_price.push(this.$t("main.notification.form.error.negative_margin"));
        return `-${Math.floor(margin * 100) / 100}`;
      }
      this.errors.order_price = [];
      return Math.floor(margin * 100) / 100;
    },
    handleSelectChange({ value, valid }, field) {
      this.$set(this.item, field, value);
      this.$set(this.valid, field, valid);
    },
    handleDateChange({ value, valid }, field) {
      this.$set(this.item, field, value);
      this.$set(this.valid, field, valid);
    },
    handleBlurString({ value, valid }, field) {
      this.$set(this.item, field, value);
      this.$set(this.valid, field, valid);
    },
    handleClose() {
      this.$emit("modal:cancel");
      this.resetFields();
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.$emit("modal:save", { item: this.item });
        this.resetFields();
      }
    },
    async resetFields() {
      await this.$nextTick();
      this.$set(this, "item", {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
