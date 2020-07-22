const mongoose = require("mongoose");

const Column = new mongoose.Schema({
  value: { type: String, required: true },
  type: { type: String, required: false },
  align: { type: String, required: false },
  sortable: { type: Boolean, required: true, default: true },
  filterable: { type: Boolean, required: true, default: true },
  divider: { type: Boolean, required: true, default: true },
  selected: { type: Boolean, required: true, default: true },
  user: { type: mongoose.Schema.ObjectId, required: true }
});

module.exports = mongoose.model("Column", Column);
