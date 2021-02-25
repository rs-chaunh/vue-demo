<template>
  <div @click="togglePopup()" class="modal"></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      openPopup: false,
    };
  },
  methods: {
    togglePopup() {
      this.$store.commit("auth/SET_LOADING", false);
      this.$store.commit("auth/SET_CHECK_LOGIN", true);
    },
  },
  computed: {
    checkLoading() {
      return this.$store.state.auth.loading;
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
