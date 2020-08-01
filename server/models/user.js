const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;

const Row = new mongoose.Schema({
  action_date: { type: String, required: false, default: new Date() },
  acquistition_price: { type: String, required: false },
  batch_number: { type: String, required: false },
  currency: { type: Object, required: false },
  customer_name: { type: String, required: false },
  total_local_price: { type: String, required: false },
  customer_po: { type: String, required: false },
  customer_type: { type: String, required: false },
  description: { type: String, required: false },
  exchange_status: { type: String, required: false },
  invoice_status: { type: Object, required: false },
  margin: { type: String, required: false },
  new_serial_number: { type: String, required: false },
  pn: { type: String, required: false },
  price_per_unit: { type: String, required: false },
  order_price: { type: String, required: false },
  quantity: { type: String, required: false },
  repair_status: { type: String, required: false },
  service: { type: Object, required: false },
  service_type: { type: Object, required: false },
  serial_number: { type: String, required: false },
  table: { type: String, required: true }
});

const User = new mongoose.Schema({
  firstname: { type: String, minlength: [2, "Minimum 2 characters"], required: true },
  lastname: { type: String, minlength: [2, "Minimum 2 characters"], required: true },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: String, required: true }
  },
  email: {
    type: String,
    index: { unique: true },
    required: true
  },
  password: { type: String, required: true },
  registred_at: { type: Date, default: Date.now },
  token: {
    type: String,
    required: true
  },
  lang: { type: String, default: "en" },
  sale: [Row],
  service: [Row]
});

// Not using arrow function to keep a context
User.pre("save", function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

User.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      lang: user.lang,
      email: user.email,
      address: user.address
    },
    process.env.JWT_SECRET_KEY || "secretKey"
  );
  user.token = token;
  await user.save();
  return token;
};

module.exports = mongoose.model("User", User);
