<template>
  <loading v-model:active="isLoading" :is-full-page="fullPage" />
  <base-modal @close="closeModal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure you want to delete ?</p>
      </header>
      <section class="modal-card-body">
        <p>
          If you delete will be gone forever. Are you sure you want to proceed?
        </p>
      </section>
      <footer class="modal-card-foot">
        <button @click="closeModal" class="button">Cancel</button>
        <button @click="confirmRemove" class="button is-danger">Delete</button>
      </footer>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "./BaseModal.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  components: {
    BaseModal,
  },
  props: [`id`],
  data() {
    return {
      isLoading: false,
      fullPage: true,
      titleIsValid: true,
      shortUrlIsValid: true,
      originalUrlIsValid: true,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async confirmRemove() {
      this.isLoading = true;
      try {
        const response = await this.$store.dispatch("removeLink", this.id);
        if (response.status === 204) {
          toast.error("Link removed!");
          this.$emit("close");
          await this.$store.dispatch("getLinks");
          await this.$store.dispatch("getStatsLinks");
        }
      } catch (error) {
        this.$emit("close");
        throw new Error(
          error || `Something gone wrong! Try again in a few minutes`
        );
      }
      this.isLoading = true;
    },
  },
};
</script>
