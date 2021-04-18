// ==========================
// Dependencies
// ==========================

const mongoose = require("mongoose");

// ==========================
// Schema
// ==========================

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  alphabetID: {type: Number, required: true, unique: true},
  selected: Number,
  description: String,
  image: String,
  price: Number,
  stockQuantity: Number
});

const Items = mongoose.model("Item", itemSchema);

// ==========================
// Export
// ==========================

module.exports = Items;
