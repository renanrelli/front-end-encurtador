<template>
  <router-view></router-view>
</template>

<script>
export default {
  async beforeMount() {
    const payload = localStorage.getItem("token");
    await this.$store.dispatch("tryLogin", payload);
  },
};
</script>

<style>
.primary-font-color {
  color: #525252;
}
html {
  background-color: #e0e0e0;
}
</style>
