const fetch = require("node-fetch");
const { Router } = require("express");
const router = Router();
const currencies = ["USD", "EUR"];

(async function() {
  try {
    if (isFirstDayOfMonth()) {
      const url = "https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt";
      const resp = await fetch(url);
      const data = await resp.text();
      const rates = getCurrencyRates(data, currencies);
      return rates;
    }
  } catch (err) {
    console.log(`CNB API error: ${err}`);
  }

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

  function isFirstDayOfMonth() {
    const date = new Date();
    return date.getDate() === 1;
  }
})();

router.get("/currency_rates", (req, res) => {
  try {
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
