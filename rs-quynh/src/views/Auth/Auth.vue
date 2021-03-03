<template>
  <div>
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
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
          />
        </form-control>
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
      email: this.emailProp,
      password: this.passwordProp
    }
  },
  props: {
    errors: {
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
    emailProp: {
      type: String,
      default: ""
    },
    passwordProp: {
      type: String,
      default: ""
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
form {
  margin: 1rem;
  padding: 1rem;
}
</style>