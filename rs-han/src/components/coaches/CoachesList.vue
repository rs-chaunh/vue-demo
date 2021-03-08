<template>
  <section>
    <div class="card">
      <div class="controls">
        <button
          @click="$store.dispatch('coaches/getCoaches')"
          class="my-button outline"
        >
          {{ $t("common.button.refresh") }}
        </button>

        <div v-if="isRegisterCoaches"></div>
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
import MyLoading from "../loading/MyLoading";
import { mapState } from "vuex";
export default {
  name: "CoachesList",
  components: { CardList, MyLoading },
  computed: {
    ...mapState("auth", ["auth"]),
    ...mapState("common", ["loading"]),
    ...mapState("coaches", ["isRegisterCoaches"]),
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
