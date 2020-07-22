const express = require("express");
const router = express.Router();
const Column = require("../models/column");

// @route GET /columns
// @desc  Get all columns for user with :id
router.get("/api/columns/:id", async (req, res) => {
  try {
    const columns = await Column.find({ user: req.params.id });
    res.status(200).json({ columns });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /columns/new
// @desc Create a new column
router.post("/api/columns/new", async (req, res) => {
  const { text, value, type, align, sortable, filterable, divider, selected, userId } = req.body.data;
  try {
    const column = new Column({
      text,
      value,
      type,
      align,
      sortable,
      filterable,
      divider,
      selected,
      user: userId
    });
    await column.save();
    const columns = await Column.find({ user: userId });
    res.status(200).json({ columns });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /columns/update
// @desc Update an column propperty
router.post("/api/columns/update", async (req, res) => {
  const { data } = req.body;
  const { id, prop, newValue } = data;
  try {
    await Column.findOne(
      { _id: id },
      "text, value, type, align, sortable, filterable, divider, selected",
      async (err, column) => {
        if (err) {
          res.status(403).json({ errorMessage: err });
          return;
        }
        // test a matching password
        if (!column) {
          res.status(404).json({ errorMessage: "error.column_not_found" });
          return;
        }
        column[prop] = newValue;
        await column.save();
        const columns = await Column.find();
        res.status(200).json({ columns });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /columns/select
// @desc Update an selected column propperty
router.post("/api/columns/select", async (req, res) => {
  const { data } = req.body;
  const { id, newValue } = data;
  try {
    await Column.findOne(
      { _id: id },
      "text, value, type, align, sortable, filterable, divider, selected",
      async (err, column) => {
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
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
