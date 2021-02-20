<template>
  <div>
    <flag :iso="language" />
    <select v-model="language" id="language" @change="changLanguage($event)">
      <option value="vn">Vi</option>
      <option value="gb">En</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectLanguage",
  data() {
    return {
      language: this.$store.state.lang,
    };
  },
  methods: {
    changLanguage(event) {
      localStorage.setItem("lang", event.target.value);
      this.$store.commit("SET_LANGUAGE", event.target.value);
      this.$i18n.locale = event.target.value;
    },
  },
};
</script>

<style scoped>
select {
  outline: navajowhite;
  border: none;
  background: transparent;
  color: #ed8;
}
</style>
