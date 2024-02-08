<template>
  <base-modal @close="closeModal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit '{{ this.linkTitle }}' short link</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="title" class="label">Title</label>
          <div class="control">
            <input
              class="input is-success has-text-left"
              type="text"
              placeholder="My title for google shortened link"
              id="title"
              v-model.trim="title"
              required
            />
          </div>
          <p v-show="!titleIsValid" class="help is-danger">
            Please enter a title with 6 characteres at least!
          </p>
        </div>

        <div class="field">
          <label for="short-url" class="label"
            >Short URL (6 at 8 charachteres)</label
          >
          <div class="control">
            <input
              class="input is-success has-text-left"
              type="text"
              placeholder="mylink"
              id="short-url"
              v-model.trim="shortUrl"
            />
          </div>
          <p v-show="!shortUrlIsValid" class="help is-danger">
            Please enter a short url between 6 to 8 characters.
          </p>
        </div>

        <div class="field">
          <label for="original-url" class="label">Enter the original URL</label>
          <div class="control">
            <input
              class="input is-success has-text-left"
              type="url"
              placeholder="https://google.com/"
              value=""
              id="original-url"
              pattern="https://.*"
              v-model.trim="originalUrl"
              required
            />
          </div>
          <p v-show="!originalUrlIsValid" class="help is-danger">
            Please enter a link with https://
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="submit" class="button is-success">Submit</button>
        <button @click="closeModal" class="button">Cancel</button>
      </footer>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "./BaseModal.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  props: ["linkTitle", "linkOriginalUrl", "linkId", "linkShortUrl"],
  components: {
    BaseModal,
  },
  data() {
    return {
      titleIsValid: true,
      shortUrlIsValid: true,
      originalUrlIsValid: true,
      originalUrl: this.linkOriginalUrl,
      title: this.linkTitle,
      shortUrl: this.linkShortUrl,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    async submit() {
      this.titleIsValid = true;
      this.shortUrlIsValid = true;
      this.originalUrlIsValid = true;

      if (this.title.length < 6) {
        this.titleIsValid = false;
      }

      if (this.shortUrl.length !== 0) {
        if (!(this.shortUrl.length >= 6 && this.shortUrl.length <= 8)) {
          this.shortUrlIsValid = false;
        }
      }

      if (!this.originalUrl.includes("https://")) {
        console.log(`teste`);
        this.originalUrlIsValid = false;
      }
      if (
        this.titleIsValid &&
        this.shortUrlIsValid &&
        this.originalUrlIsValid
      ) {
        let payload = {
          id: this.linkId,
          originalUrl: this.originalUrl,
          title: this.title,
        };
        if (this.shortUrl.length > 0) {
          payload.shortenedUrl = this.shortUrl;
        }

        const statusResponse = await this.$store.dispatch("editLink", payload);
        if (statusResponse !== `OK`) {
          toast.error(
            "This short URL has been used before, enter another value"
          );
          return;
        }
        toast.success("Edit with success!");
        this.$store.dispatch("getLinks");
        this.$emit("close");
      }
    },
  },
};
</script>
