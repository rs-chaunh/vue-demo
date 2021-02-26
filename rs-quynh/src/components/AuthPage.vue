<template>
  <auth
    :isError="isError"
    :isHasAccount="isHasAccount"
    :dataForm="dataForm"
    :isOpenModal="isOpenModal"
    :validateEmail="validateEmail"
    :validatePassword="validatePassword"
    :handlerChangeType="handlerChangeType"
    @handlerChangeInput="handlerChangeInput"
    :handlerSubmitAuthForm="handlerSubmitAuthForm"
    :handlerCloseModal="handlerCloseModal"
  ></auth>
</template>

<script>
import Auth from "../views/Auth/Auth.vue";
import { checkErrors } from "../assets/js/validate";

export default {
  components: { Auth },
  data() {
    return {
      isHasAccount: true,
      dataForm: {
        email: {
          value: "",
          error: "",
        },
        password: {
          value: "",
          error: "",
        },
      },
      isOpenModal: false,
    };
  },
  computed: {
    isError() {
      var keys = Object.keys(this.dataForm);
      for (let i = 0; i < keys.length; i++) {
        if (this.dataForm[keys[i]].error) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    validateEmail() {
      checkErrors(this.dataForm.email, "Email must not be empty.", "isRequired");
      checkErrors(
        this.dataForm.email,
        "Email must be included with an '@' ",
        "isEmail"
      );
    },
    validatePassword() {
      checkErrors(this.dataForm.password, "Password must not be empty", "isRequired");
      checkErrors(
        this.dataForm.password,
        "Password must be at least 6 characters long.",
        "minLength",
        6
      );
    },
    handlerChangeType() {
      this.isHasAccount = !this.isHasAccount;
    },
    handlerChangeInput(type, valueInput) {
      this.dataForm[type].value = valueInput;
    },
    handlerSubmitAuthForm() {
      [this.validateEmail, this.validatePassword].forEach((func) => func())

      if (!this.isError) {
        this.isOpenModal = true;

        if (this.isHasAccount) {
          this.$store.dispatch("login", {
            email: this.dataForm.email.value,
            password: this.dataForm.password.value,
          });
        } else {
          this.$store.dispatch("signup", {
            email: this.dataForm.email.value,
            password: this.dataForm.password.value,
          });
        }
      }
    },
    handlerCloseModal() {
      this.isOpenModal = false;
    },
  },
};
</script>