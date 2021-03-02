<template>
  <form @submit.prevent="sendRequest">
    <div class="form-control">
      <label for="email">{{ $t("contact.inputText.yourEmail") }}</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div class="form-control">
      <label for="message">{{ $t("contact.inputText.message") }}</label>
      <textarea rows="5" id="message" v-model="message" required></textarea>
    </div>
    <div class="actions">
      <button class="my-button">{{ $t("contact.button.sendMessage") }}</button>
    </div>
  </form>
</template>

<script>
import "firebase/firestore";
export default {
  props: ["id"],
  name: "CoachesContactForm",
  data() {
    return {
      email: "",
      message: "",
    };
  },
  computed: {
    userId() {
      return this.id;
    },

    sendRequest() {
      this.$store.dispatch("sendRequest", {
        id: this.userId,
        email: this.email,
        message: this.message,
      });

      
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}

.label {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
</style>
