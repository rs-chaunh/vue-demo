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
          <custom-button @click="refreshPage" type="outline"
            >Refresh</custom-button
          >
          <custom-button
            v-if="!isAuthenticated"
            type="purple"
            :href="{ name: 'Auth', query: { redirect: 'register' }}"
            >Login to Register as Coach</custom-button
          >
          <custom-button
            v-else-if="!isHadRegisterACoach"
            type="purple"
            :href="{ name: 'Register' }"
            >Register as Coach</custom-button
          >
        </div>
        <loading v-if="isLoading"></loading>
        <ul v-else-if="filterCoaches.length > 0">
          <coaches-item
            v-for="(coach, key) of filterCoaches"
            :key="key"
            :coach="coach"
          ></coaches-item>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import CustomButton from "../commons/CustomButton";
import FilterOption from "../commons/FilterOption.vue";
import CoachesItem from "./CoachesItem.vue";
import Loading from "../commons/Loading.vue";

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
  },
  components: {
    CustomButton,
    FilterOption,
    CoachesItem,
    Loading,
  },
  computed: {
    dataAreas() {
      return this.$store.getters.getDataAreas;
    },
    isLoading() {
      return this.$store.getters.getIsLoading;
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