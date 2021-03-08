<template>
  <div @click="togglePopup()" class="modal"></div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      openPopup: false,
    };
  },
  methods: {
    ...mapMutations(["auth"]),
    togglePopup() {
      this.$store.commit("auth/SET_LOADING",false);
      this.$store.commit("auth/SET_CHECK_LOGIN",true);
    },
  },
  computed: {
    ...mapState(["auth"]),
    checkLoading() {
      return this.auth.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
</style>
