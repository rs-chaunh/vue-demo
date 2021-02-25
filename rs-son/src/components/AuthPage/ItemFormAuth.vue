// TODO tên folder nếu đã k viết hoa thì không biết hoa hết, k để chỗ có chỗ k
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
      <!-- //TODO thiếu i18 -->
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
    <!-- //TODO cái này để là button thì hợp lí hơn vì nó k redirect, a thấy cái linkTo bị thừa -->
  </form>
</template>

<script>
// import axios from "axios";
import ItemButton from "../common/ItemButton.vue";
import ItemLink from "../common/ItemLink.vue";
import ItemPop from "../common/ItemPop.vue";
import ItemModal from "../common/ItemModal.vue";
import ItemLazyLoad from "../common/itemLazyLoad.vue";
export default {
  components: { ItemButton, ItemLink, ItemPop, ItemModal, ItemLazyLoad }, //TODO những component thì sẽ sử dụng ở nhiều chỗ, nên khi báo global
  data() {
    return {
      linkToReg: "#", //TODO cái này chỉ đc sử dụng 1 chỗ duy nhất thì viết thằng trên template luôn, cần gì đặt biến
      checkAction: false, //TODO tên biến k rõ, có gì để check đâu, có thể sửa thành như doLogin, doRegister,... 
      textBtn: "", //TODO nên bỏ ở computed
      textLink: "", //TODO nên bỏ ở computed
      email: "",
      password: "",
      errors: false,
      path: "", //TODO biến này k dùng thì xóa đi
      loading: "", //TODO loading ở đây là text thì nên đặt tên là loadingMessage, ...
      check: "", //TODO tên biến k rõ
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
      console.log(this.loading);
      this.check = this.$i18n.messages[this.getLocale].check;
      // VALIDATE FORM
      if (this.email == "" || this.messages == "" || this.password.length < 6) {
        this.errors = true;
        event.preventDefault(); //TODO preventDefault bị lặp lại quá nhiều lần, .prevent trên template luôn, hoặc đặt ngoài điều kiện if để nó luôn chạy
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
          //TODO đường dẫn api và apiKey nên lưu vào file env, nếu sau này có thay đổi firebase thì chỉ cần sửa 1 chỗ
          //TODO k nên truyền route, router vào action, async await đợi api chạy xong rồi redirect tiếp theo
          //TODO k truyền url kiểu này, set vào trong action luôn, ở đâu dispatch ra th
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
    }, // TODO k nên đặt tên là get..., vì sẽ hiểu đây là 1 action, computed cũng tương tự như data, computed nên đặt là danh từ
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
