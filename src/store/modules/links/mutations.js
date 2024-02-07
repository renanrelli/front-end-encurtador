export default {
  setLinks(state, payload) {
    state.arrayLinks = payload;
  },
  setStatsLinks(state, payload) {
    (state.stats.totalViews = payload.totalViews),
      (state.stats.linksQuantity = payload.linksQty);
  },
};
