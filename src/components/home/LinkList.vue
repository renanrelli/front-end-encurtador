<template>
  <div>
    <div class="is-flex is-justify-content-end is-align-items-center mb-6">
      <p class="mr-2">Filter by</p>
      <font-awesome-icon
        class="icons-filter"
        :icon="['fas', 'arrow-down-wide-short']"
        v-if="showIconByAsc"
        @click="toggleShowIcon"
      />
      <font-awesome-icon
        class="icons-filter"
        v-if="showIconByDesc"
        :icon="['fas', 'arrow-up-wide-short']"
        @click="toggleShowIcon"
      />
    </div>
    <div v-if="showRemoveModal">
      <remove-link-modal
        :id="this.idToRemove"
        @close="showRemoveModal = false"
      ></remove-link-modal>
    </div>
    <div v-if="showEditModal">
      <edit-link-modal
        :linkTitle="this.linkEditProps.title"
        :linkOriginalUrl="this.linkEditProps.originalUrl"
        :linkId="this.linkEditProps.id"
        :linkShortUrl="this.linkEditProps.shortenedUrl"
        @close="showEditModal = false"
      ></edit-link-modal>
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
              <font-awesome-icon
                class="icons-card"
                @click="copyToClipboard(link.shortenedUrl)"
                :icon="['fas', 'copy']"
              />
              <font-awesome-icon
                class="icons-card"
                @click="
                  setLinkEditProps({
                    title: link.title,
                    id: link.id,
                    shortenedUrl: link.shortenedUrl,
                    originalUrl: link.originalUrl,
                  })
                "
                :icon="['fas', 'pen-to-square']"
              />
              <font-awesome-icon
                @click="openRemoveModal(link.id)"
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
import EditLinkModal from "../modal/EditLinkModal.vue";
import { useToast } from "vue-toastification";
const apiUrl = import.meta.env.VITE_MY_ENV_BASE_URL;

export default {
  data() {
    return {
      showEditModal: false,
      showRemoveModal: false,
      idToRemove: null,
      showIconByAsc: true,
      showIconByDesc: false,
      linkEditProps: {
        title: null,
        id: null,
        shortenedUrl: null,
        originalUrl: null,
      },
    };
  },
  components: {
    BaseCard,
    RemoveLinkModal,
    EditLinkModal,
  },
  computed: {
    links() {
      const links = this.$store.getters.links;
      if (this.showIconByAsc) {
        return links.sort((a, b) => a.views_quantity - b.views_quantity);
      } else {
        return links.sort((a, b) => b.views_quantity - a.views_quantity);
      }
    },
  },
  methods: {
    openRemoveModal(idx) {
      this.showRemoveModal = true;
      this.idToRemove = idx;
    },
    setLinkEditProps(payload) {
      this.linkEditProps.title = payload.title;
      this.linkEditProps.id = payload.id;
      this.linkEditProps.shortenedUrl = payload.shortenedUrl;
      this.linkEditProps.originalUrl = payload.originalUrl;
      this.openEditModal();
    },
    openEditModal() {
      this.showEditModal = true;
    },
    async copyToClipboard(url) {
      await navigator.clipboard.writeText(`${apiUrl}` + url);
      const toast = useToast();
      toast("Link copy to clipboard!");
    },
    toggleShowIcon() {
      this.showIconByAsc = !this.showIconByAsc;
      this.showIconByDesc = !this.showIconByDesc;
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
.icons-crud > :hover {
  opacity: 1;
}
.icons-crud {
  display: flex;
  gap: 16px;
  cursor: pointer;
}
.icons-filter {
  height: 20px;
  opacity: 0.6;
}
.icons-filter:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
