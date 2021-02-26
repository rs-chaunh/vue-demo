<template>
  <teleport to="body">
    <transition name="popup">
      <item-pop :titlePopup="loading" v-if="$store.state.loading">
        <item-lazy-load></item-lazy-load>
      </item-pop>
    </transition>
    <transition name="popup">
      <item-pop :titlePopup="check" v-if="$store.state.checkLogin == false">
        <p>{{ getTextErr }}</p>
      </item-pop>
    </transition>
    <item-modal
      v-if="$store.state.checkLogin == false || $store.state.loading == true"
    ></item-modal>
  </teleport>

  <form @submit.prevent="handleSubmit">
    <div class="form-control">
      <label for="email">E-mail</label>
      <input type="email" v-model="email" id="email"/>
    </div>
    <div class="form-control">
      <label for="password">{{ $t("pass") }}</label>
      <input type="password" v-model="password" id="password" />
    </div>
    <p v-if="errors">
      {{ $t("errAuth") }}
    </p>
    <item-button> {{ textBtn }} </item-button>
    <item-link @click.prevent="handleChangeAction()" class="flat" :linkTo="linkToReg">
      {{ textLink }} {{ $t("instead") }}
    </item-link>
  </form>
</template>

<script>
// import axios from "axios";
import ItemButton from "../Common/ItemButton";
import ItemLink from "../Common/ItemLink";
import ItemPop from "../Common/ItemPop";
import ItemModal from "../Common/ItemModal";
import ItemLazyLoad from "../Common/itemLazyLoad";
export default {
  components: { ItemButton, ItemLink, ItemPop, ItemModal, ItemLazyLoad },
  data() {
    return {
      linkToReg: "#",
      checkAction: false,
      textBtn: "",
      textLink: "",
      email: "",
      password: "",
      errors: false,
      path: "",
      loading: "",
      check: "",
    };
  },
  methods: {
    handleChangeAction() {
      // SET TEXT FOR BTN
      this.checkAction = !this.checkAction;
      if (this.checkAction) {
        this.textBtn = this.$i18n.messages[this.getLocale].textBtn;
        this.textLink = this.$i18n.messages[this.getLocale].textLink;
      } else {
        this.textBtn = this.$i18n.messages[this.getLocale].textLink;
        this.textLink = this.$i18n.messages[this.getLocale].textBtn;
      }
    },
    handleSubmit() {
      // SET TEXT FOR POPUP
      this.loading = this.$i18n.messages[this.getLocale].loading;
      this.check = this.$i18n.messages[this.getLocale].check;
      // VALIDATE FORM
      if (this.email == "" || this.messages == "" || this.password.length < 6) {
        this.errors = true;
        event.preventDefault();
      } else {
        let dataPost = {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        };
        if (this.textBtn == "Signup" || this.textBtn == "Đăng ký") {
          // SIGN UP
          console.log("SIGN UP");
          event.preventDefault();
          this.$store.dispatch({
            type: "handleSignUp",
            url:
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCe3EbXvHvc8FM4F00XoX8Fm_hOQDDctic",
            data: dataPost,
            route: this.$route,
            router: this.$router,
          });
        } else {
          // LOGIN
          console.log("LOGIN");
          event.preventDefault();
          this.$store.dispatch({
            type: "handleLogin",
            url:
              "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe3EbXvHvc8FM4F00XoX8Fm_hOQDDctic",
            data: dataPost,
            route: this.$route,
            router: this.$router,
          });
        }
      }
    },
  },
  created() {
    this.handleChangeAction();
  },
  computed: {
    getTextErr() {
      let text = "";
      if (!this.$store.state.checkLogin) {
        text = this.$i18n.messages[this.getLocale].errLoginContent;
      }
      return text;
    },
    getLocale() {
      return this.$store.state.locale;
    },
  },
  watch: {
    getLocale: function () {
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
