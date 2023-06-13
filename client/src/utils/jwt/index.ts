import cookie from "js-cookie";

const name = "x-auth-token";

export const jwt = {
  getToken: () => {
    return cookie.get(name);
  },
  setToken: (token: string) => {
    cookie.set(name, token);
  },
  clearToken: () => {
    cookie.remove(name);
  },

};
