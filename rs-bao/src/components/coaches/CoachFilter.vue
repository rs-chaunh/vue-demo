<template>
  <div>
    <coach-card>
      <h2>Find Your Coach</h2>
      <span class="filter-option">
        <input
          type="checkbox"
          id="frontend"
          v-model="filter.frontend"
          @change="onChange"
          checked
        />
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
        <input
          type="checkbox"
          id="backend"
          v-model="filter.backend"
          @change="onChange"
          checked
        />
        <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
        <input
          type="checkbox"
          id="career"
          v-model="filter.career"
          @change="onChange"
          checked
        />
        <label for="career">Career</label>
      </span>
    </coach-card>
  </div>
</template>
<script>
import CoachCard from "../common/CoachCard.vue";
export default {
  emits: ["changeFilter"],
  components: { CoachCard },
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    onChange() {
      // const id = e.target.id;
      // const checkActive = e.target.checked;
      //update filter data
      this.filter = {
        // [id]: checkActive,
        ...this.filter,
      };
      this.$emit("changeFilter", this.filter);
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}
</style>
