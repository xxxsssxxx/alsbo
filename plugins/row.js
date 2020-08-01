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

  static async delete(userId, table, rowId) {
    try {
      const options = {
        method: "DELETE"
      };
      const resposne = await fetch(`/api/users/${userId}/${table}/row/${rowId}/delete`, options);
      const { rows, errorMessage } = await resposne.json();
      return { rows, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Deleting row error: ${err}`);
    }
  }

  static async bulkDelete(data) {
    const { id } = data;
    try {
      const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const resposne = await fetch(`/api/users/${id}/rows/delete`, options);
      const { tables, errorMessage } = await resposne.json();
      return { tables, errorMessage };
    } catch (err) {
      throw new SyntaxError(`Deleting row error: ${err}`);
    }
  }
}

export default Row;
