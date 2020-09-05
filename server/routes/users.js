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

(async () => {
  const dates = ["2020-09-13", "2020-11-09", "2020-02-27", "2020-05-04", "2020-12-11"];
  const currencies = [
    { value: "czk", id: 3 },
    { value: "eur", id: 1 },
    { value: "usd", id: 2 },
    { value: "czk", id: 3 },
    { value: "usd", id: 2 }
  ];
  const names = ["Starbucks s.r.o", "Neurolink s.r.o", "WizzAir", "Tesla", "Apple inc."];
  const pos = ["jxjs8sdDS", "sad8sDsd", "gdss88ds7", "hgft7s454", "asd867fs5"];
  const serviceTypes = [
    { value: "old", id: 2 },
    { value: "oil", id: 3 },
    { value: "tvp", id: 4 },
    { value: "csa", id: 6 },
    { value: "sale", id: 1 }
  ];
  const bathces = ["sad65sdDS87", "dfgdg54dfg64", "dferter45458df", "dfv58754", "sdf5we7867w"];
  const pns = ["asfafa", "sferferfe", "wqwe746", "qwe87278", "sad6872367"];
  const quantites = ["12", "50", "5", "100", "96"];
  const pricesPerUnit = ["100", "500", "5105", "55", "12"];
  const acquistitions = ["1200", "25000", "25525", "5500", "1152"];
  const orderPrices = ["1500", "28000", "30525", "600", "900"];
  const localPrices = ["1500", "732900", "674327", "600", "19881"];
  const margins = ["300", "707900", "648802", "-4900", "18729"];
  const serialNumbers = ["sadwwer333", "weqe334", "324sasdg", "asd32rwe", "qweqw445sd"];
  const newSerialNumbers = ["sa54as45", "s8454324e", "asd548asd54", "asd78asd24", "asd8845asd"];
  const invSatuses = [
    { value: "approved", id: 1 },
    { value: "pending", id: 2 },
    { value: "pending", id: 2 },
    { value: "approved", id: 1 },
    { value: "approved", id: 1 }
  ];
  const tables = ["sale", "service"];
  try {
    await User.updateOne({}, { $set: { sale: [], service: [] } });
    await User.findOne({}, "service sale", async (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      let row = {};
      for (let i = 0; i < 5; i++) {
        row = {
          action_date: dates[i],
          service: { value: "sales", id: 1 },
          currency: currencies[i],
          customer_name: names[i],
          customer_po: pos[i],
          customer_type: "",
          service_type: serviceTypes[i],
          batch_number: bathces[i],
          pn: pns[i],
          description: `Test number ${i}`,
          quantity: quantites[i],
          acquistition_price: acquistitions[i],
          margin: margins[i],
          price_per_unit: pricesPerUnit[i],
          invoice_status: invSatuses[i],
          order_price: orderPrices[i],
          total_local_price: localPrices[i],
          table: tables[0]
        };
        user[tables[0]].push(row);
      }
      row.service = { value: "exchange", id: 2 };
      row.table = tables[1];
      for (let i = 0; i < 5; i++) {
        row = {
          action_date: dates[i],
          service: { value: "exchange", id: 2 },
          currency: currencies[i],
          customer_name: names[i],
          customer_po: pos[i],
          customer_type: "",
          service_type: serviceTypes[i],
          batch_number: bathces[i],
          pn: pns[i],
          description: `Test number ${i}`,
          quantity: quantites[i],
          acquistition_price: acquistitions[i],
          margin: margins[i],
          price_per_unit: pricesPerUnit[i],
          invoice_status: invSatuses[i],
          order_price: orderPrices[i],
          total_local_price: localPrices[i],
          serial_number: serialNumbers[i],
          new_serial_number: newSerialNumbers[i],
          table: tables[0]
        };
        user[tables[1]].push(row);
      }
      await user.save();
    });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = router;
