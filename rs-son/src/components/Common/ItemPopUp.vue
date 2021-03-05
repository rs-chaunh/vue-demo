//FIXED
<template>
  <transition name="popup" appear>
    <dialog open>
      <header>
        <h2>{{ popupTitle }}</h2>
      </header>
      <section>
        <slot></slot>
      </section>
      <div class="menu">
        <item-button @click.prevent="togglePopup()">  {{ $t("close") }} </item-button>
      </div>
    </dialog>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ItemButton from "./ItemButton.vue";
export default {
  components: { ItemButton },
  props: ["popupTitle"], //FIXED
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["auth"]),
    togglePopup() {
      this.$store.commit("auth/SET_LOADING", false);
      this.$store.commit("auth/SET_CHECK_LOGIN", true);
    },
  },
  computed: {
    ...mapState(["auth"]),
    checkLogin() {
      return this.auth.checkLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #fff;
  header {
    background-color: #3a0061;
    color: #fff;
    width: 100%;
    padding: 1rem;
    h2 {
      color: #fff;
      margin: 0;
    }
  }
  section {
    padding: 1rem;
  }
  .menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
  }
}
@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
