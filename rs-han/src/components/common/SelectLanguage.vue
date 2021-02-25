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
  data() {
    return {
      language: this.$store.state.lang,
    };
  },
  watch: {
    language() {
      this.$store.dispatch("changLanguage", this.language);
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
