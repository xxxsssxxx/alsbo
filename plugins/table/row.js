class TableRow {
  static async addRow(data) {
    const { type, id, row, urlPrefix } = data;
    try {
      const url = urlPrefix ? `${urlPrefix}/user/${type}_rows/add` : `/user/${type}_rows/add`;
      const request = new Request(url);
      // eslint-disable-next-line prefer-const
      let body = { userId: id };
      if (row) {
        body.row = row;
      }
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(request, options);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new SyntaxError(err);
    }
  }
  static async getRows(data) {
    const { type, id, urlPrefix } = data;
    const url = urlPrefix ? `${urlPrefix}/user/${type}_rows/${id}` : `/user/${type}_rows/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new SyntaxError(err);
    }
  }

  static async updateRow(data) {
    const { type, id, row, prevTable, urlPrefix } = data;
    const url = urlPrefix ? `${urlPrefix}/user/${type}_rows/update` : `/user/${type}_rows/update`;
    try {
      const request = new Request(url);
      const body = { userId: id, row, prevTable };
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(request, options);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new SyntaxError(err);
    }
  }

  static async deleteRow(data) {
    const { type, rowId, userId, urlPrefix } = data;
    const url = urlPrefix
      ? `${urlPrefix}/user/${userId}/${type}_rows/delete/${rowId}`
      : `/user/${userId}/${type}_rows/delete/${rowId}`;
    try {
      const request = new Request(url);
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(request, options);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new SyntaxError(`Destroy table api error: ${err}`);
    }
  }

  static async exportRow(data) {
    const { userId, lang, type, urlPrefix } = data;
    const url = urlPrefix ? `${urlPrefix}/export/${type}_rows` : `/export/${type}_rows`;
    const downloadUrl = urlPrefix ? `${urlPrefix}/export/get/rows/${type}` : `/export/get/rows/${type}`;
    try {
      const request = new Request(url);
      const body = { userId, lang };
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      };
      await fetch(request, options);
      window.open(downloadUrl, "_self");
    } catch (err) {
      throw new SyntaxError(err);
    }
  }
}

export default TableRow;
