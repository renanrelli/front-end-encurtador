<template>
  <div class="container">
    <form @submit.prevent class="form">
      <div class="field" v-if="mode === `signup`">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Your name"
            v-model.trim="name"
            required
          />
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model.trim="email"
            required
          />
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model.trim="password"
            required
          />
        </p>
      </div>
      <article v-show="!formIsValid" class="message is-danger">
        <div class="message-body">
          Please enter a valid email and password (must be at least 6 characters
          long). If you trying register, enter a valid name also.
        </div>
      </article>
      <article v-show="error !== null" class="message is-danger">
        <div class="message-body">
          {{ error }}
        </div>
      </article>
      <article v-show="registerSuccess" class="message is-primary">
        <div class="message-body">
          You have <strong>successfully</strong> registered! Now log in
        </div>
      </article>

      <div class="field is-flex is-grouped is-justify-content-center">
        <p class="control">
          <button @click="submitForm" class="button is-success is-light">
            {{ submitButtonCaption }}
          </button>
          <button @click="switchAuthMode" class="button is-info is-light">
            {{ switchModeButtonCaption }}
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
      registerSuccess: false,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      this.error = null;
      if (this.mode === "signup" && this.name.length < 3) {
        this.formIsValid = false;
        return;
      }
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      let actionPayload = {
        email: this.email,
        password: this.password,
      };

      if (this.mode === "signup") {
        actionPayload.name = this.name;
      }

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);

          const redirectUrl = "/";
          this.$router.replace(redirectUrl);
        } else {
          await this.$store.dispatch("signup", actionPayload);
          this.registerSuccess = true;
          setTimeout(() => (this.registerSuccess = false), 5000);
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>
