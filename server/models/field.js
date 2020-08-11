const mongoose = require("mongoose");

const Field = new mongoose.Schema({
  name: { type: String, required: true },
  service: [String],
  section: { type: String, required: true, default: "main" },
  type: { type: String, required: true, default: "string" },
  place: { type: String, required: false, default: "NewItemModal" },
  visible: { type: Boolean, required: true, default: true },
  rules: [String],
  selectOptions: [
    {
      value: { type: String, required: true },
      id: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("Field", Field);
