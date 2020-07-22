const mongoose = require("mongoose");

const Column = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  list: [
    {
      text: { type: String, required: true },
      value: { type: String, required: true },
      align: { type: String, required: false },
      sortable: { type: Boolean, required: true, default: true },
      filterable: { type: Boolean, required: true, default: true },
      divider: { type: Boolean, required: true, default: true },
      selected: { type: Boolean, required: true, default: false }
    }
  ]
});

module.exports = mongoose.model("Column", Column);
