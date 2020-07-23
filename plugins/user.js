class User {
  static async save(prop, data) {
    const url = `/api/users/${data.id}/update`;
    try {
      const req = new Request(url);
      const options = {
        method: "POST",
        body: JSON.stringify({ prop, data }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const resposne = await fetch(req, options);
      const { user, token, errorMessage } = await resposne.json();
      return { user, token, errorMessage };
    } catch (err) {
      SyntaxError(`Registration error: ${err}`);
    }
  }
}

export default User;
