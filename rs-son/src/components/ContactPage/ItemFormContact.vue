//NOT FIX  đây là 1 page luôn, sao lại đặt tên là item nhỉ => : Em có bỏ form này ở dưới Contact Page nữa a
<template>
  <form @submit.prevent="handleSubmitRequest">
    <div class="form-control">
      <label for="email">{{ $t("Yemail") }}</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div class="form-control">
      <label for="message">{{ $t("mess") }}</label>
      <textarea rows="5" id="message" v-model="messages"></textarea>
    </div>
    <p v-if="errors" class="errors">{{ $t("err") }}.</p>
    <div class="action">
      <item-button>{{ $t("send") }}</item-button>
    </div>
  </form>
</template>

<script>

import firebase from "firebase/app";
import "firebase/messaging";

export default {
  data() {
    return {
      email: "",
      messages: "",
      errors: false,
    };
  },
  methods: {
    // SEND REQUEST AND NOTIFICATION
    handleSubmitRequest() {
      let dataPostRequest = {
        userEmail: this.email,
        message: this.messages,
      };
      if (this.email == "" || this.messages == "") {
        this.errors = true;
      } else {
        // PUSH NOTIFICATION
        const db = firebase.firestore();
        let idCoach = this.$route.params.id;
        db.collection("message")
          .add({
            title: `You have message from ${this.email}`,
            content: {
              message : `Content : ${this.messages}`,
              idCoach : idCoach,
              defaultURL : window.location.host
            },
          })
          .then(console.log("Document written with ID: "))
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        // SEND REQUEST
        this.$store.dispatch({
          type: "auth/handlePostDataRequest",
          requestId : this.$route.params.id,
          data: dataPostRequest,
        });
        this.$router.push({ path: "/coaches" });
        event.preventDefault();
      }
    },
  },
  
};
</script>

<style scoped lang="scss">
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  .errors {
    color: red;
    font-weight: 600;
  }
  .form-control {
    margin: 0.5rem 0;
    label {
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
  }
  .action {
    text-align: center;
  }
}
</style>
