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
.icons {
  color: #8f8f8f;
}
.primary-font-color {
  color: #525252;
}
</style>
