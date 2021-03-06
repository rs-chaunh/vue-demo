<template>
  <div id="header">
    <div class="container">
      <router-link class="logo" to="/coaches"> {{ $t("title") }} </router-link>
      <div class="menu">
        <router-link to="/coaches">{{ $t("menu.allCoaches") }}</router-link>

        <template v-if="!isAuth">
          <router-link to="/auth">{{ $t("menu.login") }}</router-link>
        </template>

        <template v-else>
          <router-link to="/requests">
            {{ $t("menu.requests") }}
          </router-link>
          <coach-button class="logout" @click="logout">{{
            $t("menu.logout")
          }}</coach-button>
        </template>

        <!--icon-->
        <flag class="flag" :iso="check" />

        <select
          class="vuei18n"
          v-model="check"
          id="check"
          @change="handleChange($event)"
        >
          <option value="us">
            English
          </option>
          <option value="vn">Vietnam</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
  data() {
    return {
      check: this.$store.getters["auth/getLanguages"] || "us",
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
  },

  methods: {
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      this.$i18n.locale = event.target.value;
      this.$store.commit("auth/setLanguage", event.target.value);
    },
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

.vuei18n {
  position: relative;
  display: inline-block;
  width: auto;
  padding: 5px;
  outline: none;
  border: 1px solid #ddd;
  background: transparent;
  color: #f391e3;
}

.flag {
  margin: 5px;
}

.notify {
  color: red;
  position: fixed;
  right: 24.1%;
  top: 21px;
}
</style>
