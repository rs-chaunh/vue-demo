<template>
  <section class="find__coaches">
    <div class="card">
      <h2 class="card__title">{{ $t("common.text.findYourCoaches") }}</h2>
      <span class="card__option" v-for="data in hardData" :key="data">
        <input
          type="checkbox"
          class="card__option-item"
          :value="`${data.value}`"
          @change="FILTER_COACHES(areas)"
          v-model="areas"
        />
        <label>{{ data.label }}</label>
      </span>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "FindCoaches",
  data() {
    return {
      areas: ["frontend", "backend", "fullstack"],
      hardData: [
        { value: "frontend", label: "Frontend" },
        { value: "backend", label: "Backend" },
        { value: "fullstack", label: "Fullstack" },
      ],
    };
  },
  methods: mapMutations(["FILTER_COACHES"]),
};
</script>

<style scoped>
.card__title {
  margin: 0.5rem 0;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.card__option {
  margin-right: 1rem;
}

.card__option > label {
  margin-left: 0.25rem;
}

input {
  background-color: initial;
  cursor: default;
  appearance: auto;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
}
</style>
