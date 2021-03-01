<template>
  <button v-if="!link" :class="background">
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="{ path: path, query: { redirect: query } }"
    :class="background"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    path: {
      type: String,
      required: false,
      default: "/",
    },
    query: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  outline: none;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.bold {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.light {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.light:hover,
.light:active,
.bold:hover,
.bold:active {
  background-color: #edd2ff;
}
</style>
