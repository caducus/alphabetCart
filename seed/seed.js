// ==========================
// Dependencies
// ==========================

const Item = require("../models/items.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/alphabetCart", {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ==========================
// Seed Data
// ==========================

var items = [
  new Item({
  name: "The Letter A",
  alphabetID: 1,
  selected: 0,
  description: "The essential start of any alphabet.",
  image: "images/the_letter_a.jpeg",
  price: 5,
  stockQuantity: 5
  }),
  new Item({
  name: "The Letter B",
  alphabetID: 2,
  selected: 0,
  description: "Second in line, but nonetheless a curvaceous beauty.",
  image: "images/the_letter_b.jpeg",
  price: 3,
  stockQuantity: 3
  }),
  new Item({
  name: "The Letter C",
  alphabetID: 3,
  selected: 0,
  description: "The third time is always a charm at a bargain of a price.",
  image: "images/the_letter_c.gif",
  price: 1,
  stockQuantity: 10
  }),
  new Item({
  name: "The Letter F",
  alphabetID: 6,
  selected: 0,
  description: "One of the most popular letters, you'll rarely find it in stock.",
  image: "images/the_letter_f.jpeg",
  price: 10,
  stockQuantity: 0
  }),
  new Item({
  name: "The Letter U",
  alphabetID: 21,
  selected: 0,
  description: "Although it rarely stands on its own, in combination this letter is most compelling.",
  image: "images/the_letter_u.jpeg",
  price: 3,
  stockQuantity: 3
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
