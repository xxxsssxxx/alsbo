class Currency {
  static async getCurrencyRates() {
    try {
      const req = new Request("/api/currency_rates");
      const rates = await fetch(req);
      return rates.json();
    } catch (err) {
      throw new SyntaxError(`Get currency api error: ${err}`);
    }
  }
}

export default Currency;
