<template>
  <div>
    <h2 class="primary-font-color has-text-weight-bold is-uppercase">Stats</h2>
    <div class="mt-4 is-flex stats">
      <div class="stats-item is-flex">
        <span class="mr-4 icon">
          <font-awesome-icon class="icons stats-icon" :icon="['fas', 'link']" />
        </span>
        <div>
          <h3 class="is-size-3 has-text-weight-bold">
            {{ statsLinks.linksQuantity }}
          </h3>
          <h4>Links</h4>
        </div>
      </div>
      <div class="stats-item is-flex">
        <span class="mr-4 icon">
          <font-awesome-icon class="icons stats-icon" :icon="['fas', 'eye']" />
        </span>
        <div>
          <h3 class="is-size-3 has-text-weight-bold">
            {{ statsLinks.totalViews }}
          </h3>
          <h4>Views</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    statsLinks() {
      return this.$store.getters.statsLinks;
    },
  },
};
</script>

<style scoped>
.estou-testando {
  align-items: flex-start;
}
.is-size-3 {
  line-height: 100%;
}
.stats {
  justify-content: space-between;
}
.stats-icon {
  height: 20px;
}
</style>
