<template>
  <loading v-model:active="isLoading" :is-full-page="fullPage" />
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
      <font-awesome-icon
        @click="setLinksWithFilterByText"
        :icon="['fas', 'magnifying-glass']"
        class="icons is-clickable"
      />
      <input
        class="input is-small"
        type="text"
        placeholder="Search or paste URL"
        v-model="searchInput"
        @keyup.enter="setLinksWithFilterByText"
      />
      <font-awesome-icon
        @click="openModal"
        :icon="['fas', 'plus']"
        class="icons is-clickable"
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
      isLoading: false,
      showModal: false,
      searchInput: "",
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
    async setLinksWithFilterByText() {
      if (this.searchInput === ``) {
        this.isLoading = true;
        await dispatch("getLinks");
        this.isLoading = false;
      }
      this.$store.dispatch("filterLink", this.searchInput);
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
.icons {
  padding: 4px;
  cursor: pointer;
  color: #8f8f8f;
  opacity: 0.6;
}
.icons:hover {
  color: #373737;
  opacity: 1;
}
</style>
