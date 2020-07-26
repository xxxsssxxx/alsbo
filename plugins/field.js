class Field {
  static async get(place, options) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { urlPrefix } = options;
      const resposne = await fetch(`/api/fields/${place}`);
      const { fields, errorMessage } = await resposne.json();
      return { fields, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Getting fields for place: ${place}, error: ${err}`);
    }
  }
}

export default Field;
