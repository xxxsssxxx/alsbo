class Currency {
  static async get(userId) {
    try {
      const url = `/api/currency_rates/${userId}`;
      const resp = await fetch(url);
      const { rates, updated, errorMessage } = await resp.json();
      const parsedRates = JSON.parse(rates.value);
      return { parsedRates, updated, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Get currency api error: ${err}`);
    }
  }

  static async set(userId) {
    try {
      const data = { userId };
      const url = "/api/currency_rates/set";
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const resp = await fetch(url, options);
      const { rates, updated, errorMessage } = await resp.json();
      const parsedRates = JSON.parse(rates.value);
      return { parsedRates, updated, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Set currency api error: ${err}`);
    }
  }
}

export default Currency;
