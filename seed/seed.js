// ==========================
// Dependencies
// ==========================

const Item = require("../models/items.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shoppingCart")

// ==========================
// Seed Data
// ==========================

var items = [
  new Item({
  itemName: "The Letter A",
  itemID: 1,
  itemSelected: 0,
  itemDescription: "The essential start of any alphabet.",
  itemImageLink: "public/images/the_letter_a.jpeg",
  itemPrices: [{
    itemQuantity: 1,
    itemPrice: 3}, {
    itemQuantity: 2,
    itemPrice: 5
    }]
  }),
  new Item({
  itemName: "The Letter B",
  itemID: 2,
  itemSelected: 0,
  itemDescription: "Second in line, but nonetheless a curvaceous beauty.",
  itemImageLink: "public/images/the_letter_b.jpeg",
  itemPrices: [{
    itemQuantity: 1,
    itemPrice: 3}, {
    itemQuantity: 2,
    itemPrice: 5
    }]
  }),
  new Item({
  itemName: "The Letter C",
  itemID: 3,
  itemSelected: 0,
  itemDescription: "The third time is always a charm at a bargain of a price.",
  itemImageLink: "public/images/the_letter_c.gif",
  itemPrices: [{
    itemQuantity: 1,
    itemPrice: 3}, {
    itemQuantity: 2,
    itemPrice: 5
    }]
  }),
  new Item({
  itemName: "The Letter F",
  itemID: 6,
  itemSelected: 0,
  itemDescription: "One of the most popular letters, you'll rarely find it in stock.",
  itemImageLink: "public/images/the_letter_f.jpeg",
  itemPrices: [{
    itemQuantity: 1,
    itemPrice: 3}, {
    itemQuantity: 2,
    itemPrice: 5
    }]
  }),
  new Item({
  itemName: "The Letter U",
  itemID: 21,
  itemSelected: 0,
  itemDescription: "Although it rarely stands on its own, in combination this letter is most compelling.",
  itemImageLink: "public/images/the_letter_u.jpeg",
  itemPrices: [{
    itemQuantity: 1,
    itemPrice: 3}, {
    itemQuantity: 2,
    itemPrice: 5
    }]
  })
];

// ==========================
// Function to populate DB
// ==========================

let done = 0;
for (let i = 0; i < items.length; i++) {
  items[i].save(function(error, results) {
    done++;
    if (done === items.length) {
      exit();
    };
  });
};
function exit() {
  mongoose.disconnect();
}
