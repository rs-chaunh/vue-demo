<template>
  <div class="card">
    <form @submit.prevent="loginOrSignup()">
      <div class="form-control">
        <label for="email">
          {{ $t("auth.inputText.email") }}
        </label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">
          {{ $t("auth.inputText.password") }}
        </label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p v-if="checkValid">
        {{ $t("auth.error.validate") }}
      </p>
      <template v-if="isLogin">
        <button type="submit">Login</button>
        <button class="flat" @click.prevent="toggle">
          {{ $t("auth.button.signupInstead") }}
        </button>
      </template>
      <template v-else>
        <button type="submit">{{ $t("auth.button.signup") }}</button>
        <button class="flat" @click.prevent="toggle">
          {{ $t("auth.button.loginInstead") }}
        </button>
      </template>
    </form>
    <error-auth></error-auth>
  </div>
</template>

<script>
import ErrorAuth from "../common/ErrorAuth";
export default {
  name: "Login",
  components: { ErrorAuth },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
    };
  },
  computed: {
    checkValid() {
      return this.$store.state.checkValid;
    },
  },
  methods: {
    toggle() {
      this.isLogin = !this.isLogin;
    },
    loginOrSignup() {
      this.$store.dispatch("loginOrSignup", {
        email: this.email,
        password: this.password,
        url: this.$route.query.redirect,
        isLogin: this.isLogin,
      });

      const messaging = firebase.messaging();
      messaging
        .getToken({
          vapidKey:
            "BKJRY0TZ_tn1Afod5lvQNuxlb63cqNxNfBdCq1UzLLCfemeVUFmrlBzOuWSmG3TktVRmyk862XGhDEgD5UWnvTM",
        })
        .then((currentToken) => {
          if (currentToken) {
            console.log("token", currentToken);
            firebase
              .database()
              .ref("/tokens")
              .push({
                token: currentToken,
                uid: userID,
              });
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    },
  },
  beforeRouteLeave() {
    console.log("good bye!");
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover {
  background-color: #edd2ff;
}

button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
