<template>
  <header>
    <nav>
      <h1>
        <router-link to="/coaches">Find a Coach</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/coaches" class="btn">{{ $t("common.buttons.all_coaches") }}</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/auth" class="btn"> {{ $t("auth.buttons.login") }}</router-link>
        </li>
        <template v-else>
          <li>
            <router-link to="/requests" class="btn">{{ $t("common.buttons.requests") }}</router-link>
          </li>
          <li>
            <button @click.prevent="handlerLogout" class="btn">
              {{ $t("auth.buttons.logout") }}
            </button>
          </li>
        </template>
        <li>
          <the-heading-language></the-heading-language>
        </li>
        <li><button @click="hello">Open</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import TheHeadingLanguage from "./TheHeadingLanguage.vue";
export default {
  components: { TheHeadingLanguage },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    handlerLogout() {
      this.$store.dispatch("logout");
    },
    hello() {
      this.$store.dispatch("notificationNewRequest");
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    a {
      color: #fff;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      margin: 0 0.5rem;
      a {
        color: #f391e3;
        border: 1px solid transparent;
        background: transparent;
        margin-right: 0px;
        transition: 0.2s all;
        text-decoration: none;

        &:hover {
          border: 1px solid #f391e3;
          background: transparent;
          border-radius: 0;
        }
      }
    }
  }
}
</style>