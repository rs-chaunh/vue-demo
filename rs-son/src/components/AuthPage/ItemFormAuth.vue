// FIXED
<template>
  <teleport to="body">
    <transition name="popup">
      <item-pop-up :popupTitle="loadingMessage" v-if="$store.state.auth.loading">
        <item-lazy-load></item-lazy-load>
      </item-pop-up>
    </transition>
    <transition name="popup">
      <item-pop-up :popupTitle="titleErr" v-if="$store.state.auth.checkLogin == false">
        <p>{{ textErr }}</p>
      </item-pop-up>
    </transition>
    <item-modal
      v-if="$store.state.auth.checkLogin == false || $store.state.auth.loading == true"
    ></item-modal>
  </teleport>

  <form @submit.prevent="handleSubmit">
    <div class="form-control">
      <label for="email"> {{ $t("email") }} </label>
      <input type="email" v-model="email" id="email" />
    </div>
    <div class="form-control">
      <label for="password">{{ $t("pass") }}</label>
      <input type="password" v-model="password" id="password" />
    </div>
    <p v-if="errors">
      {{ $t("errAuth") }}
    </p>
    <item-button> {{ textBtn }} </item-button>
    <item-button @click.prevent="handleChangeAction()" class="flat">
      {{ textLink }} {{ $t("instead") }}
    </item-button>
    <!-- FIXED -->
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import firebase from "firebase/app";
import * as firebase_API from '../../env'

export default {
  data() {
    return {
      doLogin: false, //FIXED
      email: "",
      password: "",
      errors: false,
      loadingMessage: "", //FIXED
      titleErr: "", //FIXED
      token: "",
    };
  },
  methods: {
    ...mapMutations(["auth"]),
    handleChangeAction() {
      this.doLogin = !this.doLogin;
    },
    async handleSubmit() {
      // SET TEXT FOR POPUP
      this.loadingMessage = this.$i18n.messages[this.locale].loadingMessage;
      this.titleErr = this.$i18n.messages[this.locale].titleErr;
      // VALIDATE FORM
      if (this.email == "" || this.messages == "" || this.password.length < 6) {
        this.errors = true;
        //FIXED
      } else {
        let dataPost = {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        };
        if (this.textBtn == "Signup" || this.textBtn == "Đăng ký") {
          console.log("SIGN UP");
          event.preventDefault();
          let result = await this.$store.dispatch({
            type: "auth/handleSignUp",
            data: dataPost,
            token: this.token,
          });
          if (result) {
            this.handleSetRouter(this.$route.query.redirect, -1);
          } else {
            this.$store.commit("auth/SET_CHECK_LOGIN", false);
          }
          //FIXED
        } else {
          // LOGIN
          console.log("LOGIN");
          let result = await this.$store.dispatch({
            type: "auth/handleLogin",
            data: dataPost,
            token: this.token,
          });
          if (result) {
            // CHECK LINK TO LOGIN OR REGISTER
            let arrCoachesTemp = this.coach.coachesTemp;
            let userId = this.auth.tokenId;
            let index = -1;
            if (userId != null && arrCoachesTemp != null) {
              index = Object.keys(arrCoachesTemp).findIndex(
                (item) => item == userId.localId
              );
            }
            // DON'T TO REGISTER PAGE IF HAVE ACCOUNT
            this.handleSetRouter(this.$route.query.redirect,index);
          } else {
            this.$store.commit("auth/SET_CHECK_LOGIN", false);
          }
        }
      }
    },
    handleSetRouter(query, index) {
      if ((query && index == -1)) {
        this.$router.push({
          path: "/register",
        });
      } else {
        this.$router.push({
          path: "/coaches",
        });
      }
    },
    handleSetToken() {
      // GET TOKEN TO SEND MESS
      const messaging = firebase.messaging();
      messaging
        .getToken({
          vapidKey:
          `${firebase_API.KEY_MESS}`
        })
        .then((currentToken) => {
          if (currentToken) {
            this.token = currentToken;
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
  },
  created() {
    this.handleSetToken();
    this.handleChangeAction();
  },
  computed: {
    ...mapState(["auth", "coach"]),
    textErr() {
      let text = "";
      if (!this.auth.checkLogin) {
        text = this.$i18n.messages[this.locale].errLoginContent;
      }
      return text;
    }, //FIXED
    locale() {
      return this.auth.locale;
    },
    textBtn() {
      // FIXED
      if (this.doLogin) {
        return this.$i18n.messages[this.locale].textBtn;
      } else {
        return this.$i18n.messages[this.locale].textLink;
      }
    },
    textLink() {
      // FIXED
      if (!this.doLogin) {
        return this.$i18n.messages[this.locale].textBtn;
      } else {
        return this.$i18n.messages[this.locale].textLink;
      }
    },
  },
  watch: {
    locale: function () {
      this.handleChangeAction();
    },
  },
};
</script>

<style scoped lang="scss">
.popup-leave-to,
.popup-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.popup-leave-from,
.popup-enter-to {
  opacity: 1;
  transform: scale(1);
}

.popup-enter-active {
  transition: all 0.5s;
}
.popup-leave-active {
  transition: all 0.4s;
}

form {
  margin: 1rem;
  padding: 1rem;
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

  .flat {
    background-color: transparent;
    color: #3a0061;
    border: none;
  }
  .flat:hover {
    background-color: #edd2ff;
  }
}
</style>
