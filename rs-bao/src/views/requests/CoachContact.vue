<template>
  <form @submit.prevent="onSendMessage">
    <div class="input-group">
      <label for="email">{{ $t("email") }}</label>
      <input type="email" id="send-email" v-model.trim="email" />
    </div>
    <div class="input-group">
      <label for="message">{{ $t("message") }}</label>
      <textarea rows="5" id="message" v-model.trim="message" />
    </div>
    <p class="errors" v-if="!formIsValid">
      {{ $t("notifyMessage") }}
    </p>
    <div class="input-submit">
      <coach-button>{{ $t("sendMessage") }}</coach-button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
    };
  },
  methods: {
    onSendMessage() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }
      const messageUser = {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      };
      this.$store.dispatch("requests/contact", messageUser);
      this.$router.replace("/coaches");
    },
  },
};
</script>
<style scoped>
.errors {
  font-weight: bold;
  color: red;
}

form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}
.input-group {
  margin: 10px 0;
}
.input-group label {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
}

.input-group input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.input-group textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

form .input-submit {
  width: 100%;
  text-align: center;
}

form .input-submit button {
  outline: none;
}
</style>
