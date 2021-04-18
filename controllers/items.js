// ==========================
// Dependencies
// ==========================

const express = require("express");
const router = express.Router();

const Item = require("../models/items.js");

// ==========================
// Index Route
// ==========================

router.get("/", (req, res) => {
  Item.find({}, (error, foundItem) => {
    res.json(foundItem);
  });
});

// ==========================
// Create Route
// ==========================

router.post("/", (req, res) => {
  Item.create(req.body, (error, createdItem) => {
    res.json(createdItem);
  });
});

// ==========================
// Update Route
// ==========================

router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedItem) => {
    res.json(updatedItem);
  });
});

// ==========================
// Delete Route
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
