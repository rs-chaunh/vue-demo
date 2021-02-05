<template>
  <section>
    {{setDataFilter}}
    <item-card>
      <h2>Find Your Coach</h2>
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
import ItemCard from "../common/ItemCard.vue";
export default {
  components: { ItemCard },
  data() {
    return {
      list: ["frontend", "backend", "career"],
    };
  },
  methods: {
    handlegetDatafilter() {
      return this.$store.dispatch({
        type: "getDatafilter",
        listFilter: this.list,
      });
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
