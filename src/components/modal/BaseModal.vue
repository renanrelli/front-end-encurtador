<template>
  <div id="modal" class="modal is-active">
    <div @click="closeModal" class="modal-background"></div>
    <slot></slot>
    <button
      @click="closeModal"
      class="modal-close is-large"
      aria-label="close"
    ></button>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
