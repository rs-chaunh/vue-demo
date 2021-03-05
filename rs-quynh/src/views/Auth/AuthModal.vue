<template>
  <teleport to="body">
    <div class="backdrop"></div>
    <transition name="modal">
        <section v-if="isLoading" class="modal">
          <header><h2>{{$t('auth.labels.authenticating')}}</h2></header>
          <section>
            <loading></loading>
          </section>
          <menu>
            <custom-button @click="handlerCloseModal" type="purple"
              >{{ $t('auth.buttons.close') }}</custom-button
            >
          </menu>
        </section>
    </transition>
    <transition name="modal">
        <section v-if="errorsAuth" class="modal">
          <header>
            <h2>{{$t('auth.labels.errors')}}</h2>
          </header>
          <section>
            <p>{{ $t('auth.errors.authen') }}</p>
          </section>
          <menu>
            <custom-button @click="handlerCloseModal" type="purple"
              >{{ $t('auth.buttons.close') }}</custom-button
            >
          </menu>
        </section>
    </transition>
  </teleport>
</template>

<script>
import CustomButton from "../commons/CustomButton";
import Loading from "../commons/Loading.vue";

export default {
  components: { Loading, CustomButton },
  props: {
    handlerCloseModal: {
      type: Function,
    },
  },
  computed: {
    errorsAuth() {
      return this.$store.getters.isError;
    },
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.modal {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
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
      margin: 0;
    }
  }

  section {
    padding: 1rem;
  }

  menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
  }
}

@media (min-width: 768px) {
  .modal {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>