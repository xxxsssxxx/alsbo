const mongoose = require("mongoose");

const Setting = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, require: true },
  user: { type: mongoose.Schema.ObjectId, required: true },
  updated: { type: Date, required: false }
});

module.exports = mongoose.model("Setting", Setting);
