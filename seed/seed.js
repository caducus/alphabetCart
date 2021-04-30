// ==========================
// Dependencies
// ==========================

const Item = require("../models/items.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/alphabetCart", {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ==========================
// Seed Data
// ==========================

const items = [
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
  name: "The Letter D",
  alphabetID: 4,
  selected: 0,
  description: "Insert generic text here about how awesome the D is.",
  image: "images/the_letter_d.gif",
  price: 7,
  stockQuantity: 3
  }),
  new Item({
  name: "The Letter E",
  alphabetID: 5,
  selected: 0,
  description: "Like all vowels (except U, nobody likes U), this letter is far more versatile and useful than you would ever know.",
  image: "images/the_letter_e.png",
  price: 8,
  stockQuantity: 10
  }),
  new Item({
  name: "The Letter F",
  alphabetID: 6,
  selected: 0,
  description: "One of the most popular letters, you'll rarely find it in stock.",
  image: "images/the_letter_f.png",
  price: 10,
  stockQuantity: 0
  }),
  new Item({
  name: "The Letter G",
  alphabetID: 7,
  selected: 0,
  description: "Not the most popular letter, but it's still quite good.",
  image: "images/the_letter_g.png",
  price: 3,
  stockQuantity: 7
  }),
  new Item({
  name: "The Letter H",
  alphabetID: 8,
  selected: 0,
  description: "What does this letter even do?",
  image: "images/the_letter_h.jpeg",
  price: 1,
  stockQuantity: 8
  }),
  new Item({
  name: "The Letter M",
  alphabetID: 13,
  selected: 0,
  description: "Like the mountain, this letter comes with some peaks.",
  image: "images/the_letter_m.gif",
  price: 4,
  stockQuantity: 3
  }),
  new Item({
  name: "The Letter S",
  alphabetID: 19,
  selected: 0,
  description: "Extremely versatile, extra curvy, and entirely sibilant.",
  image: "images/the_letter_s.jpeg",
  price: 5,
  stockQuantity: 5
  }),
  new Item({
  name: "The Letter U",
  alphabetID: 21,
  selected: 0,
  description: "Although it rarely stands on its own, in combination this letter is most compelling.",
  image: "images/the_letter_u.png",
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
