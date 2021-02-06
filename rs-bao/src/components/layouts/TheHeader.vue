<template>
  <div id="header">
    <div class="container">
      <router-link class="logo" to="/coaches">Find a Coach</router-link>
      <div class="menu">
        <router-link to="/coaches">All Coaches</router-link>
        <template v-if="!isLogin">
          <router-link to="/auth">Login</router-link>
        </template>
        <template v-else>
          <router-link to="/requests">
            Requests
          </router-link>
          <coach-button class="logout" @click="logout">Logout</coach-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TheHeader",
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    ...mapGetters("requests", ["requests"]),
  },
  methods: {
    logout() {
      return this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped>
.logout {
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
  transition: all 0.3s ease;
}
#header {
  width: 100%;
  background-color: #3d008d;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  max-width: 1250px;
  margin: 0 auto;
}

.logo {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
}

.menu a {
  padding: 10px;
  color: #f391e3;
  text-decoration: none;
  display: inline-block;
  margin: 0 10px;
}

.menu a.router-link-exact-active {
  border: 1px solid #f391e3;
}

.note-mes {
  color: red;
  position: absolute;
  top: 20px;
}
</style>
