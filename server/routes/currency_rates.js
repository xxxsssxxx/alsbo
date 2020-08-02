const fetch = require("node-fetch");
const { Router } = require("express");
const router = Router();
const currencies = ["USD", "EUR"];
const Setting = require("../models/setting");

// @route POST /currency_rates/set
// @desc Fetch and set a currency rate for user
router.post("/api/currency_rates/set", async (req, res) => {
  try {
    const { userId } = req.body;
    const url = "https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt";
    const resp = await fetch(url);
    const data = await resp.text();
    const rates = getCurrencyRates(data, currencies);
    const setting = new Setting({
      name: "currencyRates",
      value: JSON.stringify(rates),
      user: userId,
      updated: new Date()
    });
    const newSetting = await setting.save();
    res.status(200).send({ rates: newSetting });
  } catch (err) {
    res.status(400).send({ errorMessage: err });
  }
});

// @route GET /currency_rates/:id
// @desc Ger currency rate for user
router.get("/api/currency_rates/:id", (req, res) => {
  try {
    const { id } = req.params;
    Setting.findOne({ name: "currencyRates", user: id }, "value updated", (err, setting) => {
      if (err) {
        res.status(403).json({ errorMessage: err });
      }
      if (!setting) {
        res.status(404).json({ errorMessage: "error.not_found" });
      }
      res.status(200).send({ rates: setting });
    });
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

function getCurrencyRates(data, currencies) {
  const rates = {};
  currencies.forEach(currency => {
    const regexp = new RegExp(`${currency}\\|(\\d+,*\\d+)`, "gm");
    const rate = +regexp
      .exec(data)[1]
      .split(",")
      .join(".");
    rates[currency.toLowerCase()] = rate;
  });
  return rates;
}

module.exports = router;
