import axios from "axios";
const apiUrl = import.meta.env.VITE_MY_ENV_VARIABLE;
let timer;

export default {
  login(context, payload) {
    console.log(apiUrl);
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
    let url = `${apiUrl}login`;
    const headers = {
      "Content-Type": "application/json",
    };

    if (mode === "signup") {
      url = `${apiUrl}register`;
      try {
        const response = await axios.post(url, {
          Headers: headers,
          name: payload.name,
          email: payload.email,
          password: payload.password,
        });
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    } else {
      console.log(url);
      try {
        const response = await axios.post(url, {
          email: payload.email,
          password: payload.password,
        });
        console.log(response.data);
      } catch (error) {
        throw new Error(error.response.data);
      }
    }
  },
  tryLogin(context) {
    // const token = localStorage.getItem("token");
    // const userId = localStorage.getItem("userId");
    // const tokenExpiration = localStorage.getItem("tokenExpiration");
    // const expiresIn = +tokenExpiration - new Date().getTime();
    // if (expiresIn < 0) {
    //   return;
    // }
    // timer = setTimeout(() => {
    //   context.dispatch("autoLogout");
    // }, expiresIn);
    // if (token && userId) {
    //   context.commit("setUser", {
    //     token,
    //     userId,
    //     tokenExpiration: null,
    //   });
    // }
  },
  // logout(context) {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("tokenExpiration");

  //   clearTimeout(timer);

  //   context.commit("setUser", {
  //     token: null,
  //     userId: null,
  //   });
  // },
  // autoLogout(context) {
  //   context.dispatch("logout");
  //   context.commit("setAutoLogout");
  // },
};
