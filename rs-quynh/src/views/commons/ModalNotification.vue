<template>
  <teleport to="body">
    <div class="backdrop"></div>
    <transition name="modal">
      <section v-if="isLoading" class="modal">
        <header>
          <h2>{{ $t("auth.labels.authenticating") }}</h2>
        </header>
        <section>
          <loading></loading>
        </section>
        <menu>
          <custom-button @click="handlerCloseModal" type="purple">{{
            $t("auth.buttons.close")
          }}</custom-button>
        </menu>
      </section>

      <section v-else-if="isError" class="modal">
        <header>
          <h2>{{ $t("auth.labels.errors") }}</h2>
        </header>
        <section>
          <p>{{ textError }}</p>
        </section>
        <menu>
          <custom-button @click="handlerCloseModal" type="purple">{{
            $t("auth.buttons.close")
          }}</custom-button>
        </menu>
      </section>
    </transition>
  </teleport>
</template>

<script>
import Loading from "./Loading";
import CustomButton from "./CustomButton";

export default {
  components: { Loading, CustomButton },
  props: {
    textError: {
      type: String,
    },
    handlerCloseModal: {
      type: Function,
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isError() {
      return this.$store.getters.isError;
    },
  },
};
</script>