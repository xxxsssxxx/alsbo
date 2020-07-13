class TableHeader {
  static async getHeaders(type, urlPrefix) {
    const url = urlPrefix ? `${urlPrefix}/${type}_headers` : `/${type}_headers`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const headers = this.getHeaderValues(data);
      return headers;
    } catch (err) {
      SyntaxError(`Get headers error: ${err}`);
    }
  }

  static async createHeaders(type, body, urlPrefix) {
    const url = urlPrefix ? `${urlPrefix}/${type}` : `/${type}`;
    try {
      const request = new Request(url);
      const options = {
        method: "POST",
        body
      };
      const response = await fetch(request, options);
      const data = await response.json();
      return data;
    } catch (err) {
      SyntaxError(`Create headers error: ${err}`);
    }
  }

  static getHeaderValues(header) {
    if (!header) return [];
    const headerRow = header.value;
    return headerRow;
  }
}

export default TableHeader;
