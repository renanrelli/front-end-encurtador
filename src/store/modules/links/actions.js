import axios from "axios";
const apiUrl = import.meta.env.VITE_MY_ENV_BASE_URL_API;

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  async getLinks(context) {
    const token = localStorage.getItem("token");
    const response = await axios.get("/links", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    context.commit("setLinks", response.data);
  },

  async getStatsLinks(context) {
    const token = localStorage.getItem("token");
    const response = await axios.get("/links/total", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = {
      totalViews: response.data.total_views,
      linksQty: response.data.links_quantity,
    };
    context.commit("setStatsLinks", payload);
  },
  async addLink(context, payload) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/links", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
