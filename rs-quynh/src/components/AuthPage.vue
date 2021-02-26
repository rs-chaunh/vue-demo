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
    checkErrors(type, message, rule, valueRule = "") {
      const value = this.dataForm[type].value;

      switch (rule) {
        case "isRequired":
          {
            if (value.length === 0) this.dataForm[type].error = message;
            else this.dataForm[type].error = "";
          }
          break;
        case "isEmail":
          {
            if (value.length > 0) {
              if (
                value.indexOf("@") < 1 ||
                value.lastIndexOf(".") < 1 ||
                value.length - value.lastIndexOf(".") < 2 ||
                value.lastIndexOf(".") - value.indexOf("@") < 2
              ) {
                this.dataForm[type].error = message;
              } else {
                this.dataForm[type].error = "";
              }
            }
          }
          break;
        case "minLength":
          {
            if (value.length !== 0) {
              if (value.length <= valueRule)
                this.dataForm[type].error = message;
              else this.dataForm[type].error = "";
            }
          }
          break;
      }
    },
    validateEmail() {
      this.checkErrors("email", "Email must not be empty.", "isRequired");
      this.checkErrors(
        "email",
        "Email must be included with an '@' ",
        "isEmail"
      );
    },
    validatePassword() {
      this.checkErrors("password", "Password must not be empty", "isRequired");
      this.checkErrors(
        "password",
        "Password must be over 6 characters.",
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
      this.validateEmail();
      this.validatePassword();

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