<template>
  <div>
    <card>
      <form @submit.prevent="handlerSubmitAuthForm">
        <form-control 
          :error="dataForm.email.error ? true : false"
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
          <p v-if="dataForm.email.error">
            {{ dataForm.email.error }}
          </p>
        </form-control>
        <form-control 
          :error="dataForm.password.error ? true : false"
          :id="'password'" 
          :label="'Password'"
        >
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            @blur="validatePassword"
          />
          <p v-if="dataForm.password.error">
            {{ dataForm.password.error }}
          </p>
        </form-control>
        <p v-if="isError">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        
        <button-purple v-if="isHasAccount">Login</button-purple>
        <button-purple v-else>Signup</button-purple>

        <button-transparent @click="handlerChangeType">{{
          isHasAccount ? "Signup instead" : "Login instead"
        }}</button-transparent>
      </form>
    </card>
    <auth-modal v-if="isOpenModal" :handlerCloseModal="handlerCloseModal"></auth-modal>
  </div>
</template>

<script>
import ButtonPurple from "../commons/Button/ButtonPurple.vue";
import ButtonTransparent from '../commons/Button/ButtonTransparent.vue';
import Card from "../commons/Card";
import FormControl from "../commons/FormControl.vue";
import AuthModal from './AuthModal.vue';

export default {
  components: { Card, FormControl, ButtonPurple, ButtonTransparent, AuthModal },
  data() {
    return {
      email: this.dataForm.email.value,
      password: this.dataForm.password.value
    }
  },
  props: {
    dataForm: {
      type: Object,
    },
    isError: {
      type: Boolean,
      default: false
    },
    isOpenModal: {
      type: Boolean,
      default: false
    },
    isHasAccount: {
      type: Boolean,
      default: true
    },
    validateEmail: {
      type: Function,
    },
    validatePassword: {
      type: Function,
    },
    handlerChangeType: {
      type: Function
    },
    handlerChangeInput: {
      type: Function
    },
    handlerSubmitAuthForm: {
      type: Function
    },
    handlerCloseModal: {
      type: Function
    }
  },
  computed: {
    isAuthenticating() {
      return this.$store.getters.isAuthenticating;
    }
  },
  watch: {
    email: function(){
      this.$emit("handlerChangeInput", "email", this.email)
    },
    password: function() {
      this.$emit("handlerChangeInput", "password", this.password)
    }
  }
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