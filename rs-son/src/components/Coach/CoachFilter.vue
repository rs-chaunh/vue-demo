//FIXED
<template>
  <section>
    {{ setDataFilter }}
    <item-card>
      <h2>{{ $t("home.findCoach") }}</h2>
      <span class="filter-option">
        <input
          type="checkbox"
          name="frontend"
          value="frontend"
          id="frontend"
          checked="frontend"
          v-model="list"
          @change="handlegetDatafilter"
        />
        <label for="frontend"> Frontend </label>
      </span>
      <span class="filter-option">
        <input
          type="checkbox"
          name="backend"
          value="backend"
          id="backend"
          checked="backend"
          v-model="list"
          @change="handlegetDatafilter"
        />
        <label for="backend"> Backend </label>
      </span>
      <span class="filter-option">
        <input
          type="checkbox"
          name="career"
          value="career"
          id="career"
          checked="career"
          v-model="list"
          @change="handlegetDatafilter"
        />
        <label for="career"> Career </label>
      </span>
    </item-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: ["frontend", "backend", "career"],
    };
  },
  methods: {
    handlegetDatafilter() {
      this.$store.commit("coach/SET_DATA_FILTER", this.list);
      return this.$store.getters["coach/getDatafilter"](this.list);
    },
  },
};
</script>

<style scoped lang="scss">
.filter-option {
  margin-right: 1rem;
  label {
    vertical-align: middle;
    margin-left: 0.25rem;
  }
  input {
    vertical-align: middle;
  }
}
</style>
