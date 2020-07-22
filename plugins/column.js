class Column {
  static async add(data, userId) {
    const url = "/columns/new";
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
      const { urlPrefix } = options;
      const resposne = await fetch(`${urlPrefix}/columns/${userId}`);
      const { columns, errorMessage } = await resposne.json();
      return { columns, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Getting all columns error: ${err}`);
    }
  }
}

export default Column;
