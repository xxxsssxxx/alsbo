const express = require("express");
const router = express.Router();
const Field = require("../models/field");

// @route GET /fields
// @desc  Get all fields for a place
router.get("/api/fields/:place", async (req, res) => {
  try {
    const place = req.params.place;
    const fields = await Field.find({ place }, "name section service type visible selectOptions").exec();
    res.status(200).json({ fields });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
