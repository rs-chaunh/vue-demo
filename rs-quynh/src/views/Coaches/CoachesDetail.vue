<template>
  <div>
    <section>
      <div class="card">
        <h2>{{ fullname }}</h2>
        <h3>${{ coach && coach.hourlyRate }}/{{ $t("common.unit_price") }}</h3>
      </div>
    </section>

    <section>
      <div class="card">
        <header>
          <h2>{{ $t("coach.contact.title") }}</h2>
          <custom-button
            type="purple"
            :href="{
              name: 'CoachesDetailContact',
              params: { id: $route.params.id },
            }"
            >{{ $t("coach.buttons.contact") }}</custom-button
          >
        </header>

        <router-view></router-view>
      </div>
    </section>

    <section>
      <div class="card" v-if="coach">
        <div
          class="badge"
          :class="area"
          v-for="(area, index) of coach.areas"
          :area="area"
          :key="index"
        >
          {{ area }}
        </div>
        <p>{{ coach.description }}</p>
      </div>
    </section>
    <modal-notification
      v-if="isError"
      :handlerCloseModal="handlerCloseModal"
      :textError="'Lỗi rồi nhé bạn ơi'"
    ></modal-notification>
  </div>
</template>

<script>
import CustomButton from "../commons/CustomButton";
import ModalNotification from "../commons/ModalNotification";

export default {
  props: {
    coach: {
      type: Object,
      require: true,
    },
    handlerCloseModal: {
      type: Function,
    },
  },
  components: {
    CustomButton,
    ModalNotification,
  },
  computed: {
    fullname() {
      return this.coach ? this.coach.firstName + " " + this.coach.lastName : "";
    },
    isError() {
      return this.$store.getters.isError;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;

  .actions {
    justify-content: center;
  }
}
</style>