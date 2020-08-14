const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// @route GET /users
// @desc  Get all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /users/new
// @desc Create a new user
router.post("/api/users/new", async (req, res) => {
  const { firstname, lastname, state, city, street, zip, email, password } = req.body;
  const user = new User({
    firstname,
    lastname,
    address: {
      state,
      city,
      street,
      zip
    },
    email,
    password
  });
  try {
    await user.generateAuthToken();
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /users/login
// @desc Validate users creadentioals and create a token
router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.findOne(
      { email },
      "firstname lastname address email password lang defaultCurrency defaultService",
      async (err, user) => {
        if (err) throw err;
        // test a matching password
        if (!user) {
          res.status(404).json({ message: "error.user_not_found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        const token = await user.generateAuthToken();
        res.status(200).json({ matched: passwordMatch, user, token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /users/:id/update
// @desc Update an user propperty
router.post("/api/users/:id/update", async (req, res) => {
  const { prop, data } = req.body;
  const { id } = data;
  const userAddressProps = ["state", "city", "street", "zip"];
  const isAddress = userAddressProps.find(el => el === prop);
  const newValue = data[prop];
  try {
    await User.findOne(
      { _id: id },
      "firstname lastname address email password lang defaultCurrency defaultService",
      async (err, user) => {
        if (err) {
          res.status(403).json({ errorMessage: err });
          return;
        }
        if (!user) {
          res.status(404).json({ errorMessage: "error.user_not_found" });
          return;
        }
        isAddress ? (user.address[prop] = newValue) : (user[prop] = newValue);
        const token = await user.generateAuthToken();
        const newUser = await user.save();
        res.status(200).json({ user: newUser, token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route Get /users/:id/rows/:offset/:table
// @desc Get users rows for table
router.get("/api/users/:id/rows/:offset/:table", async (req, res) => {
  const { id, table, offset } = req.params;
  try {
    await User.findOne({ _id: id }, "service sale", async (err, user) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      if (!user) {
        res.status(404).json({ errorMessage: "error.user_not_found" });
        return;
      }
      const newRows = user[table].slice(0, offset);
      res.status(200).json({ rows: newRows });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /users/:id/row/add
// @desc Add an user rows
router.post("/api/users/:id/row/add", async (req, res) => {
  const { row, offset } = req.body;
  const id = req.params.id;
  try {
    await User.findOne({ _id: id }, "service sale", async (err, user) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      if (!user) {
        res.status(404).json({ errorMessage: "error.user_not_found" });
        return;
      }
      user[row.table].push(row);
      const newUser = await user.save();
      const newRows = newUser[row.table].slice(0, offset);
      res.status(200).json({ rows: newRows });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /users/:id/row/edit
// @desc edit an user rows
router.post("/api/users/:id/row/edit", async (req, res) => {
  const { row, offset, oldTable } = req.body;
  const id = req.params.id;
  try {
    await User.findOne({ _id: id }, "service sale", async (err, user) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      if (!user) {
        res.status(404).json({ errorMessage: "error.user_not_found" });
        return;
      }
      if (!oldTable) {
        let editedRow = user[row.table].find(el => `${el._id}` === row._id);
        editedRow = Object.assign(editedRow, row);
      } else {
        user[oldTable].pull({ _id: row._id });
        user[row.table].push(row);
      }
      const newUser = await user.save();
      const newRows = newUser[row.table].slice(0, offset);
      res.status(200).json({ rows: newRows });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /users/:id/row/:table/:rowId/delete
// @desc Delete an users row
router.delete("/api/users/:id/:table/row/:rowId/delete", async (req, res) => {
  const { table, rowId, id } = req.params;
  try {
    await User.findOne({ _id: id }, "service sale", async (err, user) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      if (!user) {
        res.status(404).json({ errorMessage: "error.user_not_found" });
        return;
      }
      user[table].pull({ _id: rowId });
      const newUser = await user.save();
      res.status(200).json({ rows: newUser[table] });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PATCH /users/:id/row/:rowId/delete
// @desc Bulk delete an users rows
router.patch("/api/users/:id/rows/delete", async (req, res) => {
  const { id, rows } = req.body;
  try {
    await User.findOne({ _id: id }, "service sale", async (err, user) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      if (!user) {
        res.status(404).json({ errorMessage: "error.user_not_found" });
        return;
      }
      rows.forEach(({ _id, table }) => {
        user[table].pull({ _id });
      });
      const newUser = await user.save();
      res.status(200).json({ tables: newUser });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
