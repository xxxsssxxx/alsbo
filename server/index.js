const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Schema.Types.Boolean.convertToFalse.add("");

const monogoURIString = process.env.MONGO_DB_KEY || "mongodb://localhost/api";

mongoose.connect(monogoURIString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", err => consola.log(err));
db.once("open", () => consola.log("Connected to db"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

// Routes
const users = require("../server/routes/users");
// Add routes to server
app.use(users);
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
