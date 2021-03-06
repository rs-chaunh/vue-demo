<template>
  <div>
    <!-- First Dialog -->
    <coach-dialog :show="loading" title="Authenticating...">
      <coach-loading></coach-loading>
    </coach-dialog>

    <!-- Second Dialog -->
    <coach-dialog
      :show="!!error"
      title="An error occurred"
      @close="clearError"
      isChecking
    >
      <p>{{ error }}</p>
    </coach-dialog>

    <form @submit.prevent="checkClick == 1 ? onLogin() : onRegister()">
      <div class="input-group">
        <label for="email">{{ $t("email") }}</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="input-group">
        <label for="password">{{ $t("password") }}</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <p v-if="formIsInvalid">
        {{ $t("messageAuth") }}
      </p>
      <div class="button-group">
        <div v-if="checkClick">
          <button type="submit" id="btn-login" v-if="checkClick == 1">
            {{ $t("menu.login") }}
          </button>
          <button type="submit" id="btn-login" v-else>
            {{ $t("signup") }}
          </button>
          <button
            type="button"
            @click.prevent="onChangeClick(2)"
            id="btn-signup"
            v-if="checkClick == 1"
          >
            {{ $t("signupInstead") }}
          </button>
          <button
            type="button"
            @click.prevent="onChangeClick(1)"
            id="btn-signup"
            v-else
          >
            {{ $t("loginInstead") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import CoachDialog from "../common/CoachDialog.vue";
import CoachLoading from "../common/CoachLoading.vue";

export default {
  components: { CoachDialog, CoachLoading },
  name: "CoachLoginForm",
  data() {
    return {
      email: "",
      password: "",
      checkClick: 1,
      formIsInvalid: false,
      error: null,
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/login");
      }
    },
    token(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/login");
      }
    },
  },
  methods: {
    onChangeClick(number) {
      this.checkClick = number;
    },
    async onLogin() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsInvalid = true;
        return;
      }
      this.loading = true;
      try {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
        if (this.$route.query.redirect === "register") {
          this.$router.replace("/register");
        } else {
          this.$router.replace("/coaches");
        }
        const redirectTo = "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirectTo);
      } catch (err) {
        this.error = err.response.data.error.message || this.$t("fail");
      }
      this.loading = false;
    },
    async onRegister() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsInvalid = true;
        return;
      }
      this.loading = true;
      try {
        await this.$store.dispatch("auth/signUp", {
          email: this.email,
          password: this.password,
        });

        const redirectTo = "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirectTo);
      } catch (err) {
        this.error = err.response.data.error.message || this.$t("fail");
      }
      this.loading = false;
    },

    clearError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
form {
  margin: 0 auto;
}

form .input-group {
  margin: 10px 0;
}

form .input-group label {
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
}

form .input-group input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid rgb(204, 204, 204);
  width: 600px;
  padding: 5px;
}

.button-group #btn-login {
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
  outline: none;
}

.button-group #btn-signup {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: transparent;
  border: none;
  color: #3a0061;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  outline: none;
}

.button-group #btn-signup:hover {
  background-color: #edd2ff;
}
</style>
