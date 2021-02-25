<template>
  <section>
    <div class="card">
      <div class="controls">
        <button
          @click="$store.dispatch('getCoaches')"
          class="my-button outline"
        >
          {{ $t("common.button.refresh") }}
        </button>

        <div v-if="isRegister"></div>
        <div v-else>
          <button-link :name="'Register'" v-if="auth">
            {{ $t("common.button.registerCoaches") }}
          </button-link>
          <button-link :name="'Auth'" :query="'register'" v-else>
            {{ $t("common.button.loginToRegister") }}
          </button-link>
        </div>
      </div>
      <template v-if="loading">
        <my-loading></my-loading>
      </template>
      <template v-else>
        <card-list></card-list>
      </template>
    </div>
  </section>
</template>

<script>
import CardList from "../card/CardList";
import ButtonLink from "../common/ButtonLink";
import MyLoading from "../loading/MyLoading";
import { mapState } from "vuex";
export default {
  name: "FindCoachesList",
  components: { CardList, ButtonLink, MyLoading },
  computed: {
    ...mapState(["auth", "loading", "isRegister"]),
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.outline:hover {
  background-color: #edd2ff;
}
</style>
