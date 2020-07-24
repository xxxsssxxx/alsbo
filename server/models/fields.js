const mongoose = require("mongoose");

const Field = new mongoose.Schema({
  value: { type: String, required: true },
  type: { type: String, required: false },
  align: { type: String, required: false },
  sortable: { type: Boolean, required: true, default: true },
  filterable: { type: Boolean, required: true, default: true },
  divider: { type: Boolean, required: true, default: true },
  selected: {
    sale: { type: Boolean, required: true, default: true },
    service: { type: Boolean, required: true, default: true }
  },
  user: { type: mongoose.Schema.ObjectId, required: true },
  width: { type: Number, required: false, default: 150 }
});

module.exports = mongoose.model("Field", Field);
