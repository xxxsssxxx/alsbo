class Row {
  static async add(data, userId) {
    const url = `/api/users/${userId}/row/add`;
    try {
      const req = new Request(url);
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const resposne = await fetch(req, options);
      const { rows, errorMessage } = await resposne.json();
      return { rows, errorMessage };
    } catch (err) {
      SyntaxError(`Adding row error: ${err}`);
    }
  }

  static async get(userId, table) {
    try {
      const resposne = await fetch(`/api/users/${userId}/rows/${table}`);
      const { rows, errorMessage } = await resposne.json();
      return { rows, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Getting rows error: ${err}`);
    }
  }
}

export default Row;
