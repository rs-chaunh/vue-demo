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
import ItemButton from "../Common/ItemButton";
import firebase from "firebase/app";
import "firebase/messaging";
import axios from "axios";
// import "firebase/messaging";
export default {
  components: { ItemButton },
  data() {
    return {
      email: "",
      messages: "",
      errors: false,
      token: "",
    };
  },
  methods: {
    // handleSubmitRequest() {
    //   let dataPostRequest = {
    //     userEmail: this.email,
    //     message: this.messages,
    //   };
    //   if (this.email == "" || this.messages == "") {
    //     this.errors = true;
    //   } else {
    //     this.$store.dispatch({
    //       type: "handlePostDataRequest",
    //       url: `https://coaches-project-8d77f-default-rtdb.firebaseio.com/request/${this.$route.params.id}.json`,
    //       data: dataPostRequest,
    //     });
    //     this.$router.push({ path: "/coaches" });
    //     event.preventDefault();
    //   }
    // },
    // SEND REQUEST
    handleSubmitRequest() {
      // let dataPostRequest = {
      //   userEmail: `Request from ${this.email}`,
      //   message: this.messages,
      // };

      let API_KEY =
        "AAAAxIOvnHg:APA91bFXkdc6nmHwV10NDuY8FlwSX5oTLxWrX89zSlbtaMlhQP3tbdpFZZZKnzy2gAAsixG_2VfLlYfJeo94RSG3hKvIsI0YifFV1PiNLPwuJ9-9uW40RV65VR19kGTCVMqQ0Y09Xw_n";

      axios
        .post(
          " https://fcm.googleapis.com/fcm/send",
          {
            notification: {
              title: "Portugal vs. Denmark",
              body: "Great match!",
              click_action: "https://google.com",
              icon: "favicon.png",
              sound: "default",
            },
            to: this.token,
          },
          {
            headers: {
              authorization: `key=${API_KEY}`,
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    // GET TOKEN TO SEND MESS
    const messaging = firebase.messaging();
    messaging
      .getToken({
        vapidKey:
          "BHfAYLs9Ki2M-6qa_yfRYGJNUp08A3WAjJFGWarwcTIHqir9YheKXhjfPuTmTgMq_X_wGto3DUGmyFQ716ARKaA",
      })
      .then((currentToken) => {
        if (currentToken) {
          this.token = currentToken;
          console.log(this.token);
          // axios.post(`https://coaches-project-8d77f-default-rtdb.firebaseio.com/notification.json`, currentToken)
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
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
