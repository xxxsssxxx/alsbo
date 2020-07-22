const express = require("express");
const router = express.Router();
const Column = require("../models/column");

// @route GET /columns
// @desc  Get all columns
router.get("/api/columns", async (req, res) => {
  try {
    const columns = await Column.find();
    res.status(200).json(columns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /columns/new
// @desc Create a new column
router.post("/api/columns/new", async (req, res) => {
  const { type, list } = req.body;
  const columns = new Column({
    type,
    list
  });
  try {
    const newColumn = await columns.save();
    res.status(200).json(newColumn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /columns/update
// @desc Update an column propperty
router.post("/api/columns/update", async (req, res) => {
  const { data } = req.body;
  const { id, newValue } = data;
  try {
    await Column.findOne({ _id: id }, "type list", async (err, column) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      // test a matching password
      if (!column) {
        res.status(404).json({ errorMessage: "error.column_not_found" });
        return;
      }
      column.selected = newValue;
      const newColumn = await column.save();
      res.status(200).json({ column: newColumn });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
