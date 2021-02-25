<template>
  <div>
    <flag :iso="language" />
    <select v-model="language" id="language">
      <option value="vn">Vi</option>
      <option value="gb">En</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectLanguage",
  computed: {
    language: {
      get() {
        return this.$store.getters.lang;
      },
      set(val) {
        this.$store.dispatch("changLanguage", val);
        // localStorage.setItem("lang", val);
        // this.$store.commit("SET_LANGUAGE", val);
        // this.$i18n.locale = val;
      },
    },
  },
  watch: {
    // language() {
    //   console.log("ladasasd");
    //   // localStorage.setItem("lang", this.language);
    //   // this.$store.commit("SET_LANGUAGE", this.language);
    //   // this.$i18n.locale = this.language;
    // },
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
