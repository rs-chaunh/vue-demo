<template>
  <router-link v-if="href" :to="href" class="btn" :class="type">
    <slot></slot>
  </router-link>
  <button v-else class="btn" :class="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    href: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;

  &:hover {
    background-color: #edd2ff;
  }
}
.purple {
  background-color: #3a0061;
  border-color: #3a0061;
  color: #fff;

  &:hover {
    background-color: #270041;
    border-color: #270041;
  }
}
.transparent {
  background-color: transparent;
  color: #3a0061;
  border: none;

  &:hover {
    background-color: #edd2ff;
  }
}
</style>