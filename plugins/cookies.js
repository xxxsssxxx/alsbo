class Cookies {
  static get(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.startsWith(" ")) {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  static set(cname, cvalue, exdays = 10) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires = ${d.toUTCString()}`;
    document.cookie = `${cname} = ${cvalue};${expires};path=/`;
  }

  static remove(name) {
    document.cookie = `${name} =; Max-Age=-99999999;`;
  }
}

export default Cookies;
