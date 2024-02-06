<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  async beforeMount() {
    const payload = localStorage.getItem("token");
    await this.$store.dispatch("tryLogin", payload);
  },
};
</script>
