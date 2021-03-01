<template>
  <div>
<<<<<<< HEAD
    <div class="card">
      <form>
        <form-control
          :error="dataForm.email.error"
          :id="'email'"
          :label="'E-Mail'"
        >
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            @blur="validateEmail"
          />
        </form-control>
        <form-control
          :error="dataForm.password.error"
          :id="'password'"
          :label="'Password'"
        >
=======
    <card>
      <form @submit.prevent="handlerSubmitAuthForm">
        <form-control :id="'email'" :label="$t('common.form.email')">
          <input 
            type="email" 
            id="email" 
            name="email" 
            v-model="email" />
        </form-control>
        <form-control :id="'password'" :label="$t('common.form.password')">
>>>>>>> master
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            @blur="validatePassword"
          />
        </form-control>
<<<<<<< HEAD
        <p v-if="isError">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>

        <custom-button @click.prevent="handlerSubmitAuthForm" type="purple">{{ isHasAccount ? "Login " : "Signup" }}</custom-button>

        <custom-button @click.prevent="handlerChangeType" type="transparent">{{
          isHasAccount ? "Signup instead" : "Login instead"
        }}</custom-button>
=======
        <p v-if="errors">
         {{ $t('auth.errors.form') }}
        </p>
        
        <button-purple v-if="isHasAccount">{{ $t('auth.buttons.login') }}</button-purple>
        <button-purple v-else>{{ $t('auth.buttons.signup') }}</button-purple>

        <button-transparent @click="handlerChangeType">
          {{ $t('auth.buttons.instead', { 
            action: isHasAccount ? $t('auth.buttons.signup') :  $t('auth.buttons.login')
          }) }}
        </button-transparent>
>>>>>>> master
      </form>
    </div>
    <auth-modal
      v-if="isOpenModal"
      :handlerCloseModal="handlerCloseModal"
    ></auth-modal>
  </div>
</template>

<script>
import CustomButton from "../commons/CustomButton";
import FormControl from "../commons/FormControl.vue";
import AuthModal from "./AuthModal.vue";

export default {
  components: { FormControl, CustomButton, AuthModal },
  data() {
    return {
      email: this.dataForm.email.value,
      password: this.dataForm.password.value,
    };
  },
  props: {
    dataForm: {
      type: Object,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isOpenModal: {
      type: Boolean,
      default: false,
    },
    isHasAccount: {
      type: Boolean,
      default: true,
    },
    validateEmail: {
      type: Function,
    },
    validatePassword: {
      type: Function,
    },
    handlerChangeType: {
      type: Function,
    },
    handlerChangeInput: {
      type: Function,
    },
    handlerSubmitAuthForm: {
      type: Function,
    },
    handlerCloseModal: {
      type: Function,
    },
  },
  watch: {
    email: function () {
      this.$emit("handlerChangeInput", "email", this.email);
    },
    password: function () {
      this.$emit("handlerChangeInput", "password", this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control.error {
  input,
  textarea {
    border: 1px solid red;
  }
}
form {
  margin: 1rem;
  padding: 1rem;
}
</style>