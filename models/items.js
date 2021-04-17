// ==========================
// Dependencies
// ==========================

const mongoose = require("mongoose");

// ==========================
// Schema
// ==========================

const itemSchema = new mongoose.Schema({
  itemName: {type: String, required: true},
  itemID: {type: Number, required: true},
  itemSelected: Number,
  itemDescription: String,
  itemImageLink: String,
  itemPrices: [{
    itemQuantity: Number,
    itemPrice: Number
  }]
});

const Item = mongoose.model("Item", itemSchema);

// ==========================
// Export
// ==========================

module.exports = Item;
