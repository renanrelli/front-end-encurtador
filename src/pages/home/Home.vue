<template>
  <main>
    <nav-bar></nav-bar>
    <article class="container is-max-desktop mt-6">
      <stats class="mb-6"></stats>
      <link-list></link-list>
    </article>
  </main>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import Stats from "../../components/home/Stats.vue";
import LinkList from "../../components/home/LinkList.vue";
export default {
  components: {
    NavBar,
    Stats,
    LinkList,
  },
  async beforeMount() {
    await this.$store.dispatch("getLinks");
    await this.$store.dispatch("getStatsLinks");
  },
};
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
