<template>
  <div v-if="showModal">
    <add-link-modal @close="showModal = false"></add-link-modal>
  </div>
  <nav
    class="navbar is-flex is-align-items-center is-justify-content-space-between p-2"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-item">
      <a href="/" class="is-size-4"> Home </a>
    </div>

    <div class="navbar-item">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="icons" />
      <input
        class="input is-small"
        type="text"
        placeholder="Search or paste URL"
      />
      <font-awesome-icon
        @click="openModal"
        :icon="['fas', 'plus']"
        class="icons add-icon"
      />
    </div>

    <div class="navbar-item">
      <div class="buttons">
        <button @click="logout" class="button is-danger is-light">
          <strong> Logout</strong>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import AddLinkModal from "../modal/AddLinkModal.vue";
export default {
  components: {
    AddLinkModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      const redirectUrl = "/auth";
      this.$router.replace(redirectUrl);
    },
    openModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #f0f0f0;
}

input[type="text"] {
  font-size: 16px;
}

input {
  background-color: #e0e0e0;
  text-align: center;
  width: 450px;
  height: 32px;
}

input::placeholder {
  color: #7a7a7a;
  font-size: 16px;
}

.navbar-item:not(:first-child):not(:last-child) {
  gap: 12px;
}
.add-icon {
  padding: 4px;
  cursor: pointer;
}
</style>
