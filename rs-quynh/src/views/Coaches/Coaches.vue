<template>
  <div>
    <section>
      <div class="card">
        <h2>Find Your Coach</h2>
        <filter-option
          v-for="area in dataAreas"
          :checked="true"
          :id="area.id"
          :label="area.name.split(' ')[0]"
          :key="area.id"
          @change="toggleFilterOption(area.id)"
        ></filter-option>
      </div>
    </section>

    <section>
      <div class="card">
        <div class="controls">
          <custom-button @click="refreshPage" type="outline">{{
            $t("common.buttons.refresh")
          }}</custom-button>
          <template v-if="!isRegister">
            <custom-button
              v-if="!isAuthenticated"
              type="purple"
              :href="{ name: 'Auth', query: { redirect: 'register' } }"
              >{{ $t("common.buttons.login_to_register") }}</custom-button
            >
            <custom-button
              v-else-if="!isHadRegisterACoach"
              type="purple"
              :href="{ name: 'Register' }"
              >{{ $t("common.buttons.register") }}</custom-button
            >
          </template>
        </div>
        <loading v-if="isLoading"></loading>
        <ul v-else-if="filterCoaches.length > 0">
          <coaches-item
            v-for="(coach, key) of filterCoaches"
            :key="key"
            :coach="coach"
          ></coaches-item>
        </ul>
        <h1 v-else>{{ $t("coach.not_coach") }}</h1>
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
import FilterOption from "../commons/FilterOption.vue";
import CoachesItem from "./CoachesItem.vue";
import Loading from "../commons/Loading.vue";
import ModalNotification from "../commons/ModalNotification.vue";

export default {
  props: {
    filterOption: {
      type: Array,
      required: true,
    },
    filterCoaches: {
      type: Array,
      default: () => [],
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    isHadRegisterACoach: {
      type: Boolean,
      default: false,
    },
    refreshPage: {
      type: Function,
    },
    handlerCloseModal: {
      type: Function,
    },
  },
  components: {
    CustomButton,
    FilterOption,
    CoachesItem,
    Loading,
    ModalNotification,
  },
  computed: {
    dataAreas() {
      return this.$store.getters.getDataAreas;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isError() {
      return this.$store.getters.isError;
    },
    isRegister() {
      return this.$store.getters.getCoachByUserId(localStorage.getItem("userId"))
        ? true
        : false;
    },
  },
  methods: {
    toggleFilterOption(option) {
      this.$emit("toggleFilterOption", option);
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 0.5rem 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

ul {
  list-style-type: none;
}
</style>