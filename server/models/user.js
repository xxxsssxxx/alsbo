const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;

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
  lang: { type: String, default: "en" }
});

// Not using arrow function to keep a context
User.pre("save", function(next) {
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

User.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  console.log(user);
  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      lang: user.lang,
      email: user.email,
      address: user.address
    },
    process.env.JWT_KEY || "secretKey"
  );
  user.token = token;
  await user.save();
  return token;
};

module.exports = mongoose.model("User", User);
