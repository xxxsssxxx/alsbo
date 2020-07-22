class Authorization {
  static async registrate(data) {
    const url = "/users/new";
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
      const user = await resposne.json();
      return user;
    } catch (err) {
      SyntaxError(`Registration error: ${err}`);
    }
  }

  static async login(data) {
    const url = "/users/login";
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
      const { matched, user } = await resposne.json();
      return { matched, user };
    } catch (err) {
      SyntaxError(`Registration error: ${err}`);
    }
  }
}

export default Authorization;
