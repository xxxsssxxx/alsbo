class Column {
  static async add(data) {
    const url = "/api/columns/new";
    try {
      const req = new Request(url);
      const options = {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const resposne = await fetch(req, options);
      const { columns, errorMessage } = await resposne.json();
      return { columns, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Adding column error: ${err}`);
    }
  }

  static async toggle(data, userId) {
    const url = "/api/columns/toggle_column";
    try {
      const req = new Request(url);
      const options = {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const resposne = await fetch(req, options);
      const { columns, errorMessage } = await resposne.json();
      return { columns, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Adding column error: ${err}`);
    }
  }

  static async getAll(userId, options) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { urlPrefix } = options;
      const resposne = await fetch(`/api/columns/${userId}`);
      const { columns, errorMessage } = await resposne.json();
      return { columns, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Getting all columns error: ${err}`);
    }
  }
}

export default Column;
