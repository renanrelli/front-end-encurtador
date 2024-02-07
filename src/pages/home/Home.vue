<template>
  <main>
    <nav-bar></nav-bar>
    <article class="container is-max-desktop mt-6">
      <stats></stats>
    </article>
  </main>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import Stats from "../../components/home/Stats.vue";
export default {
  async beforeMount() {
    await this.$store.dispatch("getLinks");
    await this.$store.dispatch("getStatsLinks");
  },
  components: {
    NavBar,
    Stats,
  },
};
</script>

<style scoped>
main {
  height: 100vh;
  background-color: #e0e0e0;
}
</style>
