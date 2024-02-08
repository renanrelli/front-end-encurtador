<template>
  <div>
    <div v-if="showModal">
      <remove-link-modal
        :id="this.idToRemove"
        @close="showModal = false"
      ></remove-link-modal>
    </div>
    <div v-for="link in links" :key="link">
      <base-card>
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <div>
            <h2 class="is-size-3">{{ link.title }}</h2>
            <a
              v-bind:href="'http://localhost:8000/' + link.shortenedUrl"
              target="_blank"
              class="has-text-link is-size-6"
              >localhost:8000/{{ link.shortenedUrl }}</a
            >
          </div>
          <div class="is-flex">
            <div class="is-flex mr-6">
              <h2 class="font-view mr-2 is-size-5">
                {{ link.views_quantity }}
              </h2>
              <font-awesome-icon
                class="icons-card"
                :icon="['fas', 'chart-simple']"
              />
            </div>
            <div class="icons-crud">
              <font-awesome-icon class="icons-card" :icon="['fas', 'copy']" />
              <font-awesome-icon
                class="icons-card"
                :icon="['fas', 'pen-to-square']"
              />
              <font-awesome-icon
                @click="openModal(link.id)"
                class="icons-card"
                :icon="['fas', 'trash']"
              />
            </div>
          </div>
        </div>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
import RemoveLinkModal from "../modal/RemoveLinkModal.vue";
export default {
  data() {
    return {
      showModal: false,
      idToRemove: null,
    };
  },
  components: {
    BaseCard,
    RemoveLinkModal,
  },
  computed: {
    links() {
      return this.$store.getters.links;
    },
  },
  methods: {
    openModal(idx) {
      this.showModal = true;
      this.idToRemove = idx;
    },
  },
};
</script>

<style scoped>
.font-view {
  color: #6f6b9a;
  opacity: 0.6;
  font-weight: 700;
}
.icons-card {
  color: #6f6b9a;
  height: 20px;
  width: 20px;
  opacity: 0.6;
}
.icons-crud {
  display: flex;
  gap: 16px;
  cursor: pointer;
}
</style>
