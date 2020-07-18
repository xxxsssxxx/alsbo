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

// @route POST /users/:id/update
// @desc Update an user propperty
router.post("/api/users/:id/update", async (req, res) => {
  const { prop, data } = req.body;
  const { id } = data;
  const userAddressProps = ["state", "city", "street", "zip"];
  const isAddress = userAddressProps.find(el => el === prop);
  const newValue = data[prop];
  try {
    await User.findOne({ _id: id }, "firstname lastname address email password lang", async (err, user) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
        return;
      }
      // test a matching password
      if (!user) {
        res.status(404).json({ errorMessage: "error.user_not_found" });
        return;
      }
      isAddress ? (user.address[prop] = newValue) : (user[prop] = newValue);
      const token = await user.generateAuthToken();
      const newUser = await user.save();
      res.status(200).json({ user: newUser, token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /users/login
// @desc Validate users creadentioals and create a token
router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.findOne({ email }, "firstname lastname address email password lang", async (err, user) => {
      if (err) throw err;
      // test a matching password
      if (!user) {
        res.status(404).json({ message: "error.user_not_found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      const token = await user.generateAuthToken();
      res.status(200).json({ matched: passwordMatch, user, token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
