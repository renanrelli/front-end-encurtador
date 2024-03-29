import axios from "axios";
const apiUrl = import.meta.env.VITE_MY_ENV_BASE_URL_API;

export default {
  login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `${apiUrl}/login`;
    console.log(url);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    };

    if (mode === "signup") {
      url = `${apiUrl}/register`;
      try {
        const response = await axios.post(url, {
          Headers: headers,
          name: payload.name,
          email: payload.email,
          password: payload.password,
        });
      } catch (error) {
        throw new Error(error.response);
      }
    } else {
      try {
        const response = await axios.post(url, {
          Headers: headers,
          email: payload.email,
          password: payload.password,
        });
        context.commit("setUser", {
          token: response.data,
        });
        localStorage.setItem("token", `${response.data}`);
      } catch (error) {
        throw new Error(error.response.data);
      }
    }
  },
  async tryLogin(context, payload) {
    const token = localStorage.getItem("token");

    if (token) {
      context.commit("setUser", {
        token,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");

    context.commit("setUser", {
      token: null,
    });
  },
};
