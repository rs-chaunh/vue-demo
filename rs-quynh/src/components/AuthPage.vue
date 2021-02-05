<template>
  <auth
    :errors="errors"
    :isHasAccount="isHasAccount"
    :emailProp="valueForm.email"
    :passwordProp="valueForm.password"
    :isOpenModal="isOpenModal"
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
      errors: false,
      isHasAccount: true,
      valueForm: {
        email: "",
        password: "",
      },
      isOpenModal: false,
    };
  },
  methods: {
    handlerChangeType() {
      this.isHasAccount = !this.isHasAccount;
    },
    handlerChangeInput(type, valueInput) {
      this.valueForm[type] = valueInput;
    },
    validateForm() {
      return !(this.valueForm.email && this.valueForm.password);
    },
    handlerSubmitAuthForm() {
      this.errors = this.validateForm();
      if (!this.errors) {
        this.isOpenModal = true;

        if (this.isHasAccount) {
          this.$store.dispatch("login", {
            email: this.valueForm.email,
            password: this.valueForm.password,
          });
        } else {
          this.$store.dispatch("signup", {
            email: this.valueForm.email,
            password: this.valueForm.password,
          });
        }
      }
    },
    handlerCloseModal() {
      this.isOpenModal = false;
    }
  },
};
</script>

<style>
</style>