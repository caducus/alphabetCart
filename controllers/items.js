// ==========================
// Dependencies
// ==========================

const express = require("express");
const router = express.Router();

const Item = require("../models/items.js");

// ==========================
// Get Routes
// ==========================

router.get("/", (req, res) => {
  Item.find({}, (error, foundItem) => {
    res.json(foundItem)
  });
});

// ==========================
// Post Routes
// ==========================

router.post("/", (req, res) => {
  Item.create(req.body, (error, createdItem) => {
    res.json(createdItem);
  });
});

// ==========================
// Put Routes
// ==========================

router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedItem) => {
    res.json(updatedItem);
  });
});

// ==========================
// Delete Routes
// ==========================

router.delete("/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id, (error, deletedItem) => {
    res.json(deletedItem)
  });
});

// ==========================
// Export
// ==========================

module.exports = router;
